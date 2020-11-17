APP=imageServer

build:
	rm ./bin/* -rf
	go build -o ./bin/${APP} ./src/main.go

run:
	go run ./src/main.go

test1:
	go run ./src/main.go -d /home/aa/Documents

test2:
	go run ./src/main.go -d /home/aa/Pictures