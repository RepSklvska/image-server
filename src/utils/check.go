package utils

import (
	"github.com/gin-gonic/gin"
	"path/filepath"
	"reflect"
)

// 判断文件扩展名是不是图片文件的
func IsPicture(filename string) bool {
	ext := filepath.Ext(filename)
	return ext == ".jpg" || ext == ".jpeg" || ext == ".jpe" || ext == ".png" || ext == ".tif" || ext == ".tiff" || ext == ".bmp" || ext == ".svg" || ext == ".gif"
}

func TypeOf(a interface{}) string {
	return reflect.TypeOf(a).String()
}

// 判断是不是string-interface类型的map
func IsMapStrI(a interface{}) bool {
	_, ok := a.(map[string]interface{})
	return ok
}

func IsGinH(a interface{}) bool {
	_, ok := a.(gin.H)
	return ok
}

// 判断map里面是否存在对应的key
func KeyExists(m map[string]interface{}, k string) bool {
	_, exist := m[k]
	return exist
}
