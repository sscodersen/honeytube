import { useLazyQuery } from '@apollo/client'
import { Loader } from '@components/UIElements/Loader'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import type { Profile } from 'lens'
import {
  SearchProfilesDocument,
  SearchPublicationsDocument,
  SearchRequestTypes
} from 'lens'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import type { NectarhubPublication } from 'utils'
import {
  Analytics,
  LENS_CUSTOM_FILTERS,
  NECTARHUB_APP_ID,
  NECTARHUB_BYTES_APP_ID,
  TRACK
} from 'utils'
import useDebounce from 'utils/hooks/useDebounce'
import useOutsideClick from 'utils/hooks/useOutsideClick'

import SearchOutline from '../Icons/SearchOutline'
import Channels from './Channels'
import Videos from './Videos'

interface Props {
  onSearchResults?: () => void
}

const GlobalSearchBar: FC<Props> = ({ onSearchResults }) => {
  const [activeSearch, setActiveSearch] = useState(SearchRequestTypes.Profile)
  const [keyword, setKeyword] = useState('')
  const debouncedValue = useDebounce<string>(keyword, 500)
  const resultsRef = useRef(null)
  useOutsideClick(resultsRef, () => setKeyword(''))

  const [searchChannels, { data, loading }] = useLazyQuery(
    activeSearch === 'PROFILE'
      ? SearchProfilesDocument
      : SearchPublicationsDocument
  )

  const onDebounce = () => {
    if (keyword.trim().length) {
      searchChannels({
        variables: {
          request: {
            type: activeSearch,
            query: keyword,
            limit: 30,
            sources: [NECTARHUB_APP_ID, NECTARHUB_BYTES_APP_ID],
            customFilters: LENS_CUSTOM_FILTERS
          }
        }
      })
      Analytics.track(
        activeSearch === 'PROFILE' ? TRACK.SEARCH_CHANNELS : TRACK.SEARCH_VIDEOS
      )
    }
  }

  // @ts-ignore
  const channels = data?.search?.items

  useEffect(() => {
    onDebounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, activeSearch])

  const clearSearch = () => {
    setKeyword('')
    onSearchResults?.()
  }

  return (
    <div className="md:w-96">
      <div ref={resultsRef}>
        <div className="relative">
          <div className="relative w-full overflow-hidden border border-gray-200 cursor-default dark:border-gray-700 rounded-full sm:text-sm">
            <input
              className="w-full py-2 pl-4 pr-10 text-sm bg-transparent focus:outline-none"
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search by channel / hashtag"
              value={keyword}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <SearchOutline
                className="w-4 h-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
          <div
            className={clsx(
              'md:absolute w-full z-10 mt-1 text-base bg-white overflow-hidden dark:bg-theme rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
              { hidden: debouncedValue.length === 0 }
            )}
          >
            <Tab.Group>
              <Tab.List className="flex justify-center">
                <Tab
                  className={({ selected }) =>
                    clsx(
                      'px-4 py-2 border-b-2 text-sm focus:outline-none w-full',
                      selected
                        ? 'border-indigo-500 opacity-100'
                        : 'border-transparent opacity-50 hover:bg-indigo-500/[0.12]'
                    )
                  }
                  onClick={() => {
                    setActiveSearch(SearchRequestTypes.Profile)
                  }}
                >
                  Channels
                </Tab>
                <Tab
                  className={({ selected }) =>
                    clsx(
                      'px-4 py-2 border-b-2 text-sm focus:outline-none w-full',
                      selected
                        ? 'border-indigo-500 opacity-100'
                        : 'border-transparent opacity-50 hover:bg-indigo-500/[0.12]'
                    )
                  }
                  onClick={() => {
                    setActiveSearch(SearchRequestTypes.Publication)
                  }}
                >
                  Videos
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="overflow-y-auto max-h-[80vh] no-scrollbar focus:outline-none">
                  {data?.search?.__typename === 'ProfileSearchResult' && (
                    <Channels
                      results={channels as Profile[]}
                      loading={loading}
                      clearSearch={clearSearch}
                    />
                  )}
                </Tab.Panel>
                <Tab.Panel className="overflow-y-auto max-h-[80vh] no-scrollbar focus:outline-none">
                  {data?.search?.__typename === 'PublicationSearchResult' && (
                    <Videos
                      results={channels as NectarhubPublication[]}
                      loading={loading}
                      clearSearch={clearSearch}
                    />
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {loading && (
              <div className="flex justify-center p-5">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default GlobalSearchBar
