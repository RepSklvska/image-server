import React from "react";
import Layout from "@/layouts/index"
import {List} from "antd-mobile";
import {IDirectoryState, useSelector} from 'umi'

export default () => {
	const directory: IDirectoryState = useSelector((state: any) => state.directory)
	return (
		<Layout>
			<List>
				<List.Item>A</List.Item>
			</List>
		</Layout>
	);
};

