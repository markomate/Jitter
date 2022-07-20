import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import Button from '@mui/material/Button';
import { createMessage } from "../services/messagesServices";

const MessageForm = () => {
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    const navigate = useNavigate()
    const initialFormData = {
        text: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.text === ""){
            console.log("empty message")
        }else {
            console.log(formData)
            addMessage(formData)
            cleanMessage()
            navigate("/messages")
        }
    }
    
    const addMessage = (data) => {
        createMessage(data)
        .then(message => {
            dispatch({
            type: "addMessage",
            data: message
            })            
        })
      }

    const cleanMessage = () => {
        setFormData(initialFormData)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea type="text" name="text" id="text" placeholder={`What's on your mind ${loggedInUser}?`} value={formData.text} onChange={handleFormData} />
                </div>
                {/* <input type="submit" value="Post" /> */}
                <Button variant="contained" type="submit">Post</Button>
                <Button onClick={cleanMessage}>Clean message</Button>
            </form>
        </>
    )
}

export default MessageForm