import BellOutline from '@components/Common/Icons/BellOutline'
import { Button } from '@components/UIElements/Button'
import DropMenu from '@components/UIElements/DropMenu'
import useAppStore from '@lib/store'
import usePersistStore from '@lib/store/persist'
import React from 'react'
import { Analytics, TRACK } from 'utils'

import Notifications from '.'

const NotificationTrigger = () => {
  const setHasNewNotification = useAppStore(
    (state) => state.setHasNewNotification
  )
  const hasNewNotification = useAppStore((state) => state.hasNewNotification)
  const selectedChannelId = usePersistStore((state) => state.selectedChannelId)

  const onClickNotification = () => {
    Analytics.track(TRACK.NOTIFICATIONS.CLICK_NOTIFICATIONS)
    setHasNewNotification(false)
  }

  if (!selectedChannelId) return null

  return (
    <DropMenu
      trigger={
        <Button
          variant="material"
          className="!p-[9px]"
          onClick={() => onClickNotification()}
        >
          <BellOutline className="w-4 h-4" />
          {hasNewNotification && (
            <span className="absolute flex w-1.5 h-1.5 bg-red-500 rounded-full -top-1 -right-1" />
          )}
        </Button>
      }
    >
      <div className="p-1 max-h-96 md:block hidden mt-1.5 w-80 overflow-x-hidden overflow-y-auto border shadow-xl border-gray-100 rounded-lg dark:border-gray-800 bg-secondary">
        <div className="flex flex-col p-2 text-sm transition duration-150 ease-in-out rounded-lg">
          <Notifications />
        </div>
      </div>
    </DropMenu>
  )
}

export default NotificationTrigger
