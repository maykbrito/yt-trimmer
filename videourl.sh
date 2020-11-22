youtubedl=./node_modules/youtube-dl/bin/youtube-dl

#best=bestvideo[ext=mp4]+bestaudio[ext=m4a]
#best="bestvideo[ext=webm]+bestaudio[ext=webm]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best"
#best="bestvideo[height<=?1080]+bestaudio/best"
best=best

#$youtubedl -F $1
$youtubedl --get-url -f $best $1