import {createContext, useReducer, useContext} from 'react'



const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()



export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  return (
  <NotificationContext.Provider value={[notification, dispatch]}>
    {props.children}
  </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

export default NotificationContext
