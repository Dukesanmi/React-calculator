import React from 'react';

function Display(props) {
	return(
		<div id="display-area">
			<div id="display">
				<p>{props.result}</p>
			</div>
			<div id="compute">
				<p>{props.computation}</p>
			</div>
		</div>
	);
}

export default Display;