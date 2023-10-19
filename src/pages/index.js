import Head from 'next/head'
import { Roboto_Slab } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner/banner'
import NavBar from '@/components/nav/navbar'
import SectionCards from '@/components/card/section-cards'
import { getVideos, getPopularVideos, getWatchItAgainVideos } from '../../lib/videos'
import { verifyToken } from '../../lib/utils'
import useRedirectUser from '@/utils/redirectUser'

export async function getServerSideProps(context) {
  const {userId, token} = await useRedirectUser(context)

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
  const disneyVideos = await getVideos('disney trailer')
  const travelVideos = await getVideos('travel')
  const productivityVideos = await getVideos('productivity')
  const popularVideos = await getPopularVideos()

  return {
    props: {
      disneyVideos,
      watchItAgainVideos,
      travelVideos,
      productivityVideos,
      popularVideos
    }
  }
}

const robotoSlab = Roboto_Slab({
  weight: ['300', '400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Home(
  {
    disneyVideos,
    watchItAgainVideos = [],
    travelVideos,
    productivityVideos,
    popularVideos
  }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="This is a Netflix clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${robotoSlab.className}`}>
        <div className={styles.description}>
          <NavBar username='paavo.holopainen@kukkuu.fi' />
          <Banner 
            title='Matrix'
            subTitle='Everything is not what it seems...'
            imgUrl='/static/matrix.webp'
            videoId='kpGo2_d3oYE'
          />
          <div className={styles.sectionWrapper}>
            <SectionCards title='Disney' videos={disneyVideos} size='large' />
            <SectionCards title='Watch it again' videos={watchItAgainVideos} size='small' />
            <SectionCards title='Travel' videos={travelVideos} size='small' />
            <SectionCards title='Productivity' videos={productivityVideos} size='medium' />
            <SectionCards title='Popular' videos={popularVideos} size='small' />
          </div>
        </div>
      </main>
    </div>
  )
}
