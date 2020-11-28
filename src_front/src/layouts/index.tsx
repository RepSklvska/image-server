import React from "react";
import {Icon, NavBar} from "antd-mobile"
import {useSelector} from "umi";

const NavTop: React.FC = () => {
	const basename: string = useSelector((state: any) => {
		const pwd: string = state.directory.pwd
		if (pwd === "/") {
			return "/"
		}
		const pwdSplited = pwd.split("/")
		return pwdSplited[pwdSplited.length - 1]
	})
	return (
		<NavBar
			mode="dark"
			icon={<Icon type="left"/>}
		>
			{basename}
		</NavBar>
	)
}

const DefaultLayout: React.FC = ({children}) => {

	return (
		<div>
			<NavTop/>
			{children}
		</div>
	)
}

export {NavTop}
export default DefaultLayout
