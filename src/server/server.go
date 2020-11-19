package server

import (
	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/gin-gonic/gin"
	"image-server/src/assets"
)

func Init(handlers ...gin.HandlerFunc) *gin.Engine {
	r := gin.Default()

	// 静态文件服务，一个迫真Apache httpd
	// Fallback是如果找不到目录下对应的文件，就提供index.html
	fs := assetfs.AssetFS{
		Asset:     assets.Asset,
		AssetDir:  assets.AssetDir,
		AssetInfo: assets.AssetInfo,
		Prefix:    "dist",
		Fallback:  "index.html",
	}
	r.StaticFS("/", &fs)

	r.POST("/", handlers...)
	return r
}
