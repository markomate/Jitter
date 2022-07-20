import { Link, useParams } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import { Card, CardContent, Typography } from "@mui/material"


const MessageDetail = () => {
    const {store} = useGlobalState()
    const {messageList} = store

    const params = useParams()
    // console.log(params)

    const getMessage = (id) => {
        return messageList.find(m => m.id === parseInt(id))
    }
    const message = getMessage(params.messageId)
    return (
        <>
            { message ?
                <Card>
                    <CardContent>
                        <Typography variant='body2'>{message.text}</Typography>
                        <Typography variant='h5'>{message.username}</Typography>
                        <Typography variant='h6'>{message.posted}</Typography>
                    </CardContent>
                </Card>
                :
                <>
                    <p>Message not found</p>
                    <Link to="/messages">Go back to the main page</Link>
                </>
            }
            
        </>
    )
}

export default MessageDetail