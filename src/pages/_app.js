import '@/styles/globals.css'
import { magic } from '../../lib/magic-client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/loading/loading'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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

  return isLoading ? <Loading /> : <Component {...pageProps} />
}
