package utils

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type File struct {
	Name     string
	Abs      string
	IsDir    bool
	Children []File
}

func getChildren(fileTreeRoot *File) error {
	if fileTreeRoot.IsDir {
		// 创建一个空切片
		children := []File{}
		// 遍历一层目录，给切片添加内容
		err := ListDo(fileTreeRoot.Abs, func(path string, info os.FileInfo, err error) error {
			// 跳过小数点开头的文件和目录
			if strings.Contains(path, "/.") || path[0] == '.' {
				return err
			}
			// 跳过不是图片文件的文件
			if !info.IsDir() && !IsPicture(info.Name()) {
				return err
			}
			children = append(children, File{
				Name:     info.Name(),
				Abs:      path,
				IsDir:    info.IsDir(),
				Children: nil,
			})
			return err
		})
		// 把切片赋到Children上，如果是空目录，则赋一个空切片
		fileTreeRoot.Children = children
		if len(fileTreeRoot.Children) != 0 {
			// 对目录下未处理的子目录进行递归操作
			for i := 0; i < len(fileTreeRoot.Children); i++ {
				err = getChildren(&fileTreeRoot.Children[i])
			}
		}
		return err
	}
	return nil
}

func (f *File) Init() error {
	return getChildren(f)
}

func (f File) isEmptyDir() bool {
	return f.IsDir && len(f.Children) == 0
}

func (f *File) deleteEmptyChildrenDir() {
	if len(f.Children) == 0 {
		return
	}
	children := []File{}
	// 递归删掉空目录
	for _, v := range f.Children {
		if !v.isEmptyDir() {
			v.deleteEmptyChildrenDir()
		}
		if !v.isEmptyDir() {
			children = append(children, v)
		}
	}
	f.Children = children
}

func (f *File) Trim() {
	f.deleteEmptyChildrenDir()
}

func IndexDir(directory string) (File, error) {
	// 验证路径是否有效
	if _, err := ioutil.ReadDir(directory); err != nil {
		return File{}, err
	}

	dirAbs, _ := filepath.Abs(directory)
	dirName := filepath.Base(dirAbs)
	fileTree := File{
		Name:     dirName,
		Abs:      dirAbs,
		IsDir:    true,
		Children: nil,
	}

	// 加载文件树
	err := fileTree.Init()
	// 修剪掉没有文件的目录
	fileTree.Trim()

	return fileTree, err
}
