import {
  LENSTER_WEBSITE_URL,
  NECTARHUB_APP_NAME,
  NECTARHUB_TWITTER_HANDLE,
  NECTARHUB_WEBSITE_URL
} from '../constants'
import type { NectarhubPublication } from '../custom-types'

const getViewUrl = (video: NectarhubPublication) => {
  return `${NECTARHUB_WEBSITE_URL}/watch/${video.id}`
}

type Link = 'lenster' | 'twitter' | 'reddit' | 'linkedin'

export const getSharableLink = (link: Link, video: NectarhubPublication) => {
  if (link === 'lenster') {
    return `${LENSTER_WEBSITE_URL}/?url=${getViewUrl(video)}&text=${
      video.metadata?.name as string
    }&hashtags=Nectarhub&preview=true`
  } else if (link === 'twitter') {
    return encodeURI(
      `https://twitter.com/intent/tweet?url=${getViewUrl(video)}&text=${
        video.metadata?.name as string
      }&via=${NECTARHUB_TWITTER_HANDLE}&related=Nectarhub&hashtags=Nectarhub`
    )
  } else if (link === 'reddit') {
    return `https://www.reddit.com/submit?url=${getViewUrl(video)}&title=${
      video.metadata?.name as string
    }`
  } else if (link === 'linkedin') {
    return `https://www.linkedin.com/shareArticle/?url=${getViewUrl(
      video
    )}&title=${video.metadata?.name as string}&summary=${
      video.metadata?.description as string
    }&source=${NECTARHUB_APP_NAME}`
  }
  return ''
}
