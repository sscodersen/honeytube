import CheckOutline from '@components/Common/Icons/CheckOutline'
import { Button } from '@components/UIElements/Button'
import Modal from '@components/UIElements/Modal'
import useAppStore from '@lib/store'
import { useEnabledModuleCurrrenciesQuery } from 'lens'
import React, { useState } from 'react'
import type { CollectModuleType } from 'utils'

import ChargeQuestion from './ChargeQuestion'
import FeeCollectForm from './FeeCollectForm'
import LimitDurationQuestion from './LimitDurationQuestion'
import LimitQuestion from './LimitQuestion'
import PermissionQuestion from './PermissionQuestion'

const CollectModule = () => {
  const [showModal, setShowModal] = useState(false)
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
  const selectedChannel = useAppStore((state) => state.selectedChannel)

  const setCollectType = (data: CollectModuleType) => {
    setUploadedVideo({
      collectModule: { ...uploadedVideo.collectModule, ...data }
    })
  }

  const { data: enabledCurrencies } = useEnabledModuleCurrrenciesQuery({
    variables: { request: { profileIds: selectedChannel?.id } },
    skip: !selectedChannel?.id
  })

  const getSelectedCollectType = () => {
    const followerOnlyCollect = uploadedVideo.collectModule.followerOnlyCollect
    const isTimedFeeCollect = uploadedVideo.collectModule.isTimedFeeCollect
    const isLimitedFeeCollect = uploadedVideo.collectModule.isLimitedFeeCollect
    const collectLimit = uploadedVideo.collectModule.collectLimit
    if (uploadedVideo.collectModule.isRevertCollect) {
      return 'No one can collect this publication'
    }
    if (uploadedVideo.collectModule.isFreeCollect) {
      return `${
        followerOnlyCollect ? 'Only Subscribers' : 'Anyone'
      } can collect for free ${isTimedFeeCollect ? 'within 24hrs' : ''}`
    }
    if (!uploadedVideo.collectModule.isFreeCollect) {
      return `${
        followerOnlyCollect ? 'Only Subscribers' : 'Anyone'
      } can collect ${
        isLimitedFeeCollect ? `maximum of ${collectLimit}` : ''
      } for given fees ${isTimedFeeCollect ? 'within 24hrs' : ''}`
    }
  }

  return (
    <>
      <div className="flex items-center mb-1 space-x-1.5">
        <div className="text-[11px] font-semibold uppercase opacity-70">
          Collect Type
        </div>
      </div>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-left border border-gray-300 focus:outline-none dark:border-gray-700 rounded-xl"
      >
        <span>{getSelectedCollectType()}</span>
        <CheckOutline className="w-3 h-3" />
      </button>
      <Modal
        title="Select collect type"
        panelClassName="max-w-lg"
        show={showModal}
      >
        <div className="mt-2 space-y-4">
          <PermissionQuestion
            setCollectType={setCollectType}
            uploadedVideo={uploadedVideo}
          />
          {!uploadedVideo.collectModule.isRevertCollect && (
            <LimitDurationQuestion
              setCollectType={setCollectType}
              uploadedVideo={uploadedVideo}
            />
          )}
          {!uploadedVideo.collectModule.isRevertCollect && (
            <LimitQuestion
              setCollectType={setCollectType}
              uploadedVideo={uploadedVideo}
            />
          )}
          {!uploadedVideo.collectModule.isRevertCollect &&
            !uploadedVideo.collectModule.isTimedFeeCollect &&
            !uploadedVideo.collectModule.isLimitedFeeCollect && (
              <ChargeQuestion
                setCollectType={setCollectType}
                uploadedVideo={uploadedVideo}
              />
            )}
          {!uploadedVideo.collectModule.isFreeCollect &&
          !uploadedVideo.collectModule.isRevertCollect &&
          enabledCurrencies ? (
            <FeeCollectForm
              setCollectType={setCollectType}
              uploadedVideo={uploadedVideo}
              setShowModal={setShowModal}
              enabledCurrencies={enabledCurrencies}
            />
          ) : (
            <div className="flex justify-end">
              <Button type="button" onClick={() => setShowModal(false)}>
                Set Collect Type
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default CollectModule
