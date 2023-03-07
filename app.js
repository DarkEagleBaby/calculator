//what do we want our calculator to do?
//when we press a number it will get added to the currenOper.
//when we press an operation it will be rememebred. if we press another number,
//the operation will execute. if we press enter/the equals sign, the operation will
//execute as well. 
//a decimal point will make all following numbers come after it and be
//calculated as such.

class Calculator{
constructor(currentOperTextElm,previousOperTextElm){
    this.currentOperTextElm = currentOperTextElm;
    this.previousOperTextElm = previousOperTextElm;
    this.clear();
}
clear(){
this.currentOperand = '';
this.previousOperand = '';
this.operation = undefined;
}

delete(){
this.currentOperTextElm = slice(0,(this.currentOperTextElm.length-1))
}

appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')){return};
this.currentOperand = this.currentOperand.toString()+number.toString();
}

chooseOperation(operation){

}

compute(){

}

updateDisplay(){
this.currentOperTextElm.innerText = this.currentOperand;
}


}
//first we select all our elements:
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const delButton = document.querySelector('[data-delete]');
const currentOperTextElm = document.querySelector('[data-current-operand]');
const previousOperTextElm = document.querySelector('[data-previous-operand]');

const calc = new Calculator(currentOperTextElm,previousOperTextElm);
console.log(calc.currentOperTextElm)

//adding number buttons event listener
numberButtons.forEach((button)=>{button.addEventListener('click',()=>{
calc.appendNumber(button.innerText);
calc.updateDisplay();
})})

//adding operation buttons event listeners
operationButtons.forEach((button)=>{button.addEventListener('click',()=>{
calc.chooseOperation(button.innerText);
calc.updateDisplay();
})})