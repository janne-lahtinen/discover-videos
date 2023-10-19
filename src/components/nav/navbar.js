import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './navbar.module.css'
import { magic } from '../../../lib/magic-client'

const NavBar = () => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)
  const [username, setUsername] = useState('')
  const [didToken, setDidToken] = useState('')

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata()
        const didToken = await magic.user.getIdToken()

        if (email) {
          setUsername(email)
        }
      } catch (error) {
        console.error("Error retrieving email:", error)
      }
    }
    getUsername()
  }, [])

  const handleOnClickHome = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleShowDropdown = (e) => {
    e.preventDefault()
    setShowDropdown(!showDropdown)
  }

  const handleSignOut = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      })

      const res = await response.json()
    } catch (error) {
      console.error("Error logging out", error)
      router.push("/login")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>
            <Image src={'/static/icons/netflix.svg'} alt='Netflix logo' width={128} height={34} />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image src={'/static/icons/expand_more.svg'} alt='Expand' width={24} height={24} />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href='/login' onClick={handleSignOut} className={styles.linkName}>
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}

          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar