import Link from 'next/link'
import React from 'react'
import {
  Analytics,
  NECTARHUB_GITHUB_HANDLE,
  NECTARHUB_ROADMAP_URL,
  NECTARHUB_STATUS_PAGE,
  NECTARHUB_TWITTER_HANDLE,
  TRACK
} from 'utils'

const Footer = () => {
  return (
    <div className="grid grid-cols-2 text-sm">
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        href={NECTARHUB_STATUS_PAGE}
        onClick={() => Analytics.track(TRACK.SYSTEM.MORE_MENU.STATUS)}
        target="_blank"
      >
        Status
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        href={`https://github.com/${NECTARHUB_GITHUB_HANDLE}`}
        onClick={() => Analytics.track(TRACK.SYSTEM.MORE_MENU.GITHUB)}
        target="_blank"
      >
        Github
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        href={`https://twitter.com/${NECTARHUB_TWITTER_HANDLE}`}
        onClick={() => Analytics.track(TRACK.SYSTEM.MORE_MENU.TWITTER)}
        target="_blank"
      >
        Twitter
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        href="/discord"
        onClick={() => Analytics.track(TRACK.SYSTEM.MORE_MENU.DISCORD)}
        target="_blank"
      >
        Discord
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        href="/thanks"
      >
        Thanks
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        href={NECTARHUB_ROADMAP_URL}
        target="_blank"
      >
        Feedback
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        target="_blank"
        href="/terms"
      >
        Terms
      </Link>
      <Link
        className="rounded-lg px-2.5 py-1.5 opacity-80 hover:opacity-100"
        target="_blank"
        href="/privacy"
      >
        Privacy
      </Link>
    </div>
  )
}

export default Footer
