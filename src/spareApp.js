import React from 'react';
import Display from './components/Display';
import Keypads from './components/Keypads';
import './App.css';


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memory: '0',
      current: '0',
      equation: '0',
      operator: ''
    }

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.reset = this.reset.bind(this); 
    this.clear = this.clear.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this); 
  }

  handleNumbers(event) {
    event.preventDefault();
    let numClicked = event.target.name;
    let currentNum = this.state.current;
    let equationNum = this.state.equation;

    if (currentNum === '0' && equationNum === '0' && !currentNum.includes('.')) {
      currentNum = numClicked;
      equationNum = numClicked;
    }
    else if (currentNum === '0' && !currentNum.includes('.')) {
      currentNum = numClicked;
      equationNum += numClicked;
    }
    else {
      currentNum += numClicked;
      equationNum += numClicked;
    }
    /*equation*/
    /*if (equationNum === '0' && !equationNum.includes('.')) {
      equationNum = numClicked;
    }
    else {
      equationNum += numClicked;
    }*/
    
    /*Check max length*/
    if (currentNum.length > 18) {
      alert('Maximum amount of digits have been reached');  
      let num = [equationNum, currentNum];
      return num;
    }


    this.setState({
      current: currentNum,
      equation: equationNum
    });
  }

  handleOperators(event) {
    event.preventDefault();
    let operatorClicked = event.target.name;
    let currentOp = this.state.current;
    let equationOp = this.state.equation;
    let equationOpLen = equationOp.length;
    let lastEqnOp = equationOp[equationOp.length-1];

    if ((lastEqnOp === '+' || lastEqnOp === '-' || lastEqnOp === '*' || lastEqnOp === '/') && (operatorClicked === '+' || operatorClicked === '*' || operatorClicked === '/')) {
      let replacement = lastEqnOp.replace(lastEqnOp, operatorClicked);
      let eqnSub = equationOp.substring(0, equationOpLen-1);
      eqnSub += replacement;
      equationOp = eqnSub;
    } else {
      equationOp += operatorClicked;
    }
    
    this.setState({
      memory: currentOp,
      current: '0',
      equation: equationOp
    });
  }
  
  handleDecimal(event) {
    event.preventDefault();
    let decClicked = event.target.name;
    let currentDec = this.state.current;
    let equationDec = this.state.equation;
    let lastEqnChar = equationDec[equationDec.length-1];

    if (currentDec.indexOf('.') !== -1) {
      return currentDec;
    }
    else if (lastEqnChar === '+' || lastEqnChar === '-' || lastEqnChar === '*' || lastEqnChar === '/') {
      equationDec += '0';
      equationDec += decClicked;
    }
    else {
      currentDec +=decClicked;
      equationDec += decClicked;
    }

    this.setState({
      current: currentDec,
      equation: equationDec
    });
  }
  
  reset(event) {
    event.preventDefault();
    this.setState({
      memory: '0',
      current: '0',
      equation: '0',
      operator: ''
    });
  }

  clear(event) {
    let currentBs = this.state.current;
    let equationBs = this.state.equation;
    let currentBsLen = currentBs.length;
    let equationBsLen = equationBs.length;
    let sliceEnd = equationBsLen - currentBsLen;

    //equationBs = equationBs.substring(0, sliceEnd);

    this.setState({
      current: '0',
      equation: equationBs.substring(0, sliceEnd)
    });

    if (equationBsLen === currentBsLen) {
      this.setState({
        current: '0',
        equation:'0'
      });
    }
  }

  handleEvaluate(event) {
    event.preventDefault();
    //let memory = this.state.memory;
    //let current = this.state.current;
    let equation = this.state.equation;
    const evalEquation = eval(equation);
    try {
      this.setState({
        memory: evalEquation,
        current: evalEquation,
        equation: evalEquation
      });
    }
    catch(error) {
      this.setState({
        equation: '0',
        current: 'Syntax Error!'
      });
    }
    this.setState({
      equation: evalEquation,
      current: evalEquation,
      memory: evalEquation
    });
  }
  
  render() {
    return(
        <div id="calc-app">
            <Display result={this.state.current} computation={this.state.equation} />
            <Keypads 
                numbers={this.handleNumbers} 
                operator={this.handleOperators} 
                decimal={this.handleDecimal} 
                reset={this.reset} 
                backspace={this.clear} 
                evaluate={this.handleEvaluate} 
            /> 
        </div>

    );
  }
}

export default Calculator;
