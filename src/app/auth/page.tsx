"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"
import { Phone, Sparkles } from "lucide-react"
import styles from "./auth.module.scss"

interface FormData {
    phoneNumber: string
}

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showDemo, setShowDemo] = useState(false)
    const router = useRouter()
    const { login, user } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push("/dashboard")
        }
    }, [user, router])

    const validateIranianPhone = (phone: string) => {
        const cleanPhone = phone.replace(/[^0-9+]/g, "")

        if (cleanPhone.startsWith("+98")) {
            const phoneRegex = /^\+989\d{9}$/
            return phoneRegex.test(cleanPhone) || "Please enter a valid Iranian phone number (+989xxxxxxxxx)"
        }

        if (cleanPhone.startsWith("09")) {
            const phoneRegex = /^09\d{9}$/
            return phoneRegex.test(cleanPhone) || "Please enter a valid Iranian phone number (09xxxxxxxxx)"
        }

        return "Phone number must start with +989 or 09"
    }

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)

        try {
            const response = await fetch("https://randomuser.me/api/?results=1&nat=us")
            const result = await response.json()

            if (result.results && result.results.length > 0) {
                const userData = result.results[0]
                login(userData)
                router.push("/dashboard")
            } else {
                throw new Error("No user data received")
            }
        } catch (error) {
            console.error("Login failed:", error)
            alert("Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.backgroundElements}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.leftPanel}>
                    <div className={styles.brandSection}>
                        <div className={styles.logo}>
                            <Sparkles size={32} />
                        </div>
                        <h1 className={styles.brandTitle}>Welcome to Dashboard</h1>
                        <p className={styles.brandSubtitle}>
                            Experience the future of user management with our modern, responsive platform designed for professionals.
                        </p>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span>Modern Interface</span>
                            </div>
                            <div className={styles.feature}>
                                <span>Secure Authentication</span>
                            </div>
                            <div className={styles.feature}>
                                <span>Fully Responsive</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightPanel}>
                    <div className={styles.authCard}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Sign In</h2>
                            <p className={styles.subtitle}>Enter your Iranian phone number to continue</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <Input
                                    id="phoneNumber"
                                    label="Iranian Phone Number"
                                    placeholder="+989123456789 or 09123456789"
                                    formatPhone={true}
                                    {...register("phoneNumber", {
                                        required: "Phone number is required",
                                        validate: validateIranianPhone,
                                    })}
                                    error={errors.phoneNumber?.message}
                                />
                            </div>

                            <Button type="submit" loading={isLoading} size="lg" className={styles.loginButton}>
                                {isLoading ? (
                                    "Signing In..."
                                ) : (
                                    <>
                                        <Phone size={18} />
                                        Sign In with Phone
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className={styles.demoSection}>
                            <button type="button" onClick={() => setShowDemo(!showDemo)} className={styles.demoToggle}>
                                Need help? View demo numbers
                            </button>
                            {showDemo && (
                                <div className={styles.demoNumbers}>
                                    <p className={styles.demoTitle}>Try these demo numbers:</p>
                                    <div className={styles.demoList}>
                                        <code>+989123456789</code>
                                        <code>09123456789</code>
                                        <code>09987654321</code>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
