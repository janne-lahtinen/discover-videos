import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '@/styles/Login.module.css'
import { useEffect, useState } from 'react'
import { magic } from '../../lib/magic-client'

const Login = () => {
  const [email, setEmail] = useState()
  const [userMsg, setUserMsg] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  const handleOnChangeEmail = (e) => {
    const email = e.target.value
    setUserMsg('')
    setEmail(email)
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()

    if (email) {
      // log in a user by their email
      try {
        setIsLoading(true)
        const didToken = await magic.auth.loginWithMagicLink({ email })
        console.log({didToken})
        if (didToken) {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${didToken}`,
              'Content-Type': 'application/json',
            }
          })
          const loggedInResponse = await response.json()
          if (loggedInResponse.done) {
            console.log({loggedInResponse})
            router.push('/') // route to dashboard
          } else {
            setIsLoading(false)
            setUserMsg('Something went wrong logging in.')
          }
        }
      } catch (error) {
        console.error('Something went wrong logging in.', error)
        setIsLoading(false)
      }
    } else {
      // show user message
      setUserMsg('Enter a valid email address.')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign In</title>
        <meta name="description" content="Sign in to Netflix" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href='/'>
            <Image src={'/static/icons/netflix.svg'} alt='Netflix logo' width={128} height={34} />
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sing In</h1>
          <input className={styles.emailInput} type='text' placeholder='Email address' onChange={handleOnChangeEmail}></input>
          <p className={styles.userMsg}>{userMsg}</p>
          <button
            className={styles.loginBtn}
            onClick={handleLoginWithEmail}
          >
            {isLoading ? 'Loading...' : 'Sing In'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login