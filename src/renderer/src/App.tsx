import { JSX } from 'react'
import { ChevronDown, Download } from './components/test'

function App(): JSX.Element {
  return (
    <>
      <h1 className="text-4xl text-blue-500">Molinos App</h1>
      <Download className="text-4xl" />
      <ChevronDown className="text-4xl" />
    </>
  )
}

export default App
