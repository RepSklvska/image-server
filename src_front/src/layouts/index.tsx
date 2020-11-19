import React from "react";
import {Icon, NavBar} from "antd-mobile"

const NavTop: React.FC = () => {

	return (
		<NavBar
			mode="dark"
			icon={<Icon type="left"/>}
		>
			Image Server
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
