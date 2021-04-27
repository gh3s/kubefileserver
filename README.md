# nodefileserver
File server using 4CRUD library

```sh
docker build . -t gh3s/nodeserver -f kubernetes/Dockerfile
```
```sh
docker run -p 8080:3000 -d gh3s/nodeserver
```
```sh
curl localhost:8080/download?fileName=index.js
```

