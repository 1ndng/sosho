"""GitHub Action 每次 push 後自動執行（也可以在電腦上手動跑：python3 tools/build_media.py）

1. 放錯資料夾的圖片／影片 → 搬進 images/；音樂 → 搬進 audio/
2. 壓縮：照片最長邊 1440px、JPEG 品質 85（HEIC／JPEG／WEBP 會轉成 .jpg）；
   影片轉成 720p 的 .mp4；WAV 音檔轉成 .mp3
3. 重新產生 js/media.js（檔案清單），網頁靠它把照檔名格式上傳的檔案自動放上去
"""
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR, AUDIO_DIR = 'images', 'audio'
PHOTO = {'.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'}
VIDEO = {'.mp4', '.mov', '.m4v'}
AUDIO = {'.mp3', '.m4a', '.wav', '.aac'}
SKIP_DIRS = {'.git', '.github', 'node_modules', 'tools', os.path.join(IMG_DIR, 'src')}
MAX_SIDE, QUALITY = 1440, 85

renamed = {}   # 舊路徑 → 新路徑（data.js 裡寫到的話一起改）


def rel(p):
    return os.path.relpath(p, ROOT).replace(os.sep, '/')


def log(msg):
    print(msg, flush=True)


def move_strays():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        r = os.path.relpath(dirpath, ROOT)
        dirnames[:] = [d for d in dirnames if os.path.normpath(os.path.join(r, d)) not in SKIP_DIRS]
        if r in (IMG_DIR, AUDIO_DIR):
            continue
        for name in filenames:
            ext = os.path.splitext(name)[1].lower()
            target = AUDIO_DIR if ext in AUDIO else IMG_DIR if ext in PHOTO | VIDEO else None
            if not target:
                continue
            src = os.path.join(dirpath, name)
            os.makedirs(os.path.join(ROOT, target), exist_ok=True)
            dst = os.path.join(ROOT, target, name)
            shutil.move(src, dst)
            renamed[rel(src)] = rel(dst)
            log('搬移 %s → %s' % (rel(src), rel(dst)))


def compress_photo(path):
    from PIL import Image, ImageOps
    base, ext = os.path.splitext(path)
    ext_l = ext.lower()
    im = Image.open(path)
    big = max(im.size) > MAX_SIDE
    keep_png = ext_l == '.png'
    if ext == '.jpg' and not big:
        return
    if keep_png and not big:
        return
    im = ImageOps.exif_transpose(im)
    if big:
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    out = path if keep_png else base + '.jpg'
    if keep_png:
        im.save(out, optimize=True)
    else:
        im.convert('RGB').save(out + '.tmp', 'JPEG', quality=QUALITY, optimize=True, progressive=True)
        if out != path:
            os.remove(path)
        os.replace(out + '.tmp', out)
    if out != path:
        renamed[rel(path)] = rel(out)
    log('壓縮 %s' % rel(out))


def ffmpeg_bin():
    # 電腦上有裝 ffmpeg 就用；GitHub 上用 pip 裝的 imageio-ffmpeg（不用 apt，比較不會卡住）
    found = shutil.which('ffmpeg')
    if found:
        return found
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        return None


FFMPEG = ffmpeg_bin()


def probe(path):
    # 從 ffmpeg -i 的輸出讀影片的編碼和尺寸
    if not FFMPEG:
        return None
    res = subprocess.run([FFMPEG, '-hide_banner', '-i', path], capture_output=True, text=True)
    m = re.search(r'Video: (\w+).*?, (\d{2,5})x(\d{2,5})', res.stderr)
    return (int(m.group(2)), int(m.group(3)), m.group(1)) if m else None


def compress_video(path):
    base, ext = os.path.splitext(path)
    info = probe(path)
    if not info:
        return
    w, h, codec = info
    if ext == '.mp4' and min(w, h) <= 720 and max(w, h) <= 1440 and codec == 'h264':
        return
    out = base + '.mp4'
    tmp = base + '.tmp.mp4'
    # 短邊最多 720px、長邊最多 1440px（很寬的橫條影片也會縮小）
    scale = ("scale='trunc(min(iw,if(gt(iw,ih),min(1440,720*iw/ih),min(720,1440*iw/ih)))/2)*2':-2")
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', path, '-vf', scale,
                    '-c:v', 'libx264', '-crf', '26', '-preset', 'medium', '-pix_fmt', 'yuv420p',
                    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', tmp], check=True)
    os.remove(path)
    os.replace(tmp, out)
    if out != path:
        renamed[rel(path)] = rel(out)
    log('壓縮影片 %s' % rel(out))


def compress_audio(path):
    base, ext = os.path.splitext(path)
    if ext.lower() != '.wav':
        return
    out = base + '.mp3'
    subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', path, '-b:a', '160k', out], check=True)
    os.remove(path)
    renamed[rel(path)] = rel(out)
    log('轉檔 %s' % rel(out))


def compress_all():
    try:
        import pillow_heif
        pillow_heif.register_heif_opener()
    except ImportError:
        pass
    for folder, kinds in ((IMG_DIR, PHOTO | VIDEO), (AUDIO_DIR, AUDIO)):
        d = os.path.join(ROOT, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            path = os.path.join(d, name)
            ext = os.path.splitext(name)[1].lower()
            if not os.path.isfile(path) or ext not in kinds:
                continue
            try:
                if ext in PHOTO:
                    compress_photo(path)
                elif ext in VIDEO:
                    compress_video(path)
                else:
                    compress_audio(path)
            except Exception as e:   # 一個檔案壞掉不影響其他
                log('略過 %s：%s' % (rel(path), e))


def update_data_paths():
    if not renamed:
        return
    p = os.path.join(ROOT, 'js', 'data.js')
    s = open(p, encoding='utf-8').read()
    new = s
    for old, nw in renamed.items():
        new = new.replace('"%s"' % old, '"%s"' % nw)
    if new != s:
        open(p, 'w', encoding='utf-8').write(new)
        log('已更新 data.js 裡的檔名')


def write_manifest():
    files = []
    for folder in (IMG_DIR, AUDIO_DIR):
        d = os.path.join(ROOT, folder)
        if os.path.isdir(d):
            files += ['%s/%s' % (folder, n) for n in sorted(os.listdir(d))
                      if os.path.isfile(os.path.join(d, n)) and not n.startswith('.')]
    body = ('/* 自動產生，不用手動修改：images/ 和 audio/ 裡的檔案清單（js/automedia.js 會用到） */\n'
            'window.SITE_MEDIA = ' + json.dumps(files, ensure_ascii=False, indent=0) + ';\n')
    p = os.path.join(ROOT, 'js', 'media.js')
    old = open(p, encoding='utf-8').read() if os.path.exists(p) else ''
    if old != body:
        open(p, 'w', encoding='utf-8').write(body)
        log('已更新 js/media.js（%d 個檔案）' % len(files))


def make_posters():
    # 廣告、論壇留言影片的第一格存成 xxx_poster.jpg：影片還沒開始播（或手機省電模式不自動播）時先顯示這張
    d = os.path.join(ROOT, IMG_DIR)
    if not FFMPEG or not os.path.isdir(d):
        return
    for name in sorted(os.listdir(d)):
        if not re.match(r'(ad|forum)_.*\.mp4$', name):
            continue
        video = os.path.join(d, name)
        poster = os.path.join(d, name[:-4] + '_poster.jpg')
        old = open(poster, 'rb').read() if os.path.exists(poster) else None
        subprocess.run([FFMPEG, '-y', '-loglevel', 'error', '-i', video, '-frames:v', '1', '-q:v', '4',
                        '-fflags', '+bitexact', '-flags:v', '+bitexact', poster], check=False)
        if os.path.exists(poster) and open(poster, 'rb').read() != old:
            log('產生封面 %s' % rel(poster))


if __name__ == '__main__':
    os.chdir(ROOT)
    move_strays()
    compress_all()
    make_posters()
    update_data_paths()
    write_manifest()
    sys.exit(0)
