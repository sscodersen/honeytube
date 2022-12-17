import type { Nft } from 'lens'
import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'
import { IS_MAINNET, OPENSEA_MARKETPLACE_URL, STATIC_ASSETS } from 'utils'
import imageCdn from 'utils/functions/imageCdn'
import sanitizeIpfsUrl from 'utils/functions/sanitizeIpfsUrl'

type Props = {
  nft: Nft
}

const NFTCard: FC<Props> = ({ nft }) => {
  return (
    <div className="rounded-xl group">
      <div className="aspect-h-9 aspect-w-16">
        {nft?.originalContent?.animatedUrl ? (
          <iframe
            sandbox="allow-scripts"
            className="w-full h-full md:rounded-xl"
            src={nft?.originalContent?.animatedUrl}
            title={nft.name}
          />
        ) : (
          <img
            className="object-cover w-full h-full rounded-t-xl"
            src={imageCdn(
              nft.originalContent?.uri
                ? sanitizeIpfsUrl(nft.originalContent?.uri)
                : `${STATIC_ASSETS}/images/placeholder.webp`,
              'thumbnail'
            )}
            alt={nft.name}
          />
        )}
      </div>
      <Link
        href={`${OPENSEA_MARKETPLACE_URL}/assets/${
          IS_MAINNET ? 'matic/' : 'mumbai/'
        }${nft.contractAddress}/${nft.tokenId}`.toLowerCase()}
        target="_blank"
        rel="noreferer noreferrer"
      >
        <div className="p-3">
          <div className="text-xs text-gray-500 uppercase truncate">
            {nft.collectionName}
          </div>
          <div className="line-clamp-2">{nft.name}</div>
        </div>
      </Link>
    </div>
  )
}

export default NFTCard
