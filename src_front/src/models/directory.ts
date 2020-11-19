import {Effect, Reducer, Subscription} from "umi"
import {AnyAction} from "redux";
import {ListDirRequest} from "@/services/allRequests";

interface IFile {
	name: string,
	isDirectory: boolean,
	children: IFile[],
}

export interface IDirectoryState {
	files: IFile

	[index: string]: any
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
		files: {
			name: "root",
			isDirectory: true,
			children: []
		}
	},
	effects: {
		* test({payload}, {put, select, call}) {
			const result = yield call(ListDirRequest,)
			console.log(result)
		},
	},
	reducers: {
		save(state: any, action: AnyAction) {
			return {...action.data}
		}
	},
	subscriptions: {
		init({dispatch}) {
			dispatch({type: "test"})
		},
	},
}

export default DirectoryModel
