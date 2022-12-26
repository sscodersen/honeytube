import { STATIC_ASSETS } from '../constants'
import type { NectarhubPublication } from '../custom-types'
import sanitizeIpfsUrl from './sanitizeIpfsUrl'

const getThumbnailUrl = (video: NectarhubPublication): string => {
  const url =
    video.metadata?.cover?.original.url ||
    video.metadata?.image ||
    `${STATIC_ASSETS}/images/fallbackThumbnail.png`

  return sanitizeIpfsUrl(url)
}

export default getThumbnailUrl
