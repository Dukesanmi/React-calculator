import React from 'react';


function Keypads(props) {
	return(
	    <div className="keypads">
	      <div id="keypad-wrapper">
	        <div className="keypad-row">
                <button id="clear" onClick={props.reset} name="AC">AC</button>
			    <button id="backspace" onClick={props.backspace} name="C">C</button>
			    <button id="percentage" onClick='' name="%">%</button>
		        <button className="operators" id="divide" onClick={props.operator} name="/">/</button>
	        </div>
		    <div className="keypad-row">
		        <button className="numbers" id="seven" onClick={props.numbers} name="7">7</button>
		        <button className="numbers" id="eight" onClick={props.numbers} name="8">8</button>
		        <button className="numbers" id="nine" onClick={props.numbers} name="9">9</button>
		        <button className="operators" id="subtract" onClick={props.operator} name="-">-</button>
		    </div>		    
		    <div className="keypad-row">
		        <button className="numbers" id="four" onClick={props.numbers} name="4">4</button>
		        <button className="numbers" id="five" onClick={props.numbers} name="5">5</button>
		        <button className="numbers" id="six" onClick={props.numbers} name="6">6</button>
		        <button className="operators" id="multiply" onClick={props.operator} name="*">x</button>
		    </div>
		    
		    <div className="keypad-row">
		        <button className="numbers" id="one" onClick={props.numbers} name="1">1</button>
		        <button className="numbers" id="two" onClick={props.numbers} name="2">2</button>
		        <button className="numbers" id="three" onClick={props.numbers} name="3">3</button>
		        <button className="operators" id="add" onClick={props.operator} name="+">+</button>
		    </div>
		    
		    <div className="keypad-row">
		        <button className="numbers" id="zero" onClick={props.numbers} name="0">0</button>
		        <button id="decimal" onClick={props.decimal} name=".">.</button>
			    <button id="equals" onClick={props.evaluate} name="=">=</button>
		    </div>
		  </div>  
		</div>  
	);
}

export default Keypads;