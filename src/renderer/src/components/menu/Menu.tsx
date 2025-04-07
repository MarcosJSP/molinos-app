import { cn } from '@/utils/helpers'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React, { FC, PropsWithChildren } from 'react'

const Menu = DropdownMenuPrimitive.Root
const MenuTrigger = DropdownMenuPrimitive.Trigger

const MenuItem: FC<React.ComponentProps<typeof DropdownMenuPrimitive.Item>> = ({
  className,
  ...props
}) =>
  React.cloneElement(<DropdownMenuPrimitive.Item />, {
    ...props,
    className: cn(
      className,
      'cursor-pointer transition-colors duration-200 p-2 outline-none hover:bg-app-primary-950 rounded-lg text-app-gray-300 select-none focus:bg-app-primary-950 active:bg-app-primary-900  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-center'
    )
  })

const MenuRadioGroup: FC<React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>> = ({
  className,
  ...props
}) =>
  React.cloneElement(<DropdownMenuPrimitive.RadioGroup />, {
    ...props,
    className: cn(className, 'space-y-1')
  })

const MenuRadioItem: FC<React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>> = ({
  className,
  children,
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      className,
      'hover:bg-app-primary-950 text-app-gray-300 focus:bg-app-primary-950 active:bg-app-primary-900 data-[state=checked]:bg-app-primary-500 data-[state=checked]:text-app-white flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-200 outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    )}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.RadioItem>
)

const MenuSeparator = DropdownMenuPrimitive.Separator
const MenuContent: FC<PropsWithChildren> = ({ children }) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      className="popup space-y-1 py-3"
      collisionPadding={12}
      sideOffset={4}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
)

export { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuRadioGroup, MenuRadioItem }
