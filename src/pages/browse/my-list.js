import NavBar from "@/components/nav/navbar"
import Head from "next/head"
import SectionCards from "@/components/card/section-cards"
import { redirectUser } from '@/utils/redirectUser'
import styles from '../../styles/MyList.module.css'
import { getMyListPageVideos } from '../../../lib/videos'

export async function getServerSideProps(context) {
  const {userId, token} = await redirectUser(context)

  const myListVideos = await getMyListPageVideos(userId, token)

  return {
    props: {
      myListVideos
    }
  }
}

const MyList = ({ myListVideos = [] }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title='My list'
            videos={myListVideos}
            size='small'
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  )
}

export default MyList