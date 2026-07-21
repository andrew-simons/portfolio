import { useState, useEffect } from 'react'

export type TypewriterAction =
  | { type: 'type';   text: string; speed?: number }
  | { type: 'delete'; count: number; speed?: number }
  | { type: 'pause';  ms: number }

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function useTypewriter(actions: TypewriterAction[], onComplete?: () => void) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)

  useEffect(() => {
    let cancelled = false
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

    async function run() {
      for (const action of actions) {
        if (cancelled) return

        if (action.type === 'pause') {
          await sleep(action.ms)

        } else if (action.type === 'type') {
          for (const char of action.text.split('')) {
            if (cancelled) return
            await sleep(action.speed ?? rand(1, 3))
            setDisplayed((p) => p + char)
            if ([','].includes(char))  await sleep(rand(5, 10))
            if (['.', '!'].includes(char)) await sleep(rand(9, 18))
          }

        } else if (action.type === 'delete') {
          for (let i = 0; i < action.count; i++) {
            if (cancelled) return
            await sleep(action.speed ?? rand(1, 3))
            setDisplayed((p) => p.slice(0, -1))
          }
        }
      }

      if (!cancelled) {
        setDone(true)
        onComplete?.()
      }
    }

    run()
    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, done }
}
