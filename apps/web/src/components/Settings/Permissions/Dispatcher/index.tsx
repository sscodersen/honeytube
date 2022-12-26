import React from 'react'
import { NECTARHUB_APP_NAME } from 'utils'

import Toggle from './Toggle'

const DispatcherPermissions = () => {
  return (
    <div className="flex flex-wrap items-center justify-end md:justify-between">
      <div className="mb-2">
        <h1 className="mb-1 text-xl font-semibold">Dispatcher</h1>
        <p className="opacity-80">
          Dispacher helps interact with {NECTARHUB_APP_NAME} without signing any
          of your transactions.
        </p>
      </div>
      <div className="flex justify-end mt-3">
        <Toggle />
      </div>
    </div>
  )
}

export default DispatcherPermissions
