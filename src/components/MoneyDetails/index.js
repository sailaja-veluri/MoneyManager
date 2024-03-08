// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {imgLink, amt, displayMsg, altValue, dataTestIdValue} = props
  let bgColorClass
  if (displayMsg === 'Your Balance') {
    bgColorClass = 'bgColor-balance'
  } else if (displayMsg === 'Your Income') {
    bgColorClass = 'bgColor-income'
  } else if (displayMsg === 'Your Expenses') {
    bgColorClass = 'bgColor-expenses'
  }
  return (
    <div className={`money-card ${bgColorClass}`}>
      <img src={imgLink} alt={altValue} className="image-styles" />
      <div className="msg-amt-container">
        <p className="heading-in-card">{displayMsg}</p>
        <p className="amt-in-card" data-testid={dataTestIdValue}>
          RS {amt}
        </p>
      </div>
    </div>
  )
}

export default MoneyDetails
