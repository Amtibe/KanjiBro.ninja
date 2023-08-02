Run locally using python3:
```shell
python -m http.server --cgi 8080
```

To run with docker:
```shell
docker build -t kanji-ninja .   
docker run --name kanji-ninja -p 8888:80 -d kanji-ninja
```