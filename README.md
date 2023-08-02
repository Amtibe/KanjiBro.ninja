Run locally using python3:
```shell
python -m http.server --cgi 8080
```

To run with docker:
```shell
docker build -t kanji-ninja .   
docker run --name kanji-ninja -p 8888:80 -d kanji-ninja
```

If doing a lot of development, clean-up dangling images with
```shell
docker image prune
```

To build an image for another architecutre, and export to file:
```
docker buildx build --platform=linux/amd64 -t kanji-ninja:latest-amd64 .
docker save --output kanji-ninja-amd64.tar kanji-ninja:latest-amd64
```