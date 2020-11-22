<h1 align="center">Download and trim some YouTube Video</h1>
<p align="center"><img src="https://i.gyazo.com/47d07ad7f425ccd747b4f6c3fb483e51.gif"><br/>
It will download and cut a youtube video, by adding start and end values, save it to root directory
</p>

---

## How to use it?

1. Clone this repo, go to repo folder, and install with `npm install`
2. Start with `npm start`
3. You will be prompted and will be asked for:
- `Youtube url` Youtube video url with http(s)
- `Video starts in` When video start? format `HH:mm:ss.ms`
- `Video ends in` When video will end? format `HH:mm:ss.ms`
- `Filename` Filename that will be output. Don't need to provide .extension of file. If no filename `part.mp4` will be the filename.

4. When it's finished, the video will be saved at local project folder

_Obs.: You need ffmpeg in your machine_

## Tecnologies

- node.js
- readline-sync
- youtube-dl
- ffmpeg
