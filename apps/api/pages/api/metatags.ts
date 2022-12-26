import getProfileMeta from 'lib/getProfileMeta'
import getPublicationMeta from 'lib/getPublicationMeta'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NECTARHUB_APP_DESCRIPTION } from 'utils'
import getMetaTags from 'utils/functions/getMetaTags'
import { getRandomProfilePicture } from 'utils/functions/getRandomProfilePicture'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).json({ success: false })

  const path = req.query.path as string

  if (!path) return res.status(400).json({ success: false })

  const isChannel = path.includes('/channel/')
  const isVideo = path.includes('/watch/')
  const isByte = path.includes('/bytes/')

  try {
    if (isChannel) {
      const handle = path.replace('/channel/', '')
      return getProfileMeta(res, handle)
    }

    if (isVideo || isByte) {
      const pubId = isByte
        ? path.replace('/bytes/', '')
        : path.replace('/watch/', '')
      return getPublicationMeta(res, pubId)
    }

    return res.setHeader('Content-Type', 'text/html').send(
      getMetaTags({
        title: 'Nectarhub',
        description: NECTARHUB_APP_DESCRIPTION,
        image: getRandomProfilePicture('Nectarhub')
      })
    )
  } catch (error) {
    return res.setHeader('Content-Type', 'text/html').send(
      getMetaTags({
        title: 'Nectarhub',
        description: NECTARHUB_APP_DESCRIPTION,
        image: getRandomProfilePicture('Nectarhub')
      })
    )
  }
}

export default handler
