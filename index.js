const form = document.getElementById("form");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem('transactions')) || []

form.addEventListener("submit", e => {
    e.preventDefault();

    const description = document.getElementById('description').value 
    const amount = Number(document.getElementById('amount').value)
    const type = document.getElementById('type').value

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    }

    transactions.push(transaction)
    saveAndRender()
    form.reset()
})


function saveAndRender(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
    render()
}


function render(){
    list.innerHTML = ''

    if(transactions.length === 0){
        list.innerHTML = `<p class="empty">No transactions yet. Add your first transaction above.</p>`
    }

    let totalIncome = 0
    let totalExpense = 0

    transactions.forEach(trans => {
        const li = document.createElement('li')
        li.className = trans.type
        li.innerHTML = `
            ${trans.description} - ₹${trans.amount}
            <button class="delete" onclick="remove(${trans.id})">x</button>
        `
        list.appendChild(li)

        trans.type === "income" ? totalIncome += trans.amount : totalExpense += trans.amount;
    });

    income.textContent = `₹${totalIncome}`;
    expense.textContent = `₹${totalExpense}`;
    balance.textContent = `₹${(totalIncome - totalExpense)}`;
}


function remove(id){
    transactions = transactions.filter(trans => trans.id !== id)
    saveAndRender()
}

render();

