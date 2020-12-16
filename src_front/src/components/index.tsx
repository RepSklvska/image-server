import React, {useState} from "react";
import {CloseCircleTwoTone, LeftCircleTwoTone, RightCircleTwoTone} from "@ant-design/icons";
import {Flex} from "antd-mobile";
import {useDispatch, useSelector} from "umi";

const CloseButton: React.FC = () => {
	const dispatch = useDispatch()
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
			}} twoToneColor="#808080"
			onClick={() => dispatch({type: "picture/handleCloseViewer"})}
		/>
	)
}

const LeftButton: React.FC = () => {
	const dispatch = useDispatch()
	return (
		<LeftCircleTwoTone
			style={{
				position: "absolute",
				fontSize: "400%",
				zIndex: 15,
				bottom: 12,
				left: 12,
				opacity: "75%",
				cursor: "pointer"
			}} twoToneColor="#808080"
			onClick={() => dispatch({type: "picture/handleClickPrev"})}
			hidden={useSelector((state: any) => state.picture.picture0 === "")}
		/>
	)
}

const RightButton: React.FC = () => {
	const dispatch = useDispatch()
	return (
		<RightCircleTwoTone
			style={{
				position: "absolute",
				fontSize: "400%",
				zIndex: 15,
				bottom: 12,
				right: 12,
				opacity: "75%",
				cursor: "pointer"
			}} twoToneColor="#808080"
			onClick={() => dispatch({type: "picture/handleClickNext"})}
			hidden={useSelector((state: any) => state.picture.picture2 === "")}
		/>
	)
}

const BlobToSrc = async (blob: Blob) => {
	try {
		const buffer = await blob.arrayBuffer()
		// const buffer = await (new Response(blob)).arrayBuffer()
		console.log(blob)
		let text = `data:${blob.type};base64,`
		console.log(text)

		text += btoa(String.fromCharCode(...new Uint8Array(buffer)))

		return text
	} catch (e) {
		if (e.toString() !== "TypeError: blob.arrayBuffer is not a function") {
			console.log(e)
		}
	}
}

interface IPictureViewerProps {
	pictures?: {
		prev?: string,
		curr: string,
		next?: string
	}
}

const PictureViewer: React.FC<IPictureViewerProps> = ({pictures}) => {
	const hidden: boolean = useSelector((state: any) => !state.picture.showPic)
	const pictureBlob: Blob = useSelector((state: any) => state.picture.picture1)
	pictureBlob
	const dispatch = useDispatch()

	const [imgsrc, setImgsrc] = useState<string>("114514")
	BlobToSrc(pictureBlob).then(result => {
		if (result) setImgsrc(result)
	})

	return (
		<div style={{
			width: "100%", height: "100%", background: "rgba(0,0,0,.75)",
			position: "fixed", zIndex: 10, top: 0, left: 0
		}} hidden={hidden}>
			<CloseButton/>
			<LeftButton/>
			<RightButton/>
			<Flex direction="column" justify="center" style={{height: "100%"}}>
				<Flex justify="center">
					<img alt="" src={imgsrc} style={{maxHeight: "100vh", maxWidth: "100vw"}}/>
				</Flex>
			</Flex>
		</div>
	)
}

export {PictureViewer}
