import Request from "@/utils/request";

export interface IList {
	dirs: string[],
	files: string[]
}

const ListRequest = async (path: string): Promise<IList> => {
	const data = {
		query: {
			type: "list",
			path: path,
		},
	}
	const result = await Request("/", {data: data})
	// console.log(result)
	return result as IList
}

interface IPicture {
}

const PictureRequest = async (path: string): Promise<IPicture> => {
	const data = {
		query: {
			type: "getpic",
			path: path,
		},
	}
	const result = await Request("/", {data: data})

	return result as IPicture
}

export {ListRequest}
