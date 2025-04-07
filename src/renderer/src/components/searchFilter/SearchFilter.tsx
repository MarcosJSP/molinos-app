import { FilterIcon } from '@/components/icons'
import {
  Menu,
  MenuCollapsible,
  MenuCollapsibleContent,
  MenuCollapsibleTrigger,
  MenuContent,
  MenuItem,
  MenuTrigger
} from '@/components/menu/Menu'
import SearchActionButton from '@/components/searchActionButton/SearchActionButton'
import { FC } from 'react'

const SearchFilter: FC = () => {
  return (
    <Menu>
      <MenuTrigger asChild>
        <SearchActionButton aria-label="Filter search results">
          <FilterIcon />
        </SearchActionButton>
      </MenuTrigger>

      <MenuContent className="w-[300px] max-w-[300px]">
        <MenuCollapsible>
          <MenuCollapsibleTrigger>Tags</MenuCollapsibleTrigger>
          <MenuCollapsibleContent>
            <MenuItem disableCloseMenu>Item 1</MenuItem>
          </MenuCollapsibleContent>
        </MenuCollapsible>
      </MenuContent>
    </Menu>
  )
}

export default SearchFilter
