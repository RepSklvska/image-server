APP=imageServer


# build需要安装依赖
# go get github.com/go-bindata/go-bindata/...
# go get github.com/elazarl/go-bindata-assetfs/...
build:
	rm ./bin/* -rf
	cd ./src_front && npm run build
	cd ./src_front && ~/go/bin/go-bindata-assetfs -o=../src/assets/asset.go -pkg=assets dist/...
	go build -o ./bin/${APP} ./src/main.go

run:
	rm ./bin/* -rf
	cd ./src_front && npm run build
	cd ./src_front && ~/go/bin/go-bindata-assetfs -o=../src/assets/asset.go -pkg=assets dist/...
	go build -o ./bin/${APP} ./src/main.go
	./bin/${APP}

test1:
	cd ./src_front && ~/go/bin/go-bindata-assetfs -o=../src/assets/asset.go -pkg=assets dist/...
	go run ./src/main.go -d /home/aa/Documents

test2:
	cd ./src_front && ~/go/bin/go-bindata-assetfs -o=../src/assets/asset.go -pkg=assets dist/...
	go run ./src/main.go -d /home/aa/Pictures