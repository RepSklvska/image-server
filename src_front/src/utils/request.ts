import {backend, mock} from "@/settings";
import {request, RequestConfig} from "umi";

const BACKEND_URL = mock ?
	"" :
	backend[backend.length - 1] !== "/" ?
		backend + "/" :
		backend;

const Request = (route: string, options?: RequestConfig) => {
	return request(BACKEND_URL + route, {
		method: "post",
		...options,
	});
};

export default Request;
