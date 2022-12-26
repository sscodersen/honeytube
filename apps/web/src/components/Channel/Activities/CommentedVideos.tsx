import Timeline from '@components/Home/Timeline'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer'
import { Loader } from '@components/UIElements/Loader'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import type { Profile } from 'lens'
import { PublicationTypes, useProfileCommentsQuery } from 'lens'
import type { FC } from 'react'
import React from 'react'
import { useInView } from 'react-cool-inview'
import type { NectarhubPublication } from 'utils'
import {
  LENS_CUSTOM_FILTERS,
  NECTARHUB_APP_ID,
  NECTARHUB_BYTES_APP_ID,
  SCROLL_ROOT_MARGIN
} from 'utils'

type Props = {
  channel: Profile
}

const CommentedVideos: FC<Props> = ({ channel }) => {
  const request = {
    publicationTypes: [PublicationTypes.Comment],
    limit: 32,
    sources: [NECTARHUB_APP_ID, NECTARHUB_BYTES_APP_ID],
    customFilters: LENS_CUSTOM_FILTERS,
    profileId: channel?.id
  }
  const { data, loading, error, fetchMore } = useProfileCommentsQuery({
    variables: {
      request
    },
    skip: !channel?.id
  })

  const channelVideos = data?.publications?.items as NectarhubPublication[]
  const pageInfo = data?.publications?.pageInfo

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

  if (loading) return <TimelineShimmer />

  if (data?.publications?.items?.length === 0) {
    return <NoDataFound isCenter withImage text="No comments on videos" />
  }

  return (
    <div className="w-full">
      {!error && !loading && (
        <div>
          <Timeline videos={channelVideos} videoType="Comment" />
          {pageInfo?.next && channelVideos.length !== pageInfo?.totalCount && (
            <span ref={observe} className="flex justify-center p-10">
              <Loader />
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentedVideos
