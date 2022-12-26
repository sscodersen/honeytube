import MetaTags from '@components/Common/MetaTags'
import { Loader } from '@components/UIElements/Loader'
import useAppStore from '@lib/store'
import type { GlobalProtocolStats } from 'lens'
import { useGlobalProtocolStatsQuery } from 'lens'
import dynamic from 'next/dynamic'
import React from 'react'
import {
  FcCollect,
  FcComments,
  FcLikePlaceholder,
  FcSynchronize,
  FcTabletAndroid,
  FcVideoCall
} from 'react-icons/fc'
import { ADMIN_IDS, NECTARHUB_APP_ID } from 'utils'
import useIsMounted from 'utils/hooks/useIsMounted'

const StatCard = dynamic(() => import('./StatCard'))
const Deployment = dynamic(() => import('./Deployment'))
const Custom404 = dynamic(() => import('../../pages/404'))

const Stats = () => {
  const { mounted } = useIsMounted()
  const selectedChannel = useAppStore((state) => state.selectedChannel)

  const { data, loading } = useGlobalProtocolStatsQuery({
    variables: {
      request: {
        sources: [NECTARHUB_APP_ID]
      }
    }
  })

  if (!ADMIN_IDS.includes(selectedChannel?.id)) {
    return <Custom404 />
  }

  const stats = data?.globalProtocolStats as GlobalProtocolStats
  const bytesStats = data?.bytesStats as GlobalProtocolStats

  return (
    <>
      <MetaTags title="Nectarhub Stats" />
      {loading && !mounted ? (
        <Loader />
      ) : (
        <>
          <Deployment />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 md:grid-cols-3">
            <StatCard
              icon={<FcVideoCall />}
              count={stats?.totalPosts}
              text="total videos"
            />
            <StatCard
              icon={<FcComments />}
              count={stats?.totalComments}
              text="total comments"
            />
            <StatCard
              icon={<FcSynchronize />}
              count={stats?.totalMirrors}
              text="total mirrors"
            />
            <StatCard
              icon={<FcTabletAndroid />}
              count={bytesStats?.totalPosts}
              text="total bytes"
            />
            <StatCard
              icon={<FcLikePlaceholder />}
              count={stats?.totalFollows}
              text="total subscriptions"
            />
            <StatCard
              icon={<FcCollect />}
              count={stats?.totalCollects}
              text="total collects"
            />
          </div>
        </>
      )}
    </>
  )
}

export default Stats
