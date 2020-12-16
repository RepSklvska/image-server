import {Effect, Reducer, Subscription} from "umi";
import {AnyAction} from "redux";
import {PictureRequest} from "@/services/allRequests";

export interface IPictureState {
	picture0: Blob | {},
	picture1: Blob | {},
	picture2: Blob | {},
	showPic: boolean,
	current: number,
}

export interface IPictureModel {
	namespace: "picture",
	state: IPictureState,
	effects: {
		[index: string]: Effect,
	},
	reducers: {
		[index: string]: Reducer,
	},
	subscriptions: {
		[index: string]: Subscription,
	},
}

const PictureModel: IPictureModel = {
	namespace: "picture",
	state: {
		picture0: {}, // 预备“上一张图片”
		picture1: {}, // 当前所查看的图片
		picture2: {}, // 预备“下一张图片”
		showPic: false, // 用户是否在查看图片
		current: -1, // 用户当前正在查看的图片
	},
	effects: {
		// 向后端请求图片二进制内容，name是文件名
		* getPic({name, to}, {put, select, call}) {
			// variable "to" can only be string "picture0", "picture1" or "picture2"
			const pwd = (yield select((state: any) => state.directory.pwd)) as string
			const path = pwd === "/" ? pwd + name : pwd + "/" + name
			const picture: Blob = yield call(PictureRequest, path)
			console.log("Response picture:", picture)
			console.log("Type of response:", typeof picture)

			if (to) {
				const pictureState: IPictureState = (yield select((state: any) => state.picture)) as IPictureState
				pictureState[to as "picture0" | "picture1" | "picture2"] = picture
				yield put({type: "save", newState: pictureState})
			}
			return picture
		},
		//
		* truncatePic({to}, {put, select}) {
			const pictureState: IPictureState = (yield select((state: any) => state.picture)) as IPictureState
			pictureState[to as "picture0" | "picture1" | "picture2"] = ""
			yield put({type: "save", newState: pictureState})
		},
		* setVisible({index}, {put, select}) {
			const pictureState: IPictureState = (yield select((state: any) => state.picture)) as IPictureState
			pictureState.showPic = true
			yield put({type: "save", newState: pictureState})
		},
		* setCurrent({index}, {put, select}) {
			const pictureState: IPictureState = (yield select((state: any) => state.picture)) as IPictureState
			pictureState.current = index
			yield put({type: "save", newState: pictureState})
		},
		// 当用户从列表中点开一张图片
		* handleClickPic({name}, {put, select, take}) {
			// 下载当前图片
			yield put({type: "getPic", name: name, to: "picture1"})
			yield take("getPic/@@end")
			// 展示图片
			yield put({type: "setVisible"})
			yield take("setVisible/@@end")

			// 获得当前图片在当前目录下图片列表中的编号
			const picList: string[] = (yield select((state: any) => state.directory.pictures)) as string[]
			const indexPic1 = picList.indexOf(name)
			yield put({type: "setCurrent", index: indexPic1})
			yield take("setCurrent/@@end")

			// 下载“上一张图片”
			if (indexPic1 !== 0) {
				yield put({type: "getPic", name: picList[indexPic1 - 1], to: "picture0"})
			}
			// 下载“下一张图片”
			if (indexPic1 !== picList.length - 1) {
				yield put({type: "getPic", name: picList[indexPic1 + 1], to: "picture2"})
			}
			// yield take("getPic/@@end")
			// yield take("getPic/@@end")
			// console.log(yield select((state:any)=>state.picture))
		},
		// 当用户点击查看上一张图片
		* handleClickPrev({}, {put, select, take}) {
			const pictureState: IPictureState = yield select((state: any) => state.picture)
			const currentIndex: number = pictureState.current - 1
			pictureState.current = currentIndex
			pictureState.picture2 = pictureState.picture1
			pictureState.picture1 = pictureState.picture0
			yield put({type: "save", newState: pictureState})

			if (currentIndex !== 0) {
				const picList: string[] = (yield select((state: any) => state.directory.pictures)) as string[]
				yield put({type: "getPic", name: picList[currentIndex - 1], to: "picture0"})
				yield take("getPic/@@end")
			} else {
				yield put({type: "truncatePic", to: "picture0"})
				yield take("truncatePic/@@end")
			}
		},
		// 当用户点击查看下一张图片
		* handleClickNext({}, {put, select, take}) {
			const pictureState: IPictureState = yield select((state: any) => state.picture)
			const currentIndex: number = pictureState.current + 1
			pictureState.current = currentIndex
			pictureState.picture0 = pictureState.picture1
			pictureState.picture1 = pictureState.picture2
			yield put({type: "save", newState: pictureState})

			const picList: string[] = (yield select((state: any) => state.directory.pictures)) as string[]
			if (currentIndex !== picList.length - 1) {
				yield put({type: "getPic", name: picList[currentIndex + 1], to: "picture2"})
				yield take("getPic/@@end")
			} else {
				yield put({type: "truncatePic", to: "picture2"})
				yield take("truncatePic/@@end")
			}
		},
		// 当用户点击右上角的X，退出查看图片的界面
		* handleCloseViewer({}, {put}) {
			yield put({type: "save", newState: {picture0: "", picture1: "", picture2: "", showPic: false, current: -1}})
		},
	},
	reducers: {
		save(state: any, action: AnyAction) {
			return {...action.newState}
		},
	},
	subscriptions: {}
}

export default PictureModel
