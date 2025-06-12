import { Assistant } from '@renderer/types'
import { find } from 'lodash'
import { useEffect, useState } from 'react'

export function useActiveTopic(assistant: Assistant) {
  const [activeTopic, setActiveTopic] = useState(assistant?.topics[0])

  useEffect(() => {
    if (assistant && !find(assistant.topics, { id: activeTopic?.id })) {
      setActiveTopic(assistant.topics[0])
    }
  }, [activeTopic?.id, assistant])

  return { activeTopic, setActiveTopic }
}
