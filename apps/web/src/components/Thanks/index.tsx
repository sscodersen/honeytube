import MetaTags from '@components/Common/MetaTags'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Analytics, NECTARHUB_APP_NAME, STATIC_ASSETS, TRACK } from 'utils'

const Thanks = () => {
  useEffect(() => {
    Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.THANKS })
  }, [])

  return (
    <div className="space-y-5 md:py-10">
      <MetaTags title="Thanks" />
      <div className="flex justify-center items-center w-full h-48 bg-brand-400">
        <div className="relative text-center">
          <div className="flex items-center space-x-2 text-3xl font-bold md:text-4xl">
            Thanks supporting our community!
          </div>
        </div>
      </div>
      <div className="mx-auto space-x-10 justify-center flex">
        <Link
          href={`https://livepeer.studio/?utm_source=${NECTARHUB_APP_NAME}`}
          className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1"
        >
          <img
            src={`${STATIC_ASSETS}/images/livepeer.png`}
            alt="lvpr"
            className="w-20 h-20 flex-none rounded-full"
            draggable={false}
          />
          <div className="px-5">Livepeer</div>
        </Link>
        <Link
          href={`https://4everland.org/?utm_source=${NECTARHUB_APP_NAME}`}
          className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1"
        >
          <img
            src={`${STATIC_ASSETS}/images/4everland.png`}
            alt="lvpr"
            className="w-20 h-20 flex-none rounded-full"
            draggable={false}
          />
          <div className="px-5">4everland</div>
        </Link>
      </div>
    </div>
  )
}

export default Thanks
