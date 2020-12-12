import styled from 'styled-components';

const HeaderComponent = styled.div`
	margin: 1rem auto 0;
	display: flex;
	overflow: hidden;
`;

const Logo = styled.img`
	margin: auto;
	height: ${(props) => (props.large ? 'auto' : '3rem')};
	@media (max-width: 1000px) {
		height: ${(props) => (props.large ? '4rem' : '2rem')};
	}
	animation: rise 8s ease-out;
`;

export { HeaderComponent, Logo };
