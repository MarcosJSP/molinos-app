import { SearchIcon, XCloseIcon } from '@/components/icons'
import { Input } from '@/components/input/input'
import { cn, setInputValue } from '@/utils/helpers'
import mergeRefs from 'merge-refs'
import { ComponentProps, FC, useRef, useState } from 'react'

const SearchBar: FC<ComponentProps<typeof Input>> = ({
  className,
  onChange = (): void => {},
  ...props
}) => {
  const [hasValue, setHasValue] = useState(false)
  const _ref = useRef<HTMLInputElement>(null)
  const ref = mergeRefs(props.ref, _ref)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setHasValue(value.length > 0)
    onChange(e)
  }

  const clearInput = (): void => {
    const input = _ref.current
    if (!input) return
    setInputValue(input, '')
  }

  return (
    <div className={cn('relative flex w-full items-center', className)}>
      <SearchIcon className="text-app-gray-600 absolute left-3 text-sm" />
      <Input
        ref={ref}
        placeholder="Search"
        aria-label="Search"
        type="text"
        onChange={handleOnChange}
        className="max-h-9 pr-8 pl-8"
        {...props}
      />
      {hasValue && (
        <button
          className="outline-focus btn text-app-gray-600 absolute right-1 text-sm transition-all"
          onClick={clearInput}
          aria-label="Clear search input"
        >
          <XCloseIcon />
        </button>
      )}
    </div>
  )
}

export default SearchBar
