import React, { useContext } from 'react';
import { HeaderComponent, Logo } from '../styled_components/headerStyles';
import logo from '../../assets/images/bs_logo.png';
import { store } from '../../GameController';

export default function Header() {
	const { timeline } = useContext(store).state;
	return (
		<HeaderComponent>
			<Logo large={timeline === 'init'} src={logo} />
		</HeaderComponent>
	);
}
