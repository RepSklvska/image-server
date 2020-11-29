package response

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
	"image-server/src/file"
	"io/ioutil"
	"net/http"
)

func requestToMap(c *gin.Context) map[string]interface{} {
	c.Request.ParseForm()
	data, _ := ioutil.ReadAll(c.Request.Body)
	dataMap := make(map[string]interface{})
	json.Unmarshal(data, &dataMap)
	return dataMap
}

func requestToBytes(c *gin.Context) []byte {
	c.Request.ParseForm()
	data, _ := ioutil.ReadAll(c.Request.Body)
	return data
}

func requestToGJSON(c *gin.Context) gjson.Result {
	return gjson.ParseBytes(requestToBytes(c))
}

func Handler(file *file.File) gin.HandlerFunc {
	return func(c *gin.Context) {
		req := requestToGJSON(c)

		switch req.Get("query.type").Str {
		case "list":
			path := req.Get("query.path").Str
			fmt.Println("Requested path:", path)
			dirs, _ := file.ListDirs(path)
			files, _ := file.ListFiles(path)
			res := gin.H{}

			if len(dirs) == 0 {
				// 不这么做，返回是null而不是空数组！
				// https://github.com/gin-gonic/gin/issues/125
				dirs = make([]string, 0)
			}
			res["dirs"] = dirs
			if len(files) == 0 {
				files = make([]string, 0)
			}
			res["files"] = files
			fmt.Println("Response:", res)

			c.JSON(http.StatusOK, res)
		case "getpic":
			path := req.Get("query.path").Str
			fmt.Println("Requested path:", path)
			abs := file.ReadPicture(path)

			c.File(abs)
		}
	}
}
