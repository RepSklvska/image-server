package server

import (
	assetfs "github.com/elazarl/go-bindata-assetfs"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"image-server/src/assets"
)

func Init(handlers ...gin.HandlerFunc) *gin.Engine {
	r := gin.Default()

	// 允许一切跨域请求，仅在测试中使用，这样单独调试前端页面较为方便
	// 正式版注释掉
	r.Use(cors.Default())

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
