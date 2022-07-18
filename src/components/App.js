import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import MessageForm from './MessagesForm'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import Messages from './Messages'
import About from './About'
import { useState } from 'react'
import initialMessageList from '../data/message-list.json'
import NotFound from './NotFound'
import MessageDetail from './MessageDetail'
import { reducer } from '../utils/reducer'

const App = () => {
  // useReducer handles 
  const initialState = {
    messageList: [],
    loggedInUser: ""
  }
  
  // useReducer recieves two params
  // reducer -> it is the function that is executed when
  // state -> it returns and array with two elements
  // store -> actually that's the name for the state
  // dispatch -> is the function that triggers the reducer function, its argument is an action
  const [store, dispatch] = useReducer(reducer, initialState)
  const {messageList, loggedInUser} = store

  // const [loggedInUser, setLoggedInUser] = useState("")
  // const [messageList, setMessageList] = useState(initialMessageList)
  
  const activateUser = (username) => {
    // setLoggedInUser(username)
    dispatch({
      type: "setLoggedInUser",
      data: username
    })
  }

  const addMessage = (text) => {
    const message = {
      text: text,
      user: loggedInUser,
      id: nextId(messageList)
    }
    // setMessageList(
    //   (messageList) => [...messageList, message]
    // )
    dispatch({
      type: "addMessage",
      data: message
    })
  }

  function nextId(data) {
    //first exculde the empty data case. 
    if(data.length === 0) return 1;

    //second handle if data is not empty
    const sortData = data.sort((a,b) => a.id - b.id)
    const nextId = sortData[sortData.length - 1].id + 1 
    return nextId
  }

  useEffect(
    ()=>{
      //fetch
      //setMessageList(initialMessageList)
      dispatch({
        type: "setMessageList",
        data: initialMessageList
      })
    }
    ,
    []
  )

  return (
    <div >
          <h1>Jitter</h1>
          {/* { !loggedInUser ?
            <LoginForm activateUser={activateUser} />
            :
            <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} /> 
          }
          <Messages messageList={messageList} /> */}
          <Router>
            <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
            <Routes>
              <Route path="/" element={<Navigate to="messages" />} />
              <Route path="messages">
                <Route index element={<Messages messageList={messageList}/>}/>                <Route path="new" element={
                  loggedInUser ?
                  <MessageForm loggedInUser={loggedInUser} addMessage={addMessage} />
                  :
                  <Navigate to="/login" />
                } />
                <Route path=":messageId" element={<MessageDetail messageList={messageList} />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="login" element={<LoginForm activateUser={activateUser} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
    </div>
  )
}

export default App
