'use client'

import useApp from './useApp'
import type { PropsWithChildren } from 'react'

const App = ({ children }: PropsWithChildren) => {
  useApp()

  return children
}

export default App
