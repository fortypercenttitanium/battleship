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
					shipLength={5}
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
					shipLength={4}
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
					shipLength={3}
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
					shipLength={3}
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
					shipLength={2}
				/>
			);
		},
	},
];

export default shipTypes;
