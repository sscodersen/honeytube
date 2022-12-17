import NewVideoTrigger from '@components/Channel/NewVideoTrigger'
import { Button } from '@components/UIElements/Button'
import Modal from '@components/UIElements/Modal'
import useAppStore from '@lib/store'
import usePersistStore from '@lib/store/persist'
import clsx from 'clsx'
import { useNotificationCountQuery } from 'lens'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import React, { useState } from 'react'
import {
  Analytics,
  LENS_CUSTOM_FILTERS,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  LENSTUBE_ROADMAP_URL,
  STATIC_ASSETS,
  TRACK
} from 'utils'

import Login from './Auth/Login'
import CategoryFilters from './CategoryFilters'
import BellOutline from './Icons/BellOutline'
import RoadmapOutline from './Icons/RoadmapOutline'
import SearchOutline from './Icons/SearchOutline'
import GlobalSearchBar from './Search/GlobalSearchBar'

type Props = {
  className?: string
}

const Header: FC<Props> = ({ className }) => {
  const { pathname } = useRouter()
  const [showShowModal, setSearchModal] = useState(false)
  const showFilter =
    pathname === '/' || pathname === '/explore' || pathname === '/feed'

  const hasNewNotification = useAppStore((state) => state.hasNewNotification)
  const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
  const selectedChannel = useAppStore((state) => state.selectedChannel)
  const notificationCount = usePersistStore((state) => state.notificationCount)
  const setNotificationCount = usePersistStore(
    (state) => state.setNotificationCount
  )
  const setHasNewNotification = useAppStore(
    (state) => state.setHasNewNotification
  )

  useNotificationCountQuery({
    variables: {
      request: {
        profileId: selectedChannel?.id,
        sources: [LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID],
        customFilters: LENS_CUSTOM_FILTERS
      }
    },
    fetchPolicy: 'no-cache',
    skip: !selectedChannel?.id,
    onCompleted: (notificationsData) => {
      if (selectedChannel && notificationsData) {
        const currentCount =
          notificationsData?.notifications?.pageInfo?.totalCount ?? 0
        setHasNewNotification(notificationCount !== currentCount)
        setNotificationCount(currentCount)
      }
    }
  })

  return (
    <div
      className={clsx(
        'sticky top-0 py-2.5 left-0 right-0 z-10 flex w-full items-center bg-white dark:bg-theme',
        className
      )}
    >
      <div className="w-full">
        <div className="flex ultrawide:px-6 px-2 items-center justify-between w-full">
          <div className="md:w-[330px]">
            <Link href="/" className="block md:invisible">
              <img
                src={`${STATIC_ASSETS}/images/brand/lenstube.svg`}
                draggable={false}
                className="w-5 h-5"
                alt="lenstube"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <GlobalSearchBar />
          </div>
          <div className="flex flex-row items-center justify-end space-x-2 md:space-x-3 md:w-96">
            <Button
              variant="material"
              onClick={() => setSearchModal(true)}
              className="!p-[10px] md:hidden"
            >
              <SearchOutline className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Link
              className="rounded-lg hidden lg:block opacity-80 hover:opacity-100"
              href={LENSTUBE_ROADMAP_URL}
              onClick={() => Analytics.track(TRACK.SYSTEM.MORE_MENU.ROADMAP)}
              target="_blank"
            >
              <Button variant="material" className="!p-[9px]">
                <RoadmapOutline className="w-4 h-4" />
              </Button>
            </Link>
            {selectedChannelId ? (
              <>
                <Link
                  onClick={() =>
                    Analytics.track(TRACK.NOTIFICATIONS.CLICK_NOTIFICATIONS)
                  }
                  href="/notifications"
                  className="relative pr-1"
                >
                  <Button variant="material" className="!p-[9px]">
                    <BellOutline className="w-4 h-4" />
                    {hasNewNotification && (
                      <span className="absolute flex w-2 h-2 bg-red-500 rounded-full -top-1 -right-0.5" />
                    )}
                  </Button>
                </Link>
                <NewVideoTrigger />
              </>
            ) : null}
            <Login />
          </div>
        </div>

        {showFilter && <CategoryFilters />}
      </div>

      <Modal
        title="Search"
        onClose={() => setSearchModal(false)}
        show={showShowModal}
        panelClassName="max-w-md h-full"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <GlobalSearchBar onSearchResults={() => setSearchModal(false)} />
        </div>
      </Modal>
    </div>
  )
}

export default Header
