"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
    gender: string
    name: {
        title: string
        first: string
        last: string
    }
    location: {
        street: {
            number: number
            name: string
        }
        city: string
        state: string
        country: string
        postcode: number
    }
    email: string
    phone: string
    cell: string
    picture: {
        large: string
        medium: string
        thumbnail: string
    }
}

interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for user data in localStorage on mount
        const checkStoredUser = () => {
            try {
                const storedUser = localStorage.getItem("user")
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser)
                    setUser(parsedUser)
                }
            } catch (error) {
                console.error("Error parsing stored user data:", error)
                localStorage.removeItem("user")
            } finally {
                setIsLoading(false)
            }
        }

        // Use requestIdleCallback for non-critical work
        if ("requestIdleCallback" in window) {
            requestIdleCallback(checkStoredUser)
        } else {
            setTimeout(checkStoredUser, 0)
        }
    }, [])

    const login = (userData: User) => {
        setUser(userData)
        try {
            localStorage.setItem("user", JSON.stringify(userData))
        } catch (error) {
            console.error("Error storing user data:", error)
        }
    }

    const logout = () => {
        setUser(null)
        try {
            localStorage.removeItem("user")
        } catch (error) {
            console.error("Error removing user data:", error)
        }
    }

    return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
