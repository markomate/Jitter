import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import MessageForm from './MessagesForm'
import Navigation from './Navigation'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Messages from './Messages'
import About from './About'
import NotFound from './NotFound'
import MessageDetail from './MessageDetail'
import { reducer } from '../utils/reducer'
import { StateContext } from '../utils/stateContext'
import { getMessages } from '../services/messagesServices'

const App = () => {
  // useReducer handles 
  const initialState = {
    messageList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null
  }
  
  // useReducer recieves two params
  // reducer -> it is the function that is executed when
  // state -> it returns and array with two elements
  // store -> actually that's the name for the state
  // dispatch -> is the function that triggers the reducer function, its argument is an action
  const [store, dispatch] = useReducer(reducer, initialState)
  const {loggedInUser} = store

  // const [loggedInUser, setLoggedInUser] = useState("")
  // const [messageList, setMessageList] = useState(initialMessageList)

  // const activateUser = (username) => {
  //   // setLoggedInUser(username)

  // }

  useEffect(
    ()=>{
      // axios.get("http://localhost:4000/messages")
      // .then(response => {
      //   console.log(response.data)
      //   dispatch({
      //     type: "setMessageList",
      //     data: response.data
      //   })
      // })
      //setMessageList(initialMessageList)
      getMessages()
      .then(messages => {
        dispatch({
          type: "setMessageList",
          data: messages
        })
      })
      .catch(e => {console.log(e)})
    }
    ,
    []
  )

  return (
    <div >
          {/* Wrap all the componenets that use global state like loggedInUser and messageList in the state context provider */}
          <StateContext.Provider value={{store, dispatch}}>
          {/* Wrap all the componenets involed in the app's routing */}
            <Router>
              <Navigation />
              <Routes>
                <Route path="/" element={<Navigate to="messages" />} />
                <Route path="messages">
                  <Route index element={<Messages />}/>                <Route path="new" element={
                    loggedInUser ?
                    <MessageForm />
                    :
                    <Navigate to="/login" />
                  } />
                  <Route path=":messageId" element={<MessageDetail />} />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignupForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </StateContext.Provider>
    </div>
  )
}

export default App
