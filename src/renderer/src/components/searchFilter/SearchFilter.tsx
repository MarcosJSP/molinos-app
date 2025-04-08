import { FilterIcon } from '@/components/icons'
import Info from '@/components/info/Info'
import {
  Menu,
  MenuCollapsible,
  MenuCollapsibleCheckbox,
  MenuCollapsibleContent,
  MenuCollapsibleTrigger,
  MenuContent,
  MenuTrigger
} from '@/components/menu/Menu'
import SearchActionButton from '@/components/searchActionButton/SearchActionButton'
import SearchBar from '@/components/searchBar/SearchBar'
import { FC } from 'react'

const SearchFilterTags: FC = () => {
  return (
    <MenuCollapsible defaultOpen>
      <MenuCollapsibleTrigger>Tags</MenuCollapsibleTrigger>
      <MenuCollapsibleContent className="space-y-1">
        <div className="mx-4 pb-1" data-radix-collection-item role="menuitem">
          <SearchBar onKeyDown={(event) => event.stopPropagation()} />
        </div>

        <div className="mx-2 max-h-[300px] space-y-1 overflow-y-auto py-1">
          <MenuCollapsibleCheckbox>Allou</MenuCollapsibleCheckbox>
        </div>
      </MenuCollapsibleContent>
    </MenuCollapsible>
  )
}

const SearchFilter: FC = () => {
  return (
    <Menu>
      <MenuTrigger asChild>
        <SearchActionButton aria-label="Filter search results">
          <FilterIcon />
        </SearchActionButton>
      </MenuTrigger>

      <MenuContent className="w-[300px] max-w-[300px]">
        <SearchFilterTags />
      </MenuContent>
    </Menu>
  )
}

export default SearchFilter
