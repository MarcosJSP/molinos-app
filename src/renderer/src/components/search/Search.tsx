import { FilterIcon, SortIcon } from '@/components/icons'
import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger
} from '@/components/menu/Menu'
import SearchBar from '@/components/searchBar/SearchBar'
import { cn } from '@/utils/helpers'
import { ComponentProps, FC, useState } from 'react'

const ActionButton: FC<ComponentProps<'button'>> = ({ className, ...props }) => (
  <button
    className={cn(
      'btn group outline-focus border-app-gray-800 text-app-gray-300 size-9 border text-2xl',
      className
    )}
    {...props}
  />
)

const ActionButtonSort: FC = () => {
  const [selected, setSelected] = useState('')

  return (
    <Menu>
      <MenuTrigger asChild>
        <ActionButton aria-label="Sort search results">
          <SortIcon />
        </ActionButton>
      </MenuTrigger>

      <MenuContent>
        <MenuRadioGroup value={selected} onValueChange={setSelected}>
          <MenuRadioItem value="a">Relevance</MenuRadioItem>
          <MenuRadioItem value="b">Duration (longest first)</MenuRadioItem>
          <MenuRadioItem value="c">Date added (newest first)</MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  )
}

const Search: FC = () => {
  return (
    <div className="flex w-full pb-4">
      <SearchBar className="" />
      <div className="ml-4 flex gap-1">
        <ActionButton aria-label="Filter search results">
          <FilterIcon />
        </ActionButton>
        <ActionButtonSort />
      </div>
    </div>
  )
}

export default Search
