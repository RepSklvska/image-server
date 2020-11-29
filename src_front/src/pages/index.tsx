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
		} else {
			return async () => {
				const x = await dispatch({type: "directory/getPic", name: name})
				console.log(x)
			}
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
			<div style={{
				width: "100%", height: "100%", background: "rgba(0,0,0,.75)",
				position: "absolute", zIndex: 114514, top: 0, left: 0
			}}>
				EXCITED
			</div>
		</Layout>
	);
};

