import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/collapsible/Collapsible'
import { ChevronDownIcon } from '@/components/icons'
import { cn } from '@/utils/helpers'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React, { FC } from 'react'

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
      'cursor-pointer transition-colors duration-200 p-2 mx-2 outline-none hover:bg-app-primary-950 rounded-lg text-app-gray-300 select-none focus:bg-app-primary-950 active:bg-app-primary-900  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-center'
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
      'hover:bg-app-primary-950 text-app-gray-300 focus:bg-app-primary-950 active:bg-app-primary-900 data-[state=checked]:bg-app-primary-500 data-[state=checked]:text-app-white mx-2 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-200 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
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
    className: cn('mx-2 border-b border-b-app-gray-950 data-[state=open]:rounded-b-lg', className)
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
        'outline-focus text-app-gray-300 data-state[open]:bg-app-primary-500 relative flex cursor-pointer items-center rounded-lg p-2 font-semibold transition-all duration-200 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=open]:[&>*:first-child]:-rotate-180',
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
}) => <CollapsibleContent {...props} className={cn('bg-app-gray-950 rounded-b-lg', className)} />

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
  MenuCollapsibleContent
}
