import { STATIC_ASSETS } from '../constants'
import type { NectarhubPublication } from '../custom-types'
import sanitizeIpfsUrl from './sanitizeIpfsUrl'

export const getPublicationMediaUrl = (video: NectarhubPublication) => {
  const url = video?.metadata?.media[0]?.original.url
  if (!url) return `${STATIC_ASSETS}/images/fallbackThumbnail.png`
  return sanitizeIpfsUrl(url)
}

export const getIsIPFSUrl = (url: string) => {
  return url?.includes('ipfs')
}
