// 1- Criar o OP(objeto-principal) - OK
// 2- criar um evento para pegar as informações do form budget e passar para o infocredit(expense incluso) - OK
// 3- criar um evento para pegar as informações do form expense e passar para o infocredit - OK
// 4- Criar um novo objeto para cada item criado nas despesas de depois armanezar em um array - OK
// 5- pegar as informações do form expense e criar um novo item dentro da div list - OK
// 6- Manipular os itens edit/delete - OK

function inicia(){
    const budgetinput = document.getElementById("budinput")
    const expenseinput = document.getElementById("expenseamount")
    const expensename = document.getElementById("expensename")
    const formbudget = document.getElementById("formbud")
    const formexpense = document.getElementById("formexp")
    const budoutput = document.getElementById("valorbud")
    const expoutput = document.getElementById("valorexp")
    const baloutput = document.getElementById("valorbal")
    let budget = 0
    let expense = 0
    let balance = 0
    let id = 0
    let op = new OP()
    let itenslist = []

    // BUDGET FORM
    formbudget.addEventListener("submit", (e) =>{
        e.preventDefault()

        let budgetvalue = budgetinput.value
        if(budgetvalue == '' || Number(budgetvalue) < 0){
            op.showfeedback(e)
        }else{
            op.infocredit(budgetvalue, "0", budgetvalue)
            op.clearFiels()
        }
    })

    // EXPENSE FORM
    formexpense.addEventListener("submit", (e) =>{
        e.preventDefault()
        
        console.log("f")
        let expensevalue = expenseinput.value
        let nameitem = expensename.value
        if(expensevalue == '' || Number(expensevalue) < 0 || nameitem == ''){
            op.showfeedback(e)
        }else{
            op.infocredit(budget, expensevalue, budget)
            let item = new ITEM(nameitem, expensevalue, id)
            op.inserthtml(item)
            id++
            op.clearFiels()
            itenslist.push(item)
        }
    })

    // MANIPULANDO OS ITENS

    document.getElementById("dvlist").addEventListener("click", (e) =>{
        let tiravalor = e.target.parentElement.previousElementSibling.innerText.slice(1)
        if(e.target.classList.contains("delete")){ // BOTÃO DELETE
            e.target.parentElement.parentElement.remove()
            op.infocredit(budget, -tiravalor, budget)
        }else if(e.target.classList.contains("edit")){ // BOTÃO EDIT
            e.target.parentElement.parentElement.remove()
            console.log(tiravalor)
            op.infocredit(budget, -tiravalor, budget)
            expenseinput.value = tiravalor
            expensename.value = e.target.parentElement.previousElementSibling.previousElementSibling.innerText.slice(2)
        }
    })

    function OP(){
        OP.prototype.infocredit = function(bud, expen, balan){
            budget = Number(bud)
            expense += Number(expen)
            balan = budget - expense

            budoutput.innerText = budget
            expoutput.innerText = expense
            baloutput.innerText = balan

            if(balan > 0){
                baloutput.style.color = "green"
                baloutput.previousElementSibling.style.color = "green"
            }else if(balan < 0){
                baloutput.style.color = "red"
                baloutput.previousElementSibling.style.color = "red"
            }
        }

        OP.prototype.showfeedback = function(el){
            el.target.previousElementSibling.classList.remove("hidden")
            setTimeout(() =>{
                el.target.previousElementSibling.classList.add("hidden")
            }, 2000)
        }

        OP.prototype.inserthtml = function(item){
            const dvlist = document.getElementById("dvlist")
            dvlist.insertAdjacentHTML("beforeend", `<div class="product" data-id="${item.id}"><div class="title">- ${item.name}</div><div class="value">$${item.valor}</div><div class="edit_delete"><i class="edit fas fa-edit"></i><i class="delete fas fa-trash"></i></div></div>`)
        }

        OP.prototype.clearFiels = function(){
            budgetinput.value = ''
            expenseinput.value = ''
            expensename.value = ''
        }
    }

    class ITEM{
        constructor(name, valor, id){
            this.name = name
            this.valor = valor
            this.id = id
        }
    }
}

window.addEventListener("load", inicia)