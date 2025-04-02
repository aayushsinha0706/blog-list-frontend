import PropTypes from 'prop-types'
const Notification = ({ message, category }) => {
  if (message === null) {
    return null
  }

  if (category === 'add') {
    return (
      <div className='add' data-testid='message'>
        {message}
      </div>
    )
  }

  if (category === 'error') {
    return (
      <div className='error' data-testid='message'>
        {message}
      </div>
    )
  }

  return null

}

Notification.propTypes = {
  message: PropTypes.string,
  category: PropTypes.string
}

export default Notification