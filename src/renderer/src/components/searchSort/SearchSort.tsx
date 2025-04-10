import { SortIcon } from '@/components/icons'
import {
  Menu,
  MenuContent,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger
} from '@/components/menu/Menu'
import SearchActionButton from '@/components/searchActionButton/SearchActionButton'
import { FC, useState } from 'react'

const SearchSort: FC = () => {
  const [selected, setSelected] = useState('')

  return (
    <Menu>
      <MenuTrigger asChild>
        <SearchActionButton aria-label="Sort search results">
          <SortIcon />
        </SearchActionButton>
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

export default SearchSort
