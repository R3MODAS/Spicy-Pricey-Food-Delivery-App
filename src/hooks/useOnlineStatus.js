import { useEffect } from "react"
import { useState } from "react"

const useOnlineStatus = () => {
    const [OnlineStatus, setOnlineStatus] = useState(true)

    useEffect(() => {
        window.addEventListener("offline", () => {
            setOnlineStatus(false)
        })

        window.addEventListener("online", () => {
            setOnlineStatus(true)
        })
    }, [])

    return OnlineStatus
}

export default useOnlineStatus