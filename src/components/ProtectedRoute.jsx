import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))

    if(!userDetails){
        return <Navigate to="/" />
    }
    return children
}

export default ProtectedRoute