import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    incomeAmt: 0,
    expensesAmt: 0,
    balanceAmt: 0,
    inputTitle: '',
    inputAmt: '',
    inputType: 'INCOME',
    historyList: [],
  }

  onAddAmt = event => {
    event.preventDefault()
    const {
      historyList,
      inputTitle,
      inputAmt,
      inputType,
      incomeAmt,
      expensesAmt,
      balanceAmt,
    } = this.state
    const newHistory = {
      id: uuidv4(),
      inputTitle,
      inputAmt,
      inputType,
      transactionTypeOptionsList: transactionTypeOptions,
    }

    if (inputType === 'INCOME') {
      this.setState(prevState => ({
        historyList: [...prevState.historyList, newHistory],
        incomeAmt: prevState.incomeAmt + parseInt(inputAmt),
        balanceAmt: prevState.balanceAmt + parseInt(inputAmt),
        inputTitle: '',
        inputAmt: '',
        inputType: 'INCOME',
      }))
    } else {
      this.setState(prevState => ({
        historyList: [...prevState.historyList, newHistory],
        expensesAmt: prevState.expensesAmt + parseInt(inputAmt),
        balanceAmt: prevState.balanceAmt - parseInt(inputAmt),
        inputTitle: '',
        inputAmt: '',
        inputType: 'INCOME',
      }))
    }
  }

  onChangeAmt = event => {
    this.setState({inputAmt: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({inputTitle: event.target.value})
  }

  onChangeType = event => {
    this.setState({inputType: event.target.value})
  }

  deleteTransaction = id => {
    const {historyList, incomeAmt, balanceAmt, expensesAmt} = this.state
    const filteredList = historyList.filter(each => each.id !== id)
    const deletedItemList = historyList.filter(each => each.id === id)
    if (deletedItemList[0].inputType === 'INCOME') {
      const updatedIncomeAmt = incomeAmt - parseInt(deletedItemList[0].inputAmt)
      const updatedBalanceAmt =
        balanceAmt - parseInt(deletedItemList[0].inputAmt)

      this.setState({
        historyList: filteredList,
        incomeAmt: updatedIncomeAmt,
        balanceAmt: updatedBalanceAmt,
      })
    } else {
      const updatedExpensesAmt =
        expensesAmt - parseInt(deletedItemList[0].inputAmt)
      const updatedBalanceAmt =
        balanceAmt + parseInt(deletedItemList[0].inputAmt)

      this.setState({
        historyList: filteredList,
        expensesAmt: updatedExpensesAmt,
        balanceAmt: updatedBalanceAmt,
      })
    }
  }

  render() {
    const {
      incomeAmt,
      balanceAmt,
      expensesAmt,
      historyList,
      inputTitle,
      inputAmt,
      inputType,
    } = this.state
    return (
      <>
        <div className="bg-container">
          <div className="money-manager-container">
            <div className="name-container">
              <h1 className="name">Hi Richard</h1>
              <p className="wishes-para">
                Welcome back to your{' '}
                <span className="money-mn-color">Money Manager</span>
              </p>
            </div>
            <div className="moneyDetails-container">
              <MoneyDetails
                imgLink="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                amt={balanceAmt}
                displayMsg="Your Balance"
                altValue="balance"
                dataTestIdValue="balanceAmount"
              />
              <MoneyDetails
                imgLink="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
                amt={incomeAmt}
                displayMsg="Your Income"
                altValue="income"
                dataTestIdValue="incomeAmount"
              />
              <MoneyDetails
                imgLink="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                amt={expensesAmt}
                displayMsg="Your Expenses"
                altValue="expenses"
                dataTestIdValue="expensesAmount"
              />
            </div>

            <div className="form-history-container">
              <div className="form-container">
                <h1 className="form-heading">Add Transaction</h1>
                <form className="form" onSubmit={this.onAddAmt}>
                  <label htmlFor="titleInput" className="label-details">
                    TITLE
                  </label>
                  <input
                    type="text"
                    id="titleInput"
                    value={inputTitle}
                    onChange={this.onChangeTitle}
                    className="input-title"
                    placeholder="TITLE"
                  />
                  <label htmlFor="amtInput" className="label-details">
                    AMOUNT
                  </label>
                  <input
                    type="text"
                    id="amtInput"
                    value={inputAmt}
                    onChange={this.onChangeAmt}
                    className="input-amt"
                    placeholder="AMOUNT"
                  />
                  <label htmlFor="typeInput" className="label-details">
                    TYPE
                  </label>
                  <select
                    id="typeInput"
                    value={inputType}
                    onChange={this.onChangeType}
                  >
                    <option value="INCOME" selected>
                      Income
                    </option>
                    <option value="EXPENSES">Expenses</option>
                  </select>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <div className="history-container">
                <h1 className="history-heading">History</h1>
                <ul className="history-ul-container">
                  <div className="history-table-header">
                    <p className="header-style">Title</p>
                    <p className="header-style">Amount</p>
                    <p className="header-style">Type</p>
                  </div>

                  {historyList.map(each => (
                    <TransactionItem
                      key={each.id}
                      transactionDetails={each}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MoneyManager
