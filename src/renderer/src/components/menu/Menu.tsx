import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/collapsible/Collapsible'
import { CheckIcon, ChevronDownIcon } from '@/components/icons'
import { cn } from '@/utils/helpers'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React, { FC, useState } from 'react'

type DisableCloseMenu = {
  disableCloseMenu?: boolean
}

const Menu = DropdownMenuPrimitive.Root
const MenuTrigger = DropdownMenuPrimitive.Trigger

type MenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & DisableCloseMenu
const MenuItem: FC<MenuItemProps> = ({ className, disableCloseMenu = false, ...props }) =>
  React.cloneElement(<DropdownMenuPrimitive.Item />, {
    ...props,
    className: cn(
      className,
      'outline-focus cursor-pointer transition-all duration-200 p-2 mx-2 hover:bg-app-primary-950 rounded-lg text-app-gray-300 select-none focus:bg-app-primary-950 active:bg-app-primary-900  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-center'
    ),
    onSelect: (event) => {
      if (disableCloseMenu) {
        event.preventDefault()
      }
      props.onSelect?.(event)
    }
  })

const MenuRadioGroup: FC<React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>> = ({
  className,
  ...props
}) =>
  React.cloneElement(<DropdownMenuPrimitive.RadioGroup />, {
    ...props,
    className: cn(className, 'space-y-1')
  })

type MenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> &
  DisableCloseMenu
const MenuRadioItem: FC<MenuRadioItemProps> = ({
  className,
  children,
  disableCloseMenu = false,
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem
    {...props}
    className={cn(
      className,
      'outline-focus hover:bg-app-primary-950 text-app-gray-300 focus:bg-app-primary-950 active:bg-app-primary-900 data-[state=checked]:bg-app-primary-500 data-[state=checked]:text-app-white mx-2 flex cursor-pointer items-center rounded-lg p-2 transition-all duration-200 select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    )}
    onSelect={(event) => {
      if (disableCloseMenu) {
        event.preventDefault()
      }
      props.onSelect?.(event)
    }}
  >
    {children}
  </DropdownMenuPrimitive.RadioItem>
)

const MenuCollapsible: FC<React.ComponentProps<typeof Collapsible>> = ({ className, ...props }) =>
  React.cloneElement(<Collapsible />, {
    ...props,
    className: cn('border-b border-b-app-gray-950 ', className)
  })

const MenuCollapsibleTrigger: FC<React.ComponentProps<typeof DropdownMenuPrimitive.Item>> = ({
  className,
  children,
  ...props
}) => (
  <CollapsibleTrigger asChild>
    <DropdownMenuPrimitive.Item
      {...props}
      className={cn(
        'outline-focus text-app-gray-300 data-state[open]:bg-app-primary-500 relative mx-2 flex cursor-pointer items-center rounded-lg p-2 font-semibold transition-all duration-200 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=open]:[&>*:first-child]:-rotate-180',
        className
      )}
      onSelect={(event) => {
        event.preventDefault()
        props.onSelect?.(event)
      }}
    >
      <ChevronDownIcon className="absolute right-0 mr-2 text-2xl transition-all" />
      {children}
    </DropdownMenuPrimitive.Item>
  </CollapsibleTrigger>
)

const MenuCollapsibleContent: FC<React.ComponentProps<typeof CollapsibleContent>> = ({
  className,
  ...props
}) => <CollapsibleContent {...props} className={cn('bg-app-gray-950 space-y-1 py-2', className)} />

type MenuCollapsibleCheckboxProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>
const MenuCollapsibleCheckbox: FC<MenuCollapsibleCheckboxProps> = ({
  className,
  children,
  checked: checkedInput,
  ...props
}) => {
  const [_checked, _setChecked] = useState(false)
  const checked = checkedInput != undefined ? checkedInput : _checked
  const setChecked = checkedInput != undefined ? (): void => {} : _setChecked

  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        'group outline-focus text-app-gray-300 hover:bg-app-gray-900 focus:bg-app-gray-900 relative mx-2 flex cursor-pointer items-center rounded-lg p-2 pl-8 transition-all duration-200 select-none has-disabled:cursor-not-allowed has-disabled:opacity-50',
        className
      )}
      onSelect={(event) => {
        event.preventDefault()
        props.onSelect?.(event)
      }}
      onCheckedChange={(checked) => {
        props.onCheckedChange?.(checked)
        setChecked(checked)
      }}
      checked={checked}
      {...props}
    >
      <div
        className={cn(
          'bg-app-white border-app-gray-700 absolute left-0 ml-2 flex size-4 shrink-0 items-center justify-center rounded-sm border text-base transition-all',
          'group-hover:border-app-gray-600',
          checked &&
            'group-hover:border-app-primary-500 bg-app-primary-500 text-app-white border-app-primary-500'
        )}
      >
        <CheckIcon
          className={cn(
            'text-xs [&_path]:stroke-4',
            checked ? 'animate-scale-in-200' : 'animate-scale-out-200'
          )}
        />
      </div>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

const MenuSeparator = DropdownMenuPrimitive.Separator
const MenuContent: FC<React.ComponentProps<typeof DropdownMenuPrimitive.Content>> = ({
  children,
  collisionPadding = 12,
  sideOffset = 4,
  className,
  ...props
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      {...props}
      collisionPadding={collisionPadding}
      sideOffset={sideOffset}
      className={cn('popup space-y-1 py-3', className)}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
)

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuCollapsible,
  MenuCollapsibleTrigger,
  MenuCollapsibleContent,
  MenuCollapsibleCheckbox
}
