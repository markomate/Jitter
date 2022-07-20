// alternative to useState, more complex, powerful and flexible
// useState is a syntaxic sugar or useReducer that simplifies it

// reducer function
// it recieves 2 parameters
// it recieves the current state
// it recieves the action we want to implement to the state
// based on action the function will update the sate on way or another
// action is an object with 2 keys, type and data
// type key determines what is the action we are taking
// data key contains the data necessary to update the sate

// the function returns the updated state

export const reducer = (state, action) => {
  // console.log(state)
  // console.log(action)

  switch(action.type){
    case "cleanState": {
      // state goes back to default values
      return {
        messageList: [],
        loggedInUser: ""
      }
    }
    case "setMessageList": {
      // populate the messageList Array with the initial values
      return {
        ...state,
        messageList: action.data
      }
    }
    case "addMessage": {
      // populate the messageList Array with the initial values
      return {
        ...state,
        messageList: [action.data, ...state.messageList]
      }
    }
    case "setLoggedInUser": {
      // updates the loggedInUser value
      return {
        ...state,
        loggedInUser: action.data
      }
    }
    case "setToken": {
      // updates the token value
      return {
        ...state,
        token: action.data
      }
    }

    default: return state
  }
}