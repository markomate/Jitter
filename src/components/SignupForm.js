import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../utils/stateContext"
import Button from '@mui/material/Button';
import { InputLabel, TextField, Typography } from "@mui/material";
import { signUp } from "../services/authServices";

const SignupForm = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate()

    const initialFormData = {
        username: "",
        email:"",
        password: "",
        password_confirmation: ""
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleSubmit = (e) => {
        e.preventDefault()

        signUp(formData)
        .then(({username, jwt}) => {
            sessionStorage.setItem("username", username)
            sessionStorage.setItem("token", jwt)
            dispatch({
                type: "setLoggedInUser",
                data: username
            })
            dispatch({
                type: "setToken",
                data: jwt
            })
        })
        .catch(e => {console.log(e)})
        setFormData(initialFormData)
        navigate("/messages")
    }

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <>
            <Typography variant='h5'>Register user</Typography>
                <form onSubmit={handleSubmit}>
                    <div>
                        <InputLabel>Username:</InputLabel>
                        <TextField type="text" name="username" id="username" value={formData.username} onChange={handleFormData} />
                    </div>
                    <div>
                        <InputLabel>Email:</InputLabel>
                        <TextField type="text" name="email" id="email" value={formData.email} onChange={handleFormData} />
                    </div>
                    <div>
                        <InputLabel>Password:</InputLabel>
                        <TextField type="password" name="password" id="password" value={formData.password} onChange={handleFormData} />
                    </div>
                    <div>
                        <InputLabel>Password confirmation:</InputLabel>
                        <TextField type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData} />
                    </div>

                    <Button variant="contained" type="submit">Sign Up</Button>
                </form>
        </>
    )
}

export default SignupForm