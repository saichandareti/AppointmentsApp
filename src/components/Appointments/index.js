import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    date: '',
    AppointmentsContainer: [],
    StarredItems: false,
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  onStarring = id => {
    const {AppointmentsContainer} = this.state

    const Updated = AppointmentsContainer.map(each => {
      if (each.id === id) {
        return {
          ...each,
          isStarred: !each.isStarred,
        }
      }
      return each
    })
    this.setState({AppointmentsContainer: Updated})
  }

  GetStarred = () => {
    this.setState(prevState => ({StarredItems: !prevState.StarredItems}))
  }

  onInputChange = event => {
    this.setState({titleInput: event.target.value})
  }

  AddAppointment = event => {
    event.preventDefault()
    const {titleInput, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      AppointmentsContainer: [
        ...prevState.AppointmentsContainer,
        newAppointment,
      ],
      titleInput: '',
      date: '',
    }))
  }

  render() {
    const {StarredItems, titleInput, date, AppointmentsContainer} = this.state

    let ItemsDisplay
    let addColor
    if (StarredItems === true) {
      ItemsDisplay = AppointmentsContainer.filter(
        each => each.isStarred === true,
      )
      addColor = 'add-color'
    } else {
      ItemsDisplay = AppointmentsContainer
      addColor = ''
    }
    return (
      <form className="main-container">
        <div className="bg-container">
          <div className="upper-container">
            <div className="left-container">
              <h1 className="main-heading">Add Appointment</h1>
              <label htmlFor="title-input" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title-input"
                className="title-input"
                placeholder="Title"
                onChange={this.onInputChange}
                value={titleInput}
              />
              <label htmlFor="date-input" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date-input"
                className="title-input"
                onChange={this.onDateChange}
                value={date}
              />
              <button
                className="button"
                type="submit"
                onClick={this.AddAppointment}
              >
                Add
              </button>
            </div>
            <div className="right-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="rule" />
          <div className="lower-container">
            <div className="starred-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-button ${addColor}`}
                onClick={this.GetStarred}
              >
                Starred
              </button>
            </div>

            <ul className="list-container">
              {ItemsDisplay.map(each => (
                <AppointmentItem
                  item={each}
                  key={each.id}
                  starFun={this.onStarring}
                />
              ))}
            </ul>
          </div>
        </div>
      </form>
    )
  }
}
export default Appointments
