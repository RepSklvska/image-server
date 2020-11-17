package main

import (
	"flag"
	"fmt"
	"github.com/gin-gonic/gin"
	"image-server/src/utils"
	"net/http"
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

	fileTree, err := utils.IndexDir(*d)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	_ = fileTree

	r := gin.Default()
	r.POST("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "response",
		})
	})
	r.Run(strconv.Itoa(*p))
}
