package response

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"image-server/src/file"
	"io/ioutil"
	"net/http"
	"reflect"
)

func requestToMap(c *gin.Context) map[string]interface{} {
	c.Request.ParseForm()
	data, _ := ioutil.ReadAll(c.Request.Body)
	dataMap := make(map[string]interface{})
	json.Unmarshal(data, &dataMap)
	return dataMap
}

func typeOf(a interface{}) string {
	return reflect.TypeOf(a).Name()
}

func HandlerWithFileTree(file *file.File) gin.HandlerFunc {
	return func(c *gin.Context) {
		dataMap := requestToMap(c)

		if dataMap["query"] == "directory" {

		}

		fmt.Println("POST received:", dataMap)
		fmt.Println("Query:", dataMap["query"], reflect.TypeOf(dataMap["query"]), reflect.TypeOf(dataMap["query"]).Name() == "string")

		c.JSON(http.StatusOK, gin.H{
			"message1": "privet",
		})
	}
}

func HandleRequest(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message2": "hello",
	})
}
