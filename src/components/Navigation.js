import { Link, useNavigate } from "react-router-dom"


const Navigation = ({loggedInUser, activateUser}) => {
    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        activateUser("")
        navigate("/messages")
    }

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            { loggedInUser ?
                <>
                    <Link to="/messages/new" >New message</Link>
                    {loggedInUser}
                    <Link to="/" onClick={logout}>Logout</Link>
                </>
                :
                <>
                    Guest
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            }
        </>
    )
}

export default Navigation