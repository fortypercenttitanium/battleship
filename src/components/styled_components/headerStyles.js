import styled from 'styled-components';

const HeaderComponent = styled.div`
	margin: 1rem auto 0;
	display: flex;
	overflow: hidden;
`;

const Logo = styled.img`
	margin: auto;
	height: ${(props) => (props.large ? 'auto' : '3rem')};
	@media (max-width: 900px) {
		height: ${(props) => (props.large ? '4rem' : '2rem')};
	}
	animation: rise 8s ease-out;
	@keyframes rise {
		0% {
			transform: translateY(100%);
		}
		10% {
			transform: translateY(100%);
		}
		30% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(15%);
		}
		65% {
			transform: translateY(0);
		}
		75% {
			transform: translateY(7%);
		}
		90% {
			transform: translateY(0);
		}
	}
`;

export { HeaderComponent, Logo };
