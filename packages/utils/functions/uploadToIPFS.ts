import { S3 } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import {
  EVER_ENDPOINT,
  EVER_REGION,
  NECTARHUB_API_URL,
  NEXT_PUBLIC_EVER_BUCKET_NAME
} from '../constants'
import type { IPFSUploadResult } from '../custom-types'
import logger from '../logger'

export const everland = async (
  file: File,
  onProgress?: (percentage: number) => void
) => {
  try {
    const token = await axios.post(`${NECTARHUB_API_URL}/sts/token`, {
      fileSize: file.size
    })
    const client = new S3({
      endpoint: EVER_ENDPOINT,
      region: EVER_REGION,
      credentials: {
        accessKeyId: token.data?.accessKeyId,
        secretAccessKey: token.data?.secretAccessKey,
        sessionToken: token.data?.sessionToken
      },
      maxAttempts: 3
    })
    const fileKey = uuidv4()
    const params = {
      Bucket: NEXT_PUBLIC_EVER_BUCKET_NAME,
      Key: fileKey,
      Body: file,
      ContentType: file.type
    }
    const task = new Upload({
      client,
      queueSize: 3,
      params
    })
    task.on('httpUploadProgress', (e) => {
      const progress = ((e.loaded! / e.total!) * 100) | 0
      onProgress?.(progress)
    })
    await task.done()
    const result = await client.headObject(params)
    const metadata = result.Metadata
    return {
      url: `ipfs://${metadata?.['ipfs-hash']}`,
      type: file.type
    }
  } catch (error) {
    logger.error('[Error IPFS3 Media Upload]', error)
    return {
      url: '',
      type: file.type
    }
  }
}

const uploadToIPFS = async (
  file: File,
  onProgress?: (percentage: number) => void
): Promise<IPFSUploadResult> => {
  const { url, type } = await everland(file, onProgress)
  return { url, type }
}

export default uploadToIPFS
