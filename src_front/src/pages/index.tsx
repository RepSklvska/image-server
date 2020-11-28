import React from "react";
import Layout from "@/layouts/index"
import {List} from "antd-mobile";
import {FolderOutlined, PictureOutlined, RollbackOutlined} from "@ant-design/icons";
import {IDirectoryState, useDispatch, useSelector} from 'umi'

export default () => {
	const dispatch = useDispatch()
	const directory: IDirectoryState = useSelector((state: any) => state.directory)
	const handleClick = (isDirectory: boolean, name: string) => {
		if (isDirectory) {
			return () => {
				dispatch({type: "directory/changeDir", to: name})
			}
		}
		return () => {
		}
	}
	return (
		<Layout>
			{/*{JSON.stringify(directory)}*/}
			<List>
				{directory.pwd === "/" ? null :
					<List.Item onClick={handleClick(true, "..")}><RollbackOutlined/>{" "}..</List.Item>}
				{directory.files.map(item =>
					<List.Item onClick={handleClick(item.isDirectory, item.name)}>
						{item.isDirectory ? <FolderOutlined/> : <PictureOutlined/>}
						{" "}
						{item.name}
					</List.Item>
				)}
			</List>
		</Layout>
	);
};

