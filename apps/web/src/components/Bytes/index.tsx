import MetaTags from '@components/Common/MetaTags'
import { Loader } from '@components/UIElements/Loader'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import useAppStore from '@lib/store'
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreLazyQuery,
  usePublicationDetailsLazyQuery
} from 'lens'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useInView } from 'react-cool-inview'
import type { NectarhubPublication } from 'utils'
import {
  Analytics,
  LENS_CUSTOM_FILTERS,
  NECTARHUB_BYTES_APP_ID,
  SCROLL_ROOT_MARGIN,
  TRACK
} from 'utils'

import ByteVideo from './ByteVideo'

const request = {
  sortCriteria: PublicationSortCriteria.CuratedProfiles,
  limit: 5,
  noRandomize: false,
  sources: [NECTARHUB_BYTES_APP_ID],
  publicationTypes: [PublicationTypes.Post],
  customFilters: LENS_CUSTOM_FILTERS
}

const Bytes = () => {
  const router = useRouter()
  const selectedChannel = useAppStore((state) => state.selectedChannel)

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationDetailsLazyQuery()

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useExploreLazyQuery({
      variables: {
        request,
        reactionRequest: selectedChannel
          ? { profileId: selectedChannel?.id }
          : null,
        channelId: selectedChannel?.id ?? null
      },
      onCompleted: (data) => {
        const items = data?.explorePublications?.items as NectarhubPublication[]
        const publicationId = router.query.id
        if (!publicationId) {
          const nextUrl = window.location.origin + `/bytes/${items[0]?.id}`
          window.history.replaceState({ path: nextUrl }, '', nextUrl)
        }
      }
    })

  const bytes = data?.explorePublications?.items as NectarhubPublication[]
  const pageInfo = data?.explorePublications?.pageInfo
  const singleBytePublication = singleByte?.publication as NectarhubPublication

  const fetchSingleByte = async () => {
    const publicationId = router.query.id
    if (!publicationId) return fetchAllBytes()
    await fetchPublication({
      variables: {
        request: { publicationId },
        reactionRequest: selectedChannel
          ? { profileId: selectedChannel?.id }
          : null,
        channelId: selectedChannel?.id ?? null
      },
      onCompleted: () => fetchAllBytes()
    })
  }

  useEffect(() => {
    if (router.isReady) {
      fetchSingleByte()
      Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.BYTES })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const { observe } = useInView({
    rootMargin: SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      })
    }
  })

  if (loading || singleByteLoading)
    return (
      <div className="grid h-[80vh] place-items-center">
        <Loader />
      </div>
    )

  if (error) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <NoDataFound isCenter withImage text="No bytes found" />
      </div>
    )
  }

  return (
    <div className="overflow-y-hidden">
      <Head>
        <meta name="theme-color" content="#000000" />
      </Head>
      <MetaTags title="Bytes" />
      <div className="md:h-[calc(100vh-70px)] h-screen overflow-y-scroll no-scrollbar snap-y snap-mandatory scroll-smooth">
        {singleByte && <ByteVideo video={singleBytePublication} />}
        {bytes?.map((video: NectarhubPublication) => (
          <ByteVideo video={video} key={`${video?.id}_${video.createdAt}`} />
        ))}
        {pageInfo?.next && bytes.length !== pageInfo?.totalCount && (
          <span ref={observe} className="flex justify-center p-10">
            <Loader />
          </span>
        )}
      </div>
    </div>
  )
}

export default Bytes
