import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {item, starFun} = props
  const {title, date, id, isStarred} = item

  const onstarring = () => {
    starFun(id)
  }

  const starImage = isStarred ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
      className="star"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="star"
      className="star"
    />
  )
  const newList = date.split('-')

  const formattedDate = format(
    new Date(parseInt(newList[0]), parseInt(newList[2]), parseInt(newList[1])),
    'dd MMMM yyyy, EEEE',
  )
  return (
    <li className="list-item">
      <div className="name-con">
        <p className="list-heading">{title}</p>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={onstarring}
        >
          {starImage}
        </button>
      </div>
      <p className="date">Date: {formattedDate}</p>
    </li>
  )
}
export default AppointmentItem
