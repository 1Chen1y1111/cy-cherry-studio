import { useAppDispatch, useAppSelector } from '@renderer/store'
import { addThread, removeThread, setActiveThread, updateThread } from '@renderer/store/threads'
import { Thread } from '@renderer/types'

export default function useThreads() {
  const { threads, activeThread } = useAppSelector((state) => state.threads)
  const dispatch = useAppDispatch()

  return {
    threads,
    activeThread,
    setActiveThread: (thread: Thread) => dispatch(setActiveThread(thread)),
    addThread: (thread: Thread) => dispatch(addThread(thread)),
    removeThread: (id: string) => dispatch(removeThread({ id })),
    updateThread: (thread: Thread) => dispatch(updateThread(thread))
  }
}
