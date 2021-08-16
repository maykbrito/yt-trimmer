<h1 align="center">Download and trim some YouTube Video</h1>
<p align="center"><img src="https://i.gyazo.com/47d07ad7f425ccd747b4f6c3fb483e51.gif"><br/>
It will download and cut a youtube video, by adding start and end values, save it to root directory
</p>

---

## How to use it?

Clone this repo, go to repo folder, and install with `npm install`

_Obs.: You need ffmpeg and youtube-dl in your machine_

## WEB

1. Start project with `npm start`
2. Open your browser at http://localhost:3000/
3. Follow page instructions

## CLI

### Download single cut (part) of the video

1. Start with `npm run trim`
2. You will be prompted and will be asked for:

- `Youtube url` Youtube video url with http(s)
- `Video starts in` When video start? format `HH:mm:ss.ms`
- `Video ends in` When video will end? format `HH:mm:ss.ms`
- `Filename` Filename that will be output. Don't need to provide .extension of file. If no filename `part.mp4` will be the filename.

3. When it's finished, the video will be saved at local project folder

### Download multiples parts (cuts) of the video

1. Go to src/actions/
2. Edit multiple-parts.js

```js
const data = {
  url: 'https://www.youtube.com/watch?v=gBmnB7BwSRA', // the Youtube video Url
  intervals: [
    // the parts of you want to cut
    ['00:01:19', '00:01:40.200'],
    ['00:04:30', '00:05:00']
  ],
  concat: true // If you want to concatenate (join) in a single final.mp4 file, leave it as true. If not, make it false
}
```

3. save your file
4. run `npm run trimall`

## Tecnologies

- node.js
- readline-sync
- youtube-dl
- ffmpeg
- webpack
- sass
