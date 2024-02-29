import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))

    return (
        userDetails?.token ? children : <Navigate to="/" />
    )
}

export default ProtectedRoute