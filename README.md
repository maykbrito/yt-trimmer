<h1 align="center">Download and trim some YouTube Video</h1>
<p align="center"><img src="https://i.gyazo.com/8a83fbcebd7415f2bfa8b89a8b6ca3ce.gif"><br/>
It will crop a youtube video, by adding start and end values, save it to local, and upload to your youtube channel.
</p>

---

## How to use it?

1. Clone this repo, go to repo folder
2. Start with `node index.js`
3. You will be prompted and will be asked for:
- `Youtube url` Youtube video url with http(s)
- `Video starts in` When video start? format `HH:mm:ss.ms`
- `Video ends in` When video will end? format `HH:mm:ss.ms`
- `Filename` Filename that will be output. Don't need to provide .extension of file. If no filename `part.mp4` will be the filename.

4. When finished, the video will be save at local project folder

_Obs.: You need ffmpeg in your machine_

## Tecnologies

- node.js
- readline-sync
- youtube-dl
- ffmpeg
