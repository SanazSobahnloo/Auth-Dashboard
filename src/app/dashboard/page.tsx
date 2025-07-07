"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Globe,
    LogOut,
    Settings,
    Bell,
    Activity,
    TrendingUp,
    Users,
    Award,
} from "lucide-react"
import styles from "./dashboard.module.scss"

const DashboardPage = () => {
    const { user, logout, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth")
        }
    }, [user, isLoading, router])

    const handleLogout = () => {
        logout()
        router.push("/auth")
    }

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    const stats = [
        { icon: Activity, label: "Active Sessions", value: "3", color: "#10B981" },
        { icon: TrendingUp, label: "Growth Rate", value: "+12%", color: "#3B82F6" },
        { icon: Users, label: "Team Members", value: "24", color: "#8B5CF6" },
        { icon: Award, label: "Achievements", value: "8", color: "#F59E0B" },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <div className={styles.userSection}>
                            <div className={styles.avatarContainer}>
                                <img
                                    src={user.picture.large || "/placeholder.svg"}
                                    alt={`${user.name.first} ${user.name.last} profile picture`}
                                    className={styles.avatar}
                                    width="56"
                                    height="56"
                                    loading="eager"
                                />
                                <div className={styles.statusIndicator} aria-label="Online status"></div>
                            </div>
                            <div className={styles.userInfo}>
                                <h1 className={styles.welcomeMessage}>Welcome back, {user.name.first}!</h1>
                                <p className={styles.subtitle}>
                                    {user.name.title} {user.name.first} {user.name.last}
                                </p>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <button className={styles.iconButton} aria-label="View notifications">
                                <Bell size={18} />
                                <span className={styles.notificationBadge} aria-label="3 unread notifications">
                                    3
                                </span>
                            </button>
                            <button className={styles.iconButton} aria-label="Open settings">
                                <Settings size={18} />
                            </button>
                            <Button onClick={handleLogout} variant="outline" size="sm" className={styles.logoutButton}>
                                <LogOut size={14} />
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className={styles.statsSection} aria-label="Dashboard statistics">
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                    <stat.icon size={20} aria-hidden="true" />
                                </div>
                                <div className={styles.statContent}>
                                    <h3 className={styles.statValue}>{stat.value}</h3>
                                    <p className={styles.statLabel}>{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <div className={styles.contentGrid}>
                        {/* Profile Card */}
                        <section className={styles.card} aria-labelledby="profile-heading">
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    <User size={18} aria-hidden="true" />
                                    <h2 id="profile-heading">Profile Information</h2>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.profileGrid}>
                                    <div className={styles.profileItem}>
                                        <Mail className={styles.profileIcon} size={14} aria-hidden="true" />
                                        <div className={styles.profileDetails}>
                                            <span className={styles.profileLabel}>Email</span>
                                            <span className={styles.profileValue}>{user.email}</span>
                                        </div>
                                    </div>
                                    <div className={styles.profileItem}>
                                        <Phone className={styles.profileIcon} size={14} aria-hidden="true" />
                                        <div className={styles.profileDetails}>
                                            <span className={styles.profileLabel}>Phone</span>
                                            <span className={styles.profileValue}>{user.phone}</span>
                                        </div>
                                    </div>
                                    <div className={styles.profileItem}>
                                        <Phone className={styles.profileIcon} size={14} aria-hidden="true" />
                                        <div className={styles.profileDetails}>
                                            <span className={styles.profileLabel}>Cell</span>
                                            <span className={styles.profileValue}>{user.cell}</span>
                                        </div>
                                    </div>
                                    <div className={styles.profileItem}>
                                        <Calendar className={styles.profileIcon} size={14} aria-hidden="true" />
                                        <div className={styles.profileDetails}>
                                            <span className={styles.profileLabel}>Gender</span>
                                            <span className={styles.profileValue}>{user.gender}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Location Card */}
                        <section className={styles.card} aria-labelledby="location-heading">
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    <MapPin size={18} aria-hidden="true" />
                                    <h2 id="location-heading">Location Details</h2>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.locationCard}>
                                    <div className={styles.addressSection}>
                                        <h3 className={styles.addressTitle}>Address</h3>
                                        <p className={styles.addressText}>
                                            {user.location.street.number} {user.location.street.name}
                                        </p>
                                    </div>
                                    <div className={styles.locationGrid}>
                                        <div className={styles.locationItem}>
                                            <span className={styles.locationLabel}>City</span>
                                            <span className={styles.locationValue}>{user.location.city}</span>
                                        </div>
                                        <div className={styles.locationItem}>
                                            <span className={styles.locationLabel}>State</span>
                                            <span className={styles.locationValue}>{user.location.state}</span>
                                        </div>
                                        <div className={styles.locationItem}>
                                            <span className={styles.locationLabel}>Country</span>
                                            <span className={styles.locationValue}>
                                                <Globe size={12} className={styles.countryIcon} aria-hidden="true" />
                                                {user.location.country}
                                            </span>
                                        </div>
                                        <div className={styles.locationItem}>
                                            <span className={styles.locationLabel}>Postcode</span>
                                            <span className={styles.locationValue}>{user.location.postcode}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Activity Card */}
                        <section className={styles.card} aria-labelledby="activity-heading">
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTitle}>
                                    <Activity size={18} aria-hidden="true" />
                                    <h2 id="activity-heading">Recent Activity</h2>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.activityList} role="list">
                                    <div className={styles.activityItem} role="listitem">
                                        <div className={styles.activityDot} aria-hidden="true"></div>
                                        <div className={styles.activityContent}>
                                            <p className={styles.activityText}>Profile updated successfully</p>
                                            <time className={styles.activityTime} dateTime="2025-01-05T14:00:00Z">
                                                2 hours ago
                                            </time>
                                        </div>
                                    </div>
                                    <div className={styles.activityItem} role="listitem">
                                        <div className={styles.activityDot} aria-hidden="true"></div>
                                        <div className={styles.activityContent}>
                                            <p className={styles.activityText}>New login from mobile device</p>
                                            <time className={styles.activityTime} dateTime="2025-01-04T14:00:00Z">
                                                1 day ago
                                            </time>
                                        </div>
                                    </div>
                                    <div className={styles.activityItem} role="listitem">
                                        <div className={styles.activityDot} aria-hidden="true"></div>
                                        <div className={styles.activityContent}>
                                            <p className={styles.activityText}>Password changed</p>
                                            <time className={styles.activityTime} dateTime="2025-01-02T14:00:00Z">
                                                3 days ago
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardPage
