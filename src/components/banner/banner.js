import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './banner.module.css'

const Banner = (props) => {
  const { title, subTitle, imgUrl, videoId } = props
  const router = useRouter()

  const handleOnPlay = () => {
    router.push(`/video/${videoId}`)
  }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.buttonWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image 
                src='/static/icons/play_arrow.svg'
                alt='Play icon'
                width='32'
                height='32'
              />
              Play
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
        }}
      >
      </div>
    </section>
  )
}

export default Banner