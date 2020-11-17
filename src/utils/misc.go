package utils

import (
	"io/ioutil"
	"path/filepath"
)

// 判断文件扩展名是不是图片文件的
func IsPicture(filename string) bool {
	ext := filepath.Ext(filename)
	return ext == ".jpg" || ext == ".jpeg" || ext == ".jpe" || ext == ".png" || ext == ".tif" || ext == ".tiff" || ext == ".bmp" || ext == ".svg" || ext == ".gif"
}

// 参考filepath.Walk，实现了一个仅遍历一层的版本
func ListDo(dirname string, listFn filepath.WalkFunc) error {
	list, err := ioutil.ReadDir(dirname)
	if err != nil {
		return err
	}
	dirAbsPath, err := filepath.Abs(dirname)
	for _, file := range list {
		absPath := dirAbsPath + "/" + file.Name()
		if err != nil {
			break
		}
		err = listFn(absPath, file, err)
		if err != nil {
			break
		}
	}
	return err
}
