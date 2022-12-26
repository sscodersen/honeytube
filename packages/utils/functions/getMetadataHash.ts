import type { NectarhubPublication } from '../custom-types'

const getMetadataHash = (publication: NectarhubPublication): string => {
  const hash = publication.onChainContentURI.split('/').pop()
  return hash ?? ''
}

export default getMetadataHash
