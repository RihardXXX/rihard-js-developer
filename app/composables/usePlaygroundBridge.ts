export interface PlaygroundRequest {
  code: string
  /** id of the code block the code came from: the playground links back to it */
  fromId: string
}

/**
 * Channel from a lesson code block to the course playground: they are not parent
 * and child, so the request lives in shared state and the playground watches it.
 */
export const usePlaygroundBridge = () => {
  const request = useState<PlaygroundRequest | null>('playground-request', () => null)

  // A new object every time: opening the same block twice still reaches the playground.
  const open = (code: string, fromId: string) => {
    request.value = { code, fromId }
  }

  return { request, open }
}
