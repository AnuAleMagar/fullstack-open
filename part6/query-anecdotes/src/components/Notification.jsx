import { useEffect } from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
  const [notification, notificationDispatch] = useNotification()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, notificationDispatch])

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
