// 1- Criar o OP(objeto-principal) - OK
// 2- criar um evento para pegar as informações do form budget e passar para o infocredit(expense incluso) - OK
// 3- criar um evento para pegar as informações do form expense e passar para o infocredit - OK
// 4- pegar as informações do form expense e criar um novo item dentro da div list  <--

function inicia(){
    const budgetinput = document.getElementById("budinput")
    const expenseinput = document.getElementById("expenseamount")
    const formbudget = document.getElementById("formbud")
    const formexpense = document.getElementById("formexp")
    const budoutput = document.getElementById("valorbud")
    const expoutput = document.getElementById("valorexp")
    const baloutput = document.getElementById("valorbal")
    let budget = 0
    let expense = 0
    let balance = 0

    let op = new OP()

    // BUDGET FORM
    formbudget.addEventListener("submit", (e) =>{
        e.preventDefault()

        let budgetvalue = budgetinput.value
        op.infocredit(budgetvalue, "0", budgetvalue)
        budgetinput.value = ''
    })

    // EXPENSE FORM
    formexpense.addEventListener("submit", (e) =>{
        e.preventDefault()
        console.log("f")
        let expensevalue = expenseinput.value
        op.infocredit(budget, expensevalue, budget)
        expenseinput.value = ''
        // 4-
    })

    function OP(){
        OP.prototype.infocredit = function(bud, expen, balan){
            budget = Number(bud)
            expense += Number(expen)
            balan = budget - expense

            budoutput.innerText = budget
            expoutput.innerText = expense
            baloutput.innerText = balan
        }
    }
}

window.addEventListener("load", inicia)