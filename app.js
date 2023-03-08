//what do we want our calculator to do?
//when we press a number it will get added to the currenOper.
//when we press an operation it will be rememebred. if we press another number,
//the operation will execute. if we press enter/the equals sign, the operation will
//execute as well. 
//a decimal point will make all following numbers come after it and be
//calculated as such.

//our calculator class:
class Calculator{
    //when we initialise - we make our calculators current and previous text elements
    //be the documents current and previous text elements. we also call the clear function
    //so that the the calculator is reset
constructor(currentOperTextElm,previousOperTextElm){
    this.currentOperTextElm = currentOperTextElm;
    this.previousOperTextElm = previousOperTextElm;
    this.clear();
}

//the clear function sets current, previous operands as well as operation to nothing and 
//updates the display

clear(){
this.currentOperand = '';
this.previousOperand = '';
this.operation = undefined;
this.updateDisplay();
}

// delete takes the current operation showing on screen, removes it's last letter/character
//and updates the display
delete(){
this.currentOperand = currentOperTextElm.innerText.slice(0,-1);
this.updateDisplay();
}

//append number checks to see if there is already a period. if there is, and the user 
//tries to press period, it returns (does nothing) if there isn't, it appens whatever number has
//been pressed to the current operand.
appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')){return};
this.currentOperand = this.currentOperand.toString()+number.toString();
this.updateDisplay();
}

//takes in an operation from button. if current operand is empty, returns. 
//if previous operand is not empty, it first computes (like a calculator does when you press
//an operation while you have two numbers already in).
//makes the calc's operation the operation clicked. pushes the current operand up to the previous operand.
//clears the currentoperand and updates the display.

chooseOperation(operation){
    if(this.currentOperand===''){return}
    if(this.previousOperand!==''){this.compute()}
this.operation = operation;
this.previousOperand = this.currentOperand;
this.currentOperand = '';
this.updateDisplay();
}

//creates a final result variable. takes in the previous and current operands and depending on 
//the operation, runs a calculation.
//will not calculate if either operands are empty or only containing a decimal point.
//finally displays final result on current operand, clears previous operand and resets the operation.
compute(){
    let finalResult;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand)
    if(current!==''&&prev!==''&&current!=='.'&&prev!=='.'){
    if(this.operation==='X'){
        finalResult = current * prev;
    }else if(this.operation==='/'){
    finalResult = prev/current;
    }else if(this.operation==='+'){
        finalResult = current + prev;
    }else if(this.operation==='-'){
        finalResult = prev - current;
    }
    this.currentOperand = finalResult.toString();
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
    }
}

//a function to make sure the numbers are displayed right.
//takes in a number and turns it into a string.
//splits that string at a decimal point into 2 arrays: 1 with the numbers before the decimal
//(integers). and one with the numbers after (decimals).
//sets an integer display variable - this is what we will return.
//checks if the integer array is not a number (i.e. empty). if it is NaN then it is set to empty.
//if it is a number, it is converted to a string using toLocaleString - this adds in commas
//after every 3rd number.
//if decimal digits is empty - returns the integerDisplay. if it is not empty,
//returns integerdisplay . the decimal digits. our final result

finalNumber(num){
    const numString = num.toString()
    const numArray = numString.split('.')
    let integerDigits = parseFloat(numArray[0]);
    let decimalDigits = numArray[1];
    let integerDisplay;
    if(isNaN(integerDigits)){integerDisplay = '' }else{
        integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0})};
    if(decimalDigits != null){return `${integerDisplay}.${decimalDigits}`}
    else{return integerDisplay}


}
updateDisplay(){
this.currentOperTextElm.innerText = this.finalNumber(this.currentOperand);
if(this.operation!==undefined){
this.previousOperTextElm.innerText = `${this.finalNumber(this.previousOperand)} ${this.operation}`;
}else{
    this.previousOperTextElm.innerText = this.finalNumber(this.previousOperand);
}
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

//adding number buttons event listener
numberButtons.forEach((button)=>{button.addEventListener('click',()=>{
calc.appendNumber(button.innerText);
})})

//adding operation buttons event listeners
operationButtons.forEach((button)=>{button.addEventListener('click',()=>{
calc.chooseOperation(button.innerHTML);
})})

//adding compute to equals button

equalsButton.addEventListener('click',()=>{
    calc.compute();
})

// adding clear to clear button
clearButton.addEventListener('click',()=>{
    calc.clear();
})

//adding delete to delete number

delButton.addEventListener('click',()=>{
    calc.delete()

})