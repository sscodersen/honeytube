import { CustomFiltersTypes } from 'lens'

export const NECTARHUB_APP_NAME = 'Nectarhub'
export const NECTARHUB_APP_DESCRIPTION =
  'Nectarhub is a decentralized video-sharing social media platform built with Lens protocol.'

export const LENS_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT
export const IS_MAINNET = LENS_ENV === 'mainnet'
export const RELAYER_ENABLED = true

export const STATIC_ASSETS = 'https://assets.nectarhub.xyz'
export const NECTARHUB_WEBSITE_URL = IS_MAINNET
  ? 'https://nectarhub.xyz'
  : 'https://testnet.nectarhub.xyz'
export const NECTARHUB_EMBED_URL = IS_MAINNET
  ? 'https://embed.nectarhub.xyz'
  : 'https://test-embed.nectarhub.xyz'
export const FALLBACK_COVER_URL = `${STATIC_ASSETS}/images/fallbackThumbnail.png`

// lens
export const MAINNET_API_URL = 'https://api.lens.dev'
export const TESTNET_API_URL = 'https://api-mumbai.lens.dev'
export const STAGING_MAINNET_API_URL =
  'https://staging-api-social-polygon.lens.crtlkey.com'
export const STAGING_TESTNET_API_URL =
  'https://staging-api-social-mumbai.lens.crtlkey.com'
export const STAGING_API_URL = IS_MAINNET
  ? STAGING_MAINNET_API_URL
  : STAGING_TESTNET_API_URL

// nectarhub api
export const NECTARHUB_MAINNET_API_URL = 'https://api.nectarhub.xyz'
export const NECTARHUB_TESTNET_API_URL = 'https://api-testnet.nectarhub.xyz'
export const NECTARHUB_DEV_API_URL = 'http://localhost:5555'
export const NECTARHUB_API_URL = IS_MAINNET
  ? 'https://api.nectarhub.xyz'
  : 'https://api-testnet.nectarhub.xyz'

export const API_URL = IS_MAINNET ? MAINNET_API_URL : TESTNET_API_URL
export const LENSHUB_PROXY_ADDRESS = IS_MAINNET
  ? '0x1A1FEe7EeD918BD762173e4dc5EfDB8a78C924A8'
  : '0x1A1FEe7EeD918BD762173e4dc5EfDB8a78C924A8'
export const LENS_PERIPHERY_ADDRESS = IS_MAINNET
  ? '0x500D1d6A4c7D8Ae28240b47c8FCde034D827fD5e'
  : '0x500D1d6A4c7D8Ae28240b47c8FCde034D827fD5e'
export const WMATIC_TOKEN_ADDRESS = IS_MAINNET
  ? '0xc4905364b78a742ccce7B890A89514061E47068D'
  : '0xc4905364b78a742ccce7B890A89514061E47068D'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// polygon
export const POLYGON_RPC_URL = IS_MAINNET
  ? 'https://rpc.ankr.com/polygon'
  : 'https://rpc.ankr.com/polygon_mumbai'

export const POLYGONSCAN_URL = IS_MAINNET
  ? 'https://polygonscan.com'
  : 'https://mumbai.polygonscan.com'
export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80001

// cdn
export const IMAGE_CDN_URL = IS_MAINNET ? 'https://img.nectarhub.xyz' : ''
export const VIDEO_CDN_URL = 'https://cdn.livepeer.com'

export const SCROLL_ROOT_MARGIN = '40% 0px'

// ipfs
export const IPFS_FREE_UPLOAD_LIMIT = IS_MAINNET ? 1000 : 100
export const IPFS_GATEWAY = 'https://ipfs.nectarhub.xyz/ipfs'
export const EVER_ENDPOINT = 'https://endpoint.4everland.co'
export const EVER_REGION = 'us-west-2'
export const EVER_ACCESS_KEY = process.env.EVER_ACCESS_KEY as string
export const EVER_ACCESS_SECRET = process.env.EVER_ACCESS_SECRET as string
export const NEXT_PUBLIC_EVER_BUCKET_NAME = IS_MAINNET ? 'nectarhub' : 'testnet'

// livepeer
export const LIVEPEER_STUDIO_API_KEY = process.env
  .NEXT_PUBLIC_LIVEPEER_STUDIO_API_KEY as string

// bundlr
export const BUNDLR_NODE_URL = IS_MAINNET
  ? 'https://node1.bundlr.network'
  : 'https://devnet.bundlr.network'
export const BUNDLR_METADATA_UPLOAD_URL = IS_MAINNET
  ? 'https://node2.bundlr.network'
  : 'https://devnet.bundlr.network'
export const BUNDLR_CURRENCY = 'matic'
export const BUNDLR_WEBSITE_URL = 'https://bundlr.network'
export const ARWEAVE_WEBSITE_URL = 'https://arweave.net'
export const BUNDLR_PRIVATE_KEY = process.env.BUNDLR_PRIVATE_KEY as string
export const BUNDLR_CONNECT_MESSAGE = 'Sign to initialize & estimate upload...'

// error messages
export const ERROR_MESSAGE = 'Oops, something went wrong!'
export const SIGN_IN_REQUIRED_MESSAGE = 'Sign in required'

// App Ids
export const NECTARHUB_APP_ID = 'nectarhub'
export const NECTARHUB_BYTES_APP_ID = 'nectarhub-bytes'

// official
export const NECTARHUB_TWITTER_HANDLE = 'nectarhubxyz'
export const NECTARHUB_GITHUB_HANDLE = 'nectarhub-xyz'
export const NECTARHUB_STATUS_PAGE = 'https://status.nectarhub.xyz'
export const TALLY_VERIFICATION_FORM_URL = 'https://tally.so/r/mY5e80'
export const NECTARHUB_ROADMAP_URL = 'https://roadmap.nectarhub.xyz'

// admin
export const ADMIN_IDS = IS_MAINNET ? ['0x2d'] : ['0x2f']

// lens
export const LENS_CUSTOM_FILTERS = [CustomFiltersTypes.Gardeners]
export const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/webm',
  'video/quicktime',
  'video/mov'
]

// other apps
export const LENSTER_WEBSITE_URL = IS_MAINNET
  ? 'https://lenster.xyz'
  : 'https://testnet.lenster.xyz'
export const OPENSEA_MARKETPLACE_URL = IS_MAINNET
  ? 'https://opensea.io'
  : 'https://testnets.opensea.io'
export const RARIBLE_MARKETPLACE_URL = IS_MAINNET
  ? 'https://rarible.com'
  : 'https://testnet.rarible.com'
export const LENSPORT_MARKETPLACE_URL = 'https://lensport.io'

// misc
export const GIT_DEPLOYED_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
export const GIT_DEPLOYED_BRANCH = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
export const VERCEL_DEPLOYED_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV
export const MIXPANEL_API_HOST = '/collect'
export const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
export const DATADOG_KEY = process.env.NEXT_PUBLIC_DATADOG_KEY

export const API_ORIGINS = [
  'https://nectarhub.xyz',
  'https://testnet.nectarhub.xyz',
  'http://localhost:4783'
]
