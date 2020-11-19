package response

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"image-server/src/utils"
	"io/ioutil"
	"net/http"
	"reflect"
)

func HandlerWithFileTree(file *utils.File) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.ParseForm()
		fmt.Println("POST received:", c.Request.Body)
		data, _ := ioutil.ReadAll(c.Request.Body)
		dataMap := make(map[string]interface{})
		json.Unmarshal(data, &dataMap)
		fmt.Println("POST received:", dataMap)
		fmt.Println("Query:", dataMap["query"], reflect.TypeOf(dataMap["query"]), reflect.TypeOf(dataMap["query"]).Name() == "string")
		//fmt.Println(c.Request.PostForm)
		c.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	}
}

func HandleRequest(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hello",
	})
}
