package file

import "errors"

type File struct {
	Name     string
	Abs      string
	IsDir    bool
	Children []File
}

// 选择自己下面的文件
func (f *File) choose(name string) (*File, error) {
	for i, v := range f.Children {
		if v.Name == name {
			return &f.Children[i], nil
		}
	}
	return nil, errors.New("No such file")
}

// 选择自己下面的目录
func (f *File) cd(name string) (*File, error) {
	for i, v := range f.Children {
		if v.IsDir && v.Name == name {
			return &f.Children[i], nil
		}
	}
	return nil, errors.New("No such directory")
}

// 列出Children的Name
func (f *File) ls() []string {
	list := []string{}
	if !f.IsDir {
		return list
	}
	for _, v := range f.Children {
		list = append(list, v.Name)
	}
	return list
}
