import { ChevronDownIcon, DownloadIcon } from '@components/icons'
import { JSX } from 'react'

function App(): JSX.Element {
  return (
    <>
      <h1 className="text-4xl text-blue-500">Molinos App</h1>
      <DownloadIcon className="text-4xl" />
      <ChevronDownIcon className="text-4xl" />
    </>
  )
}

export default App
