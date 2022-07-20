import { Card, CardContent, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Message = ({message}) => {
    return (
        <Card>
            <Link to={`${message.id}`} style={{textDecoration: 'none'}}>
                <CardContent>
                    <Typography variant='body2'>{message.text}</Typography>
                    <Typography variant='h5'>{message.username}</Typography>
                    <Typography variant='h6'>{message.posted}</Typography>
                </CardContent>
            </Link>
        </Card>
    )
}

export default Message