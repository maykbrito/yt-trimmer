youtubedl=./node_modules/youtube-dl/bin/youtube-dl

# get video information
#$youtubedl -F $1

# get video url
$youtubedl --get-url -f best $1