import '../styles/index.css'
import '@rainbow-me/rainbowkit/styles.css'
import 'tippy.js/dist/tippy.css'

import FullPageLoader from '@components/Common/FullPageLoader'
import usePersistStore from '@lib/store/persist'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { lazy, Suspense, useEffect } from 'react'
import { AUTH_ROUTES } from 'utils/data/auth-routes'

const Providers = lazy(() => import('../components/Common/Providers'))
const Layout = lazy(() => import('../components/Common/Layout'))

const App = ({ Component, pageProps }: AppProps) => {
  const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
  const { pathname, replace, asPath } = useRouter()

  useEffect(() => {
    if (!selectedChannelId && AUTH_ROUTES.includes(pathname)) {
      replace(`/auth?next=${asPath}`)
    }
  }, [selectedChannelId, pathname, asPath, replace])

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </Suspense>
  )
}

export default App
