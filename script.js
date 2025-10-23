const input = document.querySelector(".input")
const response = document.querySelector(".response")
const one = document.getElementById("one")
const two = document.getElementById("two")
const three = document.getElementById("three")
const four = document.getElementById("four")
const five = document.getElementById("five")
const six = document.getElementById("six")
const seven = document.getElementById("seven")
const eight = document.getElementById("eight")
const nine = document.getElementById("nine")
const zero = document.getElementById("zero")
const plus = document.getElementById("plus")
const muns = document.getElementById("munus")
const division = document.getElementById("division")
const multiplication = document.getElementById("multiplication")
const equal = document.getElementById("equal")
const point = document.getElementById("point")
const deleteOne = document.getElementById("deleteOne")
const deleteAll = document.getElementById("deleteAll")


one.addEventListener("click", () => {
 displayInput("1")
})
two.addEventListener("click", () => {
 displayInput("2")
})
three.addEventListener("click", () => {
 displayInput("3")
})
four.addEventListener("click", () => {
 displayInput("4")
})
five.addEventListener("click", () => {
 displayInput("5")
})
six.addEventListener("click", () => {
 displayInput("6")
})
seven.addEventListener("click", () => {
 displayInput("7")
})
eight.addEventListener("click", () => {
 displayInput("8")
})
nine.addEventListener("click", () => {
 displayInput("9")
})
zero.addEventListener("click", () => {
 displayInput("0")
})
point.addEventListener("click", () => {
 displayInput(".")
})
plus.addEventListener("click", () => {
 displayInput("+")
})
muns.addEventListener("click", () => {
 displayInput("-")
})
multiplication.addEventListener("click", () => {
 displayInput("x")
})
division.addEventListener("click", () => {
 displayInput("/")
})
deleteAll.addEventListener("click", () => {
 displayInput("cleanAll")
})
deleteOne.addEventListener("click", () => {
 displayInput("cleanOne")
})
equal.addEventListener("click", () => {
 displayInput("equal")
})

let inputArray = []
let inputToDisplay = ''

function displayInput(buttonValue) {
 switch (buttonValue) {
  case "cleanAll":
   window.location.reload(true)
   break;
  case "cleanOne":
   inputArray.pop()
   inputToDisplay = inputArray.reduce((acc, step) => acc + step, "")
   input.textContent = inputToDisplay
   break;
  case "equal":
   analyseQuetion(inputToDisplay.split(" "))
   break;
  default:
   console.log("nous somme dans défaut")
   const operators = ["+", "-", "/", "x"]
   inputArray.push(buttonValue)
   if (inputArray[0] === "-" || inputArray[0] === "+" || inputArray[0] === "x" || inputArray[0] === "/") {
    inputArray.shift()
    return
   }
   if (operators.includes(inputArray[inputArray.length -1]) && operators.includes(inputArray[inputArray.length -2]) ) {
    inputArray.pop()
    return
   }
   inputToDisplay = inputArray.join(" ")
   input.textContent = inputToDisplay
 }
 return
}

function analyseQuetion(expression) {
 console.log(` analyse en cours : l'expression à analyser est: ${expression}`)
 const initialArray = expression
 operators = ["+", "-", "/", "x"]
 let startIndex = 0
 const expressionDivided = []
 let i = 0
 while (i < initialArray.length - 1) {
  let element = initialArray[i]
  if (operators.includes(element)) {
   expressionDivided.push(initialArray.slice(startIndex, i))
   expressionDivided.push([element])
   console.log("nouvelle : " + expressionDivided)
   startIndex = i + 1
  }
  i++
 }
 expressionDivided.push(initialArray.slice(startIndex))
 console.log("array de sortie" + expressionDivided)
 
 //console.log("le dernier élément de dernière petite liste de la liste est : " + expressionDivided[expressionDivided.length -1][expressionDivided[expressionDivided.length -1].length -1] )
 if (operators.includes(expressionDivided[expressionDivided.length -1][expressionDivided[expressionDivided.length -1].length -1])) {
  expressionDivided[expressionDivided.length -1].pop()
  console.log("nouveau array : " + expressionDivided)
  }
 
 readyQuestion = []
 for (let i = 0; i < expressionDivided.length ; i++) {
  readyQuestion.push(expressionDivided[i].join(""))
  console.log(readyQuestion)
 }
 console.log(readyQuestion)
 calculator(readyQuestion)
}

function calculator(expression) {
 console.log("donnees réussi dans calculator : " + expression)
 question = expression
 
 while (question.includes("x")) {
  let indexX = question.indexOf("x")
  let produce = question[indexX - 1] * question[indexX + 1]
  console.log("nouveau produit : " + produce)
  question.splice(indexX - 1, 3, produce)
  console.log("nouveau tableau: " + question)
  displayResponse(produce)
 }
 while (question.includes("/")) {
  let indexDivision = question.indexOf("/")
  let quotient = question[indexDivision - 1] / question[indexDivision + 1]
  console.log("nouveau quotient : " + quotient)
  question.splice(indexDivision - 1, 3, quotient)
  console.log("nouveau tableau: " + question)
  displayResponse(quotient)
 }
 while (question.includes("-")) {
  let indexRest = question.indexOf("-")
  let rest = question[indexRest - 1] - question[indexRest + 1]
  console.log("nouveau rest : " + rest)
  question.splice(indexRest - 1, 3, rest)
  console.log("nouveau tableau: " + question)
  displayResponse(rest)
 }
 
 while (question.includes("+")) {
  let indexPlus = question.indexOf("+")
  let final = parseFloat(question[indexPlus - 1]) + parseFloat(question[indexPlus + 1])
  console.log("nouveau somme : " + final)
  question.splice(indexPlus - 1, 3, final)
  console.log("nouveau tableau: " + question)
  displayResponse(final)
 }
 
 
}

function displayResponse(result) {
 input.textContent = ""
 response.textContent = result
}