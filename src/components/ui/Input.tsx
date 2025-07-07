"use client"

import type React from "react"
import { forwardRef } from "react"
import styles from "./Input.module.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    variant?: "default" | "outlined"
    formatPhone?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, variant = "default", formatPhone = false, className, onChange, ...props }, ref) => {
        const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!formatPhone) {
                onChange?.(e)
                return
            }

            let value = e.target.value

            // Remove all characters except numbers and +
            value = value.replace(/[^0-9+]/g, "")

            // Ensure + can only be at the beginning
            if (value.includes("+")) {
                const plusIndex = value.indexOf("+")
                if (plusIndex > 0) {
                    value = value.replace(/\+/g, "")
                } else {
                    // Keep only the first + and remove others
                    value = "+" + value.substring(1).replace(/\+/g, "")
                }
            }

            // Apply length restrictions
            if (value.startsWith("+")) {
                // Maximum 13 characters for international format
                value = value.substring(0, 13)
            } else if (value.startsWith("09")) {
                // Maximum 11 characters for local format
                value = value.substring(0, 11)
            } else if (value.startsWith("0") && !value.startsWith("09")) {
                // If starts with 0 but not 09, limit to prevent invalid formats
                value = value.substring(0, 2)
            } else if (!value.startsWith("+") && !value.startsWith("0")) {
                // If doesn't start with + or 0, limit to prevent invalid input
                value = value.substring(0, 1)
            }

            // Update the input value
            e.target.value = value
            onChange?.(e)
        }

        return (
            <div className={`${styles.inputWrapper} ${className || ""}`}>
                {label && (
                    <label className={styles.label} htmlFor={props.id}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`${styles.input} ${styles[variant]} ${error ? styles.error : ""}`}
                    onChange={formatPhone ? handlePhoneInput : onChange}
                    {...props}
                />
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        )
    },
)

Input.displayName = "Input"
