package main

import (
	"flag"
	"fmt"
	"image-server/src/file"
	"image-server/src/response"
	"image-server/src/server"
	"strconv"
)

var (
	d = flag.String("d", ".", "Root directory for Image Server")
	p = flag.Int("p", 3000, "Port for server")
)

type File struct {
	Name     string
	Abs      string
	IsDir    bool
	Children []File
}

func main() {
	flag.Parse()

	fileTree, err := file.IndexDir(*d)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	_ = server.Init(
		response.HandlerWithFileTree(&fileTree),
		//response.HandleRequest,
	).Run(":" + strconv.Itoa(*p))
}
