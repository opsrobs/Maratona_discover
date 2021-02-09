const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        // Fechar o modal
        // Remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}

const transactions = [
    {
    
    description: 'Luz',
    amount: -50001,
    data: '23/01/2121',
    },
    {
    
    description: 'Website',
    amount: 500000,
    data: '23/01/2121',
    },
    {
    
    description: 'Internet',
    amount: -20000,
    data: '23/01/2121',
    },
    {
        
        description: 'FreeLancer',
        amount: 300000,
        data: '23/01/2121',
        },
]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)
        
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        
    },

    
    incomes () {
        let income = 0;
        // pegar todas as transações 
        // para cada transação,
        Transaction.all.forEach(transaction => {
            //se for maior que zero
            if(transaction.amount > 0) {
                // somar a uma variavel e retornar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses () {
        let expense = 0;
        // pegar todas as transações 
        // para cada transação,
        Transaction.all.forEach(transaction => {
            //se for menor que zero
            if(transaction.amount < 0) {
                // somar a uma variavel e retornar a variavel
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total () {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction (transaction, index) {
        const tr = document.createElement ('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction (transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date"${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `

        return html
    },

    updateBalance() {
        document
          .getElementById('incomeDisplay')
          .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
          .getElementById('expenseDisplay')
          .innerHTML =  Utils.formatCurrency (Transaction.expenses())
        document
          .getElementById('totalDisplay')
          .innerHTML =  Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {
    submit(event) {
        event.preventDefault()

        //verificar se todas as informações foram preenchidas
        //formatar os dados
        //salvar
        //apagar os dados do formulario
        //fechar o modal
        //atualizarr a aplicação

    }
}

const App = {
    init(){
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
    },
    relod () {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()



