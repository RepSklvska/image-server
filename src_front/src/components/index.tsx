import React from "react";
import {CloseCircleTwoTone} from "@ant-design/icons";
import {Flex} from "antd-mobile";
import {useSelector} from "@@/plugin-dva/exports";
import {useDispatch} from "umi";

interface ICloseButton {
	onClick: () => void
}

const CloseButton: React.FC<ICloseButton> = ({onClick}) => {
	return (
		<CloseCircleTwoTone
			style={{
				position: "absolute",
				fontSize: "400%",
				zIndex: 15,
				top: 12,
				right: 12,
				opacity: "75%",
				cursor: "pointer"
			}} twoToneColor="#808080" onClick={onClick}
		/>
	)
}

const BlobToSrc = (blob: Blob) => {

}

interface IPictureViewer {
	pictures?: {
		prev?: string,
		curr: string,
		next?: string
	}
}

const PictureViewer: React.FC<IPictureViewer> = ({pictures}) => {
	const hidden: boolean = useSelector((state: any) => !state.picture.showPic)
	const pictureBlob: Blob = useSelector((state: any) => state.picture.picture1)
	pictureBlob
	const dispatch = useDispatch()
	return (
		<div style={{
			width: "100%", height: "100%", background: "rgba(0,0,0,.75)",
			position: "absolute", zIndex: 10, top: 0, left: 0
		}} hidden={hidden}>
			<CloseButton onClick={() => dispatch({type: "picture/handleCloseViewer"})}/>
			<Flex direction="column" justify="center" style={{height: "100%"}}>
				<Flex justify="center">
					{/*<div style={{color: "white"}}>*/}
					{/*	{pictureString}*/}
					{/*</div>*/}
					<img alt="" src=""/>
				</Flex>
			</Flex>
		</div>
	)
}

export {PictureViewer}
