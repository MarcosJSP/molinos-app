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
      'cursor-pointer transition-colors duration-100 p-2 outline-none hover:bg-app-primary-950 rounded-lg text-app-gray-300 select-none focus:bg-app-primary-950 active:bg-app-primary-900  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex items-center'
    )
  })

const MenuSeparator = DropdownMenuPrimitive.Separator
const MenuContent: FC<PropsWithChildren> = ({ children }) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content className="popup py-3" collisionPadding={12}>
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
)

export { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator }
