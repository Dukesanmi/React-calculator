import React from 'react';
import Display from './Components/Display';
import Keypads from './Components/Keypads';
import './App.css';


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memory: '0',
      current: '0',
      equation: '0'
    }

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.reset = this.reset.bind(this); 
    this.clear = this.clear.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this); 
  }

  /*Handle Number Input*/
  handleNumbers(event) {
    event.preventDefault();
    let numClicked = event.target.name;
    let currentNum = this.state.current;
    let equationNum = this.state.equation;
    let memoryNum = this.state.memory;
    let lastEqnNum = equationNum[equationNum.length-1];
    let semiLastEqnNum = equationNum[equationNum.length-2];

    if (currentNum === '0' && equationNum === '0' && !currentNum.includes('.')) {
      currentNum = numClicked;
      equationNum = numClicked;
    }
    else if (currentNum === '0' && !currentNum.includes('.')) {
      currentNum = numClicked;
      equationNum += numClicked;
    }
    else if (currentNum === memoryNum) {
      return currentNum;
    }
    else {
      currentNum += numClicked;
      equationNum += numClicked;
    }

    /*Check starts from zero*/
    if ((semiLastEqnNum === '+' || semiLastEqnNum === '-' || semiLastEqnNum === '*' || semiLastEqnNum === '/') && lastEqnNum === '0' && numClicked === '0') {
      return equationNum;
    }

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

  /*Handle Operator Input*/
  handleOperators(event) {
    event.preventDefault();
    let operatorClicked = event.target.name;
    let currentOp = this.state.current;
    let equationOp = this.state.equation;
    let equationOpLen = equationOp.length;
    let lastEqnOp = equationOp[equationOpLen-1];
    let semiLastEqnOp = equationOp[equationOpLen-2];

    if ((semiLastEqnOp === '+' || semiLastEqnOp === '-' || semiLastEqnOp === '*' || semiLastEqnOp === '/') && (lastEqnOp === '-') && (operatorClicked !== '-')) {
      let eqnSub3 = equationOp.substring(0, equationOp.indexOf(semiLastEqnOp));
      eqnSub3 += operatorClicked;
      equationOp = eqnSub3;
    }
    else if ((lastEqnOp === '+' || lastEqnOp === '-' || lastEqnOp === '*' || lastEqnOp === '/') && (operatorClicked === '+' || operatorClicked === '*' || operatorClicked === '/')) {
      let replacement = lastEqnOp.replace(lastEqnOp, operatorClicked);
      let eqnSub = equationOp.substring(0, equationOpLen-1);
      eqnSub += replacement;
      equationOp = eqnSub;
    }
    else if ((semiLastEqnOp === '+' || semiLastEqnOp === '-' || semiLastEqnOp === '*' || semiLastEqnOp === '/') && (lastEqnOp === '+' || lastEqnOp === '-' || lastEqnOp === '*' || lastEqnOp === '/') && (operatorClicked !== '-')) {
      //let replacement2 = lastEqnOp.replace(lastEqnOp, operatorClicked);
      let eqnSub2 = equationOp.substring(0, equationOpLen-2);
      eqnSub2 += operatorClicked;
      equationOp = eqnSub2;
    }
    else {
      equationOp += operatorClicked;
    }
    /* Minus X Minus = Plus! */
    if (lastEqnOp === '-' && operatorClicked === '-') {
      let replacement1 = lastEqnOp.replace(lastEqnOp, '+');
      let eqnSub1 = equationOp.substring(0, equationOpLen-1);
      eqnSub1 += replacement1;
      equationOp = eqnSub1;
    }
    this.setState({
      memory: currentOp,
      current: '0',
      equation: equationOp
    });
  }
  
  /*Handle Decimal Input*/
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
  
  /*Clear everything*/
  reset(event) {
    event.preventDefault();
    this.setState({
      memory: '0',
      current: '0',
      equation: '0',
      operator: ''
    });
  }
  
  /*Backspace-ish*/
  clear(event) {
    let currentBs = this.state.current;
    let equationBs = this.state.equation;
    let memoryBs = this.state.memory;
    let currentBsLen = currentBs.length;
    let equationBsLen = equationBs.length; 
    let sliceEnd = equationBsLen - currentBsLen;

    //equationBs = equationBs.substring(0, sliceEnd);
    if (equationBsLen === currentBsLen) {
      this.setState({
        current: '0',
        equation:'0'
      });
    }
    else {
      this.setState({
        current: '0',
        equation: equationBs.substring(0, sliceEnd)
      });
    }

    if (currentBs === memoryBs) {
      this.setState({
        current: '0',
        equation: '0',
        memory: '0'
      });
    }
  }

  /*Handle Equation Evaluation*/
  handleEvaluate(event) {
    event.preventDefault();

    let equation = this.state.equation;
    const evalEquation = eval;
    try {
      const Result = evalEquation(equation);
      this.setState({
        memory: Result,
        current: Result,
        equation: Result
      });
    }
    catch(error) {
      this.setState({
        equation: '0',
        current: 'Syntax Error!'
      });
    }
  }
  
  render() {
    return(
        <div id="app-wrapper">
            <img src="https://res.cloudinary.com/dxjqr24gm/image/upload/v1600540111/Webp.net-resizeimage.jpg" style={{width: 1365, height: 653}} id="bckgrnd-img" alt="background-img" />
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
                <h5>Designed and Developed by <a href="https://github.com/Dukesanmi">Sanmi Akande</a></h5>
            </div>
        </div>
    );
  }
}

export default Calculator;
