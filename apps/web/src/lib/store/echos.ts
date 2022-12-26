import type { NectarhubPublication } from 'utils'
import create from 'zustand'

interface EchoState {
  selectedTrack: NectarhubPublication | null
  setSelectedTrack: (publication: NectarhubPublication | null) => void
}

export const useEchoStore = create<EchoState>((set) => ({
  selectedTrack: null,
  setSelectedTrack: (selectedTrack) => set(() => ({ selectedTrack }))
}))

export default useEchoStore
