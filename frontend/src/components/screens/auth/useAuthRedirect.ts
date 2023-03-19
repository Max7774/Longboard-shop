import { useAuth } from "@/../src/hooks/useAuth"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const useAuthRedirect = () => {
    const { user } = useAuth()

    const { replace } = useRouter()

    useEffect(() => {
        if (user) replace('/')
    }, [])
}