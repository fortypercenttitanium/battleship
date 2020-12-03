import React from 'react';
import { HeaderComponent, Logo } from './styled_components/headerStyles';
import logo from '../assets/images/bs_logo.png';

export default function Header({ timeline }) {
	return (
		<HeaderComponent>
			<Logo large={timeline === 'init'} src={logo} />
		</HeaderComponent>
	);
}
