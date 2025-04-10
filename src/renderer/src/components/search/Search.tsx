import SearchBar from '@/components/searchBar/SearchBar'
import SearchFilter from '@/components/searchFilter/SearchFilter'
import SearchSort from '@/components/searchSort/SearchSort'
import { FC } from 'react'

const Search: FC = () => {
  return (
    <div className="flex w-full pb-4">
      <SearchBar className="" />
      <div className="ml-4 flex gap-1">
        <SearchFilter />
        <SearchSort />
      </div>
    </div>
  )
}

export default Search
