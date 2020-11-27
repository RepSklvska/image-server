package file

import "strings"

// 传入路径，"/"表示根节点，父子之间用"/"分隔
func (f *File) listDir(path string, isDir bool) ([]string, error) {
	pathSpl := strings.Split(path, "/")

	// 根目录
	if len(pathSpl) == 1 && pathSpl[0] == "" {
		return f.ls(isDir), nil
	}

	// 去掉末尾可能的空字符串
	if pathSpl[len(pathSpl)-1] == "" {
		pathSpl = pathSpl[:len(pathSpl)-1]
	}

	// pwd是“当前目录”
	pwd := f
	var err error = nil
	for _, v := range pathSpl[1:] {
		if pwd, err = pwd.cd(v); err != nil {
			return nil, err
		}
	}
	return f.ls(isDir), err
}

// 列出Children中的目录名切片
func (f *File) ListDirs(path string) ([]string, error) {
	return f.listDir(path, true)
}

// 列出Children中的文件名切片
func (f *File) ListFiles(path string) ([]string, error) {
	return f.listDir(path, false)
}
