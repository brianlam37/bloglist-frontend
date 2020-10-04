import React,{useState, useImperativeHandle} from 'react';
import {Button} from 'react-bootstrap';
const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () => {
		setVisible(!visible);
	};
	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	const display = () => {
		if(!visible){
			return(
				<Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
			);
		}else{
			return(
				<>
					{props.children}
				</>
			);
		}
	};

	return(
		<div>
			{display()}
		</div>
	);
});

Togglable.displayName = 'Toggable';

export default Togglable;