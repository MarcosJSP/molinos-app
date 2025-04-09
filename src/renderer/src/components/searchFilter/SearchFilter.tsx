import { Checkbox } from '@/components/checkbox/CheckBox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/collapsible/Collapsible'
import { FilterIcon } from '@/components/icons'
import { Input } from '@/components/input/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover/Popover'
import SearchActionButton from '@/components/searchActionButton/SearchActionButton'
import SearchBar from '@/components/searchBar/SearchBar'
import { Slider } from '@/components/slider/Slider'
import { Switch } from '@/components/switch/Switch'
import { Toggle } from '@/components/toggle/Toggle'
import { FC, useState } from 'react'

const MIN_BPM = 0
const MAX_BPM = 300
const DEFAULT_BPM = 120
const DEFAULT_ENABLED = false
const SearchFilterBpm: FC = () => {
  const [bpm, setBpm] = useState(DEFAULT_BPM)
  const [isEnabled, setIsEnabled] = useState(DEFAULT_ENABLED)

  return (
    <Collapsible>
      <CollapsibleTrigger>Bpm</CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <div className="text-app-gray-600 mb-4 flex items-center justify-end gap-2">
          Enable
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled}></Switch>
        </div>
        <Input
          type="number"
          min={MIN_BPM}
          max={MAX_BPM}
          placeholder="Bpm"
          value={`${bpm}`}
          onChange={(e) => setBpm(+e.target.value)}
          disabled={!isEnabled}
        />
        <Slider
          min={MIN_BPM}
          max={MAX_BPM}
          value={[bpm]}
          onValueChange={([v]) => setBpm(v)}
          disabled={!isEnabled}
        />
        <div className="text-app-gray-700 flex justify-between text-xs">
          <span>{MIN_BPM}</span>
          <span>{MAX_BPM}</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
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

type CheckItemProps = {
  id: string
  children: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}
const CheckItem: FC<CheckItemProps> = ({ id, checked, children, onCheckedChange }) => {
  return (
    <div className="flex">
      <Checkbox className="my-1.5" id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor={id}
        className="text-app-gray-300 cursor-pointer py-1.5 pl-2 text-sm select-none"
      >
        {children}
      </label>
    </div>
  )
}

const SearchFilterTags: FC = () => {
  return (
    <Collapsible>
      <CollapsibleTrigger>Tags</CollapsibleTrigger>
      <CollapsibleContent className="p-4">
        <SearchBar className="mb-2"></SearchBar>

        <CheckItem id="1">
          Sampling+
          <span className="text-app-gray-700 ml-1 text-[10px]">100</span>
        </CheckItem>
        <CheckItem id="2">
          Creative Commons 0<span className="text-app-gray-700 ml-1 text-[10px]">34</span>
        </CheckItem>
      </CollapsibleContent>
    </Collapsible>
  )
}

const SearchFilter: FC = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SearchActionButton aria-label="Filter search results">
          <FilterIcon />
        </SearchActionButton>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] max-w-[300px] px-0 py-2">
        <SearchFilterBpm />
        <SearchFilterKeys />
        <SearchFilterTags />
      </PopoverContent>
    </Popover>
  )
}

export default SearchFilter
