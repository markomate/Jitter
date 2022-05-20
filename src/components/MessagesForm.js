import { useState } from "react"

const MessageForm = ({loggedInUser, addMessage}) => {
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
            addMessage(formData.text)
            cleanMessage()
        }
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
                <input type="submit" value="Post" />
                <button onClick={cleanMessage}>Clean message</button>
            </form>
        </>
    )
}

export default MessageForm