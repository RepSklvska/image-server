import Request from "@/utils/request";

export interface IList {
	dirs: string[],
	files: string[]
}

export const ListRequest = async (path: string): Promise<IList> => {
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

export interface IPicture {
}

export const PictureRequest = async (path: string) => {
	const data = {
		query: {
			type: "getpic",
			path: path,
		},
	}
	const result = await Request("/", {data: data, responseType: "blob"})

	return result
}
