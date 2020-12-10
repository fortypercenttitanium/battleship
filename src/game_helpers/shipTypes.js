import Carrier from '../components/icons/CarrierIcon';
import Battleship from '../components/icons/BattleshipIcon';
import Destroyer from '../components/icons/DestroyerIcon';
import Submarine from '../components/icons/SubmarineIcon';
import Patrol from '../components/icons/PatrolIcon';

const shipTypes = [
	{
		name: 'carrier',
		length: 5,
		getComponentWithProps: (props) => {
			return (
				<Carrier
					key={'carrier'}
					start={props.start}
					axis={props.axis}
					ship_length={5}
					position={props.position}
				/>
			);
		},
	},
	{
		name: 'battleship',
		length: 4,
		getComponentWithProps: (props) => {
			return (
				<Battleship
					key={'battleship'}
					start={props.start}
					axis={props.axis}
					ship_length={4}
					position={props.position}
				/>
			);
		},
	},
	{
		name: 'destroyer',
		length: 3,
		getComponentWithProps: (props) => {
			return (
				<Destroyer
					key={'destroyer'}
					start={props.start}
					axis={props.axis}
					ship_length={3}
					position={props.position}
				/>
			);
		},
	},
	{
		name: 'submarine',
		length: 3,
		getComponentWithProps: (props) => {
			return (
				<Submarine
					key={'submarine'}
					start={props.start}
					axis={props.axis}
					ship_length={3}
					position={props.position}
				/>
			);
		},
	},
	{
		name: 'patrol boat',
		length: 2,
		getComponentWithProps: (props) => {
			return (
				<Patrol
					key={'patrol-boat'}
					start={props.start}
					axis={props.axis}
					ship_length={2}
					position={props.position}
				/>
			);
		},
	},
];

export default shipTypes;
