import React from 'react'
import MessageForm from './MessagesForm'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import Messages from './Messages'
import { useState } from 'react'
import initialMessageList from '../data/message-list.json'

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("")
  const [messageList, setMessageList] = useState(initialMessageList)
  
  const activateUser = (username) => {
    setLoggedInUser(username)
  }

  const addMessage = (text) => {
    const message = {
      text: text,
      user: loggedInUser,
      id: messageList[messageList.length - 1].id + 1
    }
    setMessageList(
      (messageList) => [...messageList, message]
    )
  }

  return (
    <div >
          <h1>Jitter</h1>
          <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
          { !loggedInUser ?
            <LoginForm activateUser={activateUser} />
            :
            <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} /> 
          }
          <Messages messageList={messageList} />
    </div>
  )
}

export default App
