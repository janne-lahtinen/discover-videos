import videoTestData from '../data/videos.json'
import { getWatchedVideos, getMyListVideos } from './db/hasura'

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'
  const response = await fetch(`${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`)
  return await response.json()
}

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT
    const data = await fetchVideos(url) // isDev ? videoTestData : await fetchVideos(url) ei toimi > videon tiedot eivät päivity

    if (data?.error) {
      console.error('YouTube API error', data.error)
      return []
    }
  
    return data?.items.map(item => {
      const id = item.id?.videoId || item.id
      return {
        title: item.snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics ? item.statistics.viewCount : '-',
      }
    })
  } catch (error) {
    console.error('Something went wrong with video library', error)
    return []
  }
}

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`

  return getCommonVideos(URL)
}

export const getPopularVideos = async () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=FI&maxResults=25`

  return getCommonVideos(URL)
}

export const getYoutubeVideoById = async (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

  return getCommonVideos(URL)
}

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token)
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    }
  })
}

export const getMyListPageVideos = async (userId, token) => {
  const videos = await getMyListVideos(userId, token)
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
    }
  })
}