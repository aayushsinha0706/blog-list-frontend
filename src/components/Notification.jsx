const Notification = ({message, category}) => {
    if (message === null) {
        return null
    }

    if (category === 'add') {
        return (
            <div className='add'>
              {message}
            </div>
        )
    }

    if (category === 'error') {
        return (
            <div className='error'>
              {message}
            </div>
        )
    }
    
}

export default Notification