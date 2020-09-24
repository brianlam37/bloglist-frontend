import React,{useState, useImperativeHandle} from 'react'

const Togglable = React.forwardRef((props, ref) =>{
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () =>{
		setVisible(!visible);
	}
	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	const display = () =>{
		if(!visible){
			return(
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			)
		}else{
			return(
				<>
					{props.children}
					<button onClick={toggleVisibility}>cancel</button>
				</>
			)
		}
	}
	
	return(
		<div>
			{display()}
		</div>
	)
})

export default Togglable;