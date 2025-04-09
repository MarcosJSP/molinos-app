import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/collapsible/Collapsible'
import { FilterIcon } from '@/components/icons'
import Info from '@/components/info/Info'
import {
  MenuCollapsible,
  MenuCollapsibleCheckbox,
  MenuCollapsibleContent,
  MenuCollapsibleTrigger
} from '@/components/menu/Menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/Popover'
import SearchActionButton from '@/components/searchActionButton/SearchActionButton'
import SearchBar from '@/components/searchBar/SearchBar'
import { Toggle } from '@/components/toggle/Toggle'
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

const SearchFilterKeys: FC = () => (
  <Collapsible>
    <CollapsibleTrigger>Keys</CollapsibleTrigger>
    <CollapsibleContent className="p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="ml-7 grid grid-cols-[repeat(7,1.75rem)] gap-1.5 *:size-7 *:whitespace-nowrap">
          <Toggle>C#</Toggle>
          <Toggle>D#</Toggle>
          <Toggle className="col-start-4">F#</Toggle>
          <Toggle>G#</Toggle>
          <Toggle>A#</Toggle>
        </div>
        <div className="mt-1.5 grid grid-cols-[repeat(7,1.75rem)] gap-1.5 *:size-7">
          <Toggle>C</Toggle>
          <Toggle>D</Toggle>
          <Toggle>E</Toggle>
          <Toggle>F</Toggle>
          <Toggle>G</Toggle>
          <Toggle>A</Toggle>
          <Toggle>B</Toggle>
        </div>
        <div className="mt-3.5 flex items-center justify-center gap-2">
          <Toggle>Major</Toggle>
          <Toggle>Minor</Toggle>
        </div>
      </div>
    </CollapsibleContent>
  </Collapsible>
)

const SearchFilter: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SearchActionButton aria-label="Filter search results">
          <FilterIcon />
        </SearchActionButton>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] max-w-[300px] px-0 py-2">
        <SearchFilterKeys />
      </PopoverContent>
    </Popover>
  )
}

export default SearchFilter
