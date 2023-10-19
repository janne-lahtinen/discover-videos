import Link from 'next/link'
import Card from './card'
import clsx from 'classnames'
import styles from './section-cards.module.css'

const sectionCards = (props) => {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props
  // console.log({videos});
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Link href={`/video/${video.id}`} key={idx} >
              <Card imgUrl={video.imgUrl} size={size} id={idx} shouldScale={shouldScale} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default sectionCards