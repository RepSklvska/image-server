import {Effect, Reducer, Subscription} from "umi"
import {AnyAction} from "redux";
import {IList, ListRequest, PictureRequest} from "@/services/allRequests";

type IFiles = {
	name: string,
	isDirectory: boolean,
}[]

export interface IDirectoryState {
	files: IFiles,
	pictures: string[],
	pwd: string,

	[index: string]: any,
}

export interface IDirectoryModel {
	namespace: "directory",
	state: IDirectoryState,
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

const DirectoryModel: IDirectoryModel = {
	namespace: "directory",
	state: {
		files: [],
		pictures: [],
		pwd: "/"
	},
	effects: {
		* getDirList({}, {put, select, call}) {
			const state: IDirectoryState = yield select((state: any) => state.directory)
			const location = state.pwd
			const result: IList = yield call(ListRequest, location)
			state.files = []
			state.pictures = []
			result.dirs.map(dir => state.files.push({name: dir, isDirectory: true}))
			result.files.map(file => {
				state.files.push({name: file, isDirectory: false})
				state.pictures.push(file)
			})
			yield put({type: "save", newState: state})
		},
		* changeDir({to}, {put, select}) {
			const state: IDirectoryState = yield select((state: any) => state.directory)
			console.log(to, to === "..")
			if (to === "..") {
				state.pwd = state.pwd.substring(0, state.pwd.lastIndexOf("/"))
				if (state.pwd === "") {
					state.pwd = "/"
				}
			} else {
				state.pwd === "/" ?
					state.pwd = "/" + to :
					state.pwd += "/" + to
			}
			yield put({type: "save", newState: state})
			console.log("1")
			yield put({type: "getDirList"})
			console.log("2")
		},
	},
	reducers: {
		save(state: any, action: AnyAction) {
			return {...action.newState}
		}
	},
	subscriptions: {
		init({dispatch}) {
			dispatch({type: "getDirList"})
		},
	},
}

export default DirectoryModel
