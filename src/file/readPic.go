package file

import (
	"fmt"
	"io/ioutil"
	"strings"
)

// 根据前端请求得到文件在系统中的绝对路径
func (f *File) getAbs(path string) (string, error) {
	pathSpl := strings.Split(path, "/")
	filename := pathSpl[len(pathSpl)-1]

	// pwd是“当前目录”
	pwd := f
	var err error = nil
	for _, v := range pathSpl[1 : len(pathSpl)-1] {
		if pwd, err = pwd.cd(v); err != nil {
			return "", err
		}
	}
	if file, err := pwd.choose(filename); err != nil {
		return "", nil
	} else {
		return file.Abs, nil
	}
}

func (f *File) ReadPicture(path string) string {
	abs, _ := f.getAbs(path)
	fmt.Println("Requested file path:", abs)

	picBytes, _ := ioutil.ReadFile(abs)
	fmt.Println("Picture length:", len(string(picBytes)))
	//if err != nil {
	//	return nil, err
	//}
	return abs
}
