import Request from "@/utils/request";

const ListDirRequest = async () => {
	const result = await Request("/", {
		data: {query: "directory", }
	})
	console.log(result)
	return result
}

export {ListDirRequest}
