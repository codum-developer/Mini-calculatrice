const button = document.querySelector(".button")
const input = document.querySelector(".input")
const response = document.querySelector(".response")
const containerHistory = document.querySelector("#historic")
const moreOption = document.querySelector("#more")
const nohistory = document.querySelector(".Nohistory")
const instantResponse = document.querySelector(".instantResponse")

setInterval(() => {
 if (containerHistory.open) {
  moreOption.style.display = "inline"
 }
 else {
  moreOption.style.display = "none"
 }
}, 100)


let inputArray = []
let historyData = []
let intervalCalc;
let inputToDisplay = ''
const operators = ["+", "-", "/", "x"]
const operatorsWithoutMunus = ["+", "/", "x"]


function displayInput(buttonValue) {
 if (response.textContent != "") {
  if (operators.includes(buttonValue.value)) {
   inputArray.splice(0, inputArray.length, response.textContent)
  }
 }
 
 response.textContent = ""
 input.style.fontSize = "1.5rem"
 response.style.fontSize = "1.5rem"
 input.style.transform = "translateY(0)"
 input.style.opacity = "1"
 response.style.transform = "translate(0)"
 
 switch (buttonValue.className) {
  case "deleteAll":
   window.location.reload()
   break;
  case "deleteOne":
   inputArray.pop()
   inputToDisplay = inputArray.join("")
   input.textContent = inputToDisplay
   break;
  case "equal":
   if (inputToDisplay === "") {
    return
   } else {
    clearInterval(intervalCalc)
    //console.log("egale Envoi : " + inputToDisplay.split(""))
    historic(inputToDisplay.split(""))
   }
   
   break;
  default:
   inputArray.push(buttonValue.value)
   if (operatorsWithoutMunus.includes(inputArray[0])) {
    inputArray.shift()
    return
   }
   if (operators.includes(inputArray[inputArray.length - 1]) && operators.includes(inputArray[inputArray.length - 2])) {
    inputArray.splice(inputArray.length - 2, 1)
    inputToDisplay = inputArray.join("")
    input.textContent = inputToDisplay
    return
   }
   inputToDisplay = inputArray.join("")
   input.textContent = inputToDisplay
   
   
   if (inputArray.some(elmt => operators.includes(elmt))) {
    intervalCalc = setInterval(() => {
     readyQuestion = analyseQuestion(inputToDisplay.split(""))
     result = calculator(readyQuestion)
     displayResponseIfCallbackTrigger(result)
    }, 500)
   }
 }
 
 return
}




function analyseQuestion(expression) {
 console.log(` analyse en cours : l'expression à analyser est: ${expression}`)
 const initialArray = expression
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
 if (operators.includes(expressionDivided[expressionDivided.length - 1][expressionDivided[expressionDivided.length - 1].length - 1])) {
  expressionDivided[expressionDivided.length - 1].pop()
  console.log("nouveau array : " + expressionDivided)
 }
 
 readyQuestion = []
 for (let i = 0; i < expressionDivided.length; i++) {
  readyQuestion.push(expressionDivided[i].join(""))
 }
 return readyQuestion
}

function calculator(expression) {
 let finallyValue;
 console.log("donnees réussi dans calculator : " + expression)
 let question = expression
 while (question.includes("x")) {
  let indexX = question.indexOf("x")
  let produce = question[indexX - 1] * question[indexX + 1]
  console.log("nouveau produit : " + produce)
  question.splice(indexX - 1, 3, produce)
  console.log("nouveau tableau: " + question)
  finallyValue = question.join("")
 }
 while (question.includes("/")) {
  let indexDivision = question.indexOf("/")
  let quotient = question[indexDivision - 1] / question[indexDivision + 1]
  console.log("nouveau quotient : " + quotient)
  question.splice(indexDivision - 1, 3, quotient)
  console.log("nouveau tableau: " + question)
  finallyValue = question.join("")
 }
 while (question.includes("-")) {
  let indexRest = question.indexOf("-")
  let rest = question[indexRest - 1] - question[indexRest + 1]
  console.log("nouveau rest : " + rest)
  question.splice(indexRest - 1, 3, rest)
  console.log("nouveau tableau: " + question)
  finallyValue = question.join("")
 }
 
 while (question.includes("+")) {
  let indexPlus = question.indexOf("+")
  let final = parseFloat(question[indexPlus - 1]) + parseFloat(question[indexPlus + 1])
  console.log("nouveau somme : " + final)
  question.splice(indexPlus - 1, 3, final)
  console.log("nouveau tableau: " + question)
  finallyValue = question.join("")
 }
 
 return finallyValue
}

function displayResponseIfCallbackTrigger(result) {
 instantResponse.textContent = result
}

function displayResponseIfEqualTrigger(result) {
 response.textContent = result
 response.style.fontSize = "2.5rem"
 response.style.opacity = "1"
 input.style.transform = "translateY(-20px) scale(4)"
 input.style.opacity = "0"
 response.style.transform = "translate(-4px ,-100px)"
 inputToDisplay = ""
 clearInterval(intervalCalc)
 //response.style.transform = "scale(2)"
}

intervalId = setInterval(() => {
 if (historyData.length === 0) {
  nohistory.style.display = "flex"
  nohistory.style.justifyContent = "center"
  nohistory.style.alignItems = "center"
 } else {
  nohistory.style.display = "none";
  clearInterval(intervalId)
 }
}, 100)


function historic(unreadyQuestion) {
 let readyQuestion = analyseQuestion(unreadyQuestion)
 let questionData = readyQuestion.join(" ")
 let result = calculator(readyQuestion)
 displayResponseIfEqualTrigger(result)
 
 let currentHistoryData = {
  [questionData]: readyQuestion.join("")
 }
 historyData.push(currentHistoryData)
 
 historyElemet = document.createElement("p")
 containerHistory.appendChild(historyElemet)
 historyElemet.style.margin = "10px 0 10px 0"
 
 data = historyData[historyData.length - 1]
 historyElemet.textContent = `${Object.keys(data)} = ${data[Object.keys(data)]}`
 
 
 
}