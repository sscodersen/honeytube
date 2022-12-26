import Head from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import React from 'react'
import {
  NECTARHUB_API_URL,
  NECTARHUB_APP_DESCRIPTION,
  NECTARHUB_APP_NAME,
  NECTARHUB_EMBED_URL,
  NECTARHUB_TWITTER_HANDLE,
  STATIC_ASSETS
} from 'utils'

type Props = {
  title?: string
  description?: string
  image?: string
}

const MetaTags: FC<Props> = (props) => {
  const { description, title, image } = props
  const router = useRouter()

  const meta = {
    title: title ?? NECTARHUB_APP_NAME,
    description: description ?? NECTARHUB_APP_DESCRIPTION,
    image: image ?? `${STATIC_ASSETS}/images/seo/og.png`,
    type: 'website'
  }

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />
      <link rel="canonical" href={`https://nectarhub.xyz${router.asPath}`} />
      <meta
        property="og:url"
        content={`https://nectarhub.xyz${router.asPath}`}
      />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Nectarhub" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:image:width" content="400" />
      <meta property="twitter:image:height" content="400" />
      <meta name="twitter:site" content="Nectarhub" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta property="twitter:image:src" content={meta.image} />
      <meta property="twitter:creator" content={NECTARHUB_TWITTER_HANDLE} />
      {router.pathname === '/watch/[id]' && router.query?.id && (
        <>
          <link
            rel="iframely player"
            type="text/html"
            href={`${NECTARHUB_EMBED_URL}/${router.query?.id}`}
            media="(aspect-ratio: 1280/720)"
          />
          <link
            rel="alternate"
            type="text/xml+oembed"
            href={`${NECTARHUB_API_URL}/oembed?format=xml&id=${router.query?.id}`}
            title={title}
          />
          <link
            rel="alternate"
            type="application/json+oembed"
            href={`${NECTARHUB_API_URL}/oembed?format=json&id=${router.query?.id}`}
            title={title}
          />
        </>
      )}
      <link rel="preconnect" href="https://img.nectarhub.xyz" />
      <link rel="dns-prefetch" href="https://img.nectarhub.xyz" />
      <link rel="preconnect" href="https://assets.nectarhub.xyz" />
      <link rel="dns-prefetch" href="https://assets.nectarhub.xyz" />
    </Head>
  )
}

export default MetaTags
