import type React from "react"
import styles from "./Button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline"
    size?: "sm" | "md" | "lg"
    loading?: boolean
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    loading = false,
    children,
    className,
    disabled,
    ...props
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ""}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className={styles.spinner}></span>
                    <span className={styles.loadingText}>{children}</span>
                </>
            ) : (
                children
            )}
        </button>
    )
}
