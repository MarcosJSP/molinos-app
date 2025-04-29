import Button from '@/components/button/Button'
import { LogoIcon, SendIcon } from '@/components/icons'
import { Input } from '@/components/input/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/Popover'
import useAuth from '@/context/auth/useAuth'
import { AUTH_API } from '@/services/auth'
import { copyToClipboard } from '@/utils/helpers'
import { FC, useEffect } from 'react'

const CodeInput: FC = () => {
  const { login } = useAuth()

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const inputElement = e.currentTarget[0] as HTMLInputElement
    login(inputElement.value)
  }

  return (
    <form className="relative mt-6 flex w-full items-center" onSubmit={handleOnSubmit}>
      <Input className="max-h-9 pr-9" placeholder="Paste the code here" />
      <Button
        className="outline-focus btn text-app-gray-300 absolute right-1 text-sm transition-all"
        aria-label="Clear search input"
        symmetricPadding
        type="submit"
      >
        <SendIcon className="translate-x-[1px]" />
      </Button>
    </form>
  )
}

const CodePopover: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="mt-8">Enter the code</Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-[340px] max-w-full px-5 py-8">
        <p className="text-app-gray-200 text-2xl font-bold">Sign in with code</p>
        <p className="text-app-gray-300 mt-5 text-base text-pretty">
          To copy the code, click “copy this token and paste it on the Desktop App” on the browser
        </p>
        <CodeInput />
      </PopoverContent>
    </Popover>
  )
}

const BrowserAuth: FC = () => {
  useEffect(() => {
    if (import.meta.env.RENDERER_VITE_DISABLE_OPEN_AUTHORIZATION_WINDOW !== 'true') {
      window.open(AUTH_API.AUTHORIZE, '_blank')
    }
  }, [])

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 flex h-full flex-col items-center justify-center px-5 text-center duration-800">
      <LogoIcon className="text-5xl" />
      <p className="text-app-gray-200 mt-5 max-w-[300px] text-2xl font-bold">
        Sign in from your browser to continue
      </p>
      <p className="text-app-gray-300 mt-5 max-w-[342px] text-base">
        If your browser didn’t open automatically, please{' '}
        <a
          href={AUTH_API.AUTHORIZE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-app-primary-500 hover:text-app-primary-400 cursor-pointer font-bold duration-200 ease-out"
        >
          open it manually
        </a>{' '}
        or{' '}
        <a
          onClick={() => copyToClipboard(AUTH_API.AUTHORIZE)}
          className="text-app-primary-500 hover:text-app-primary-400 cursor-pointer font-bold duration-200 ease-out"
        >
          copy
        </a>{' '}
        and paste the URL into your browser.
      </p>
      <CodePopover />
    </div>
  )
}

export default BrowserAuth
