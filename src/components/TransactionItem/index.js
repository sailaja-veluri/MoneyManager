// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {
    id,
    inputTitle,
    inputAmt,
    inputType,
    transactionTypeOptionsList,
  } = transactionDetails
  const displayTextArray = transactionTypeOptionsList.filter(
    each => each.optionId === inputType,
  )
  const onDelete = () => {
    deleteTransaction(id)
  }
  return (
    <li className="list-item">
      <p className="items-in-list">{inputTitle}</p>
      <p className="items-in-list">RS {inputAmt}</p>
      <p className="items-in-list">{displayTextArray[0].displayText}</p>
      <button
        data-testid="delete"
        type="button"
        className="delete-button"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
