import { cn } from '@/utils/helpers'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import React, { FC } from 'react'

const Menu = DropdownMenuPrimitive.Root
const MenuTrigger = DropdownMenuPrimitive.Trigger

type WithDisableCloseMenuProps = {
  disableCloseMenu?: boolean
  onSelect?: (event: Event) => void
}

// Higher-order component to wrap a component with the ability to disable closing the menu
// by default clicking a menu item closes the menu.
const withDisableCloseMenu = <P extends WithDisableCloseMenuProps>(
  WrappedComponent: React.ComponentType<P>,
  defaultDisableCloseMenu = false
): FC<P & WithDisableCloseMenuProps> => {
  const ComponentWithDisableCloseMenu: FC<P> = ({
    disableCloseMenu = defaultDisableCloseMenu,
    onSelect,
    ...props
  }: P) => {
    const handleSelect = (event: Event): void => {
      if (disableCloseMenu) {
        event.preventDefault()
      }
      onSelect?.(event)
    }

    return <WrappedComponent {...(props as P)} onSelect={handleSelect} />
  }

  return ComponentWithDisableCloseMenu
}

type MenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item>
const MenuItem = withDisableCloseMenu<MenuItemProps>(({ className, ...props }) => (
  <DropdownMenuPrimitive.Item
    {...props}
    className={cn(
      className,
      'outline-focus hover:bg-app-primary-950 text-app-gray-300 focus:bg-app-primary-950 active:bg-app-primary-900 mx-2 flex cursor-pointer items-center rounded-lg p-2 transition-all duration-200 select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
    )}
  />
))

type MenuRadioGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
const MenuRadioGroup: FC<MenuRadioGroupProps> = ({ className, ...props }) =>
  React.cloneElement(<DropdownMenuPrimitive.RadioGroup />, {
    ...props,
    className: cn(className, 'space-y-1')
  })

type MenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>
const MenuRadioItem = withDisableCloseMenu<MenuRadioItemProps>(
  ({ className, children, ...props }) => (
    <DropdownMenuPrimitive.RadioItem
      {...props}
      className={cn(
        className,
        'outline-focus hover:bg-app-primary-950 text-app-gray-300 focus:bg-app-primary-950 active:bg-app-primary-900 data-[state=checked]:bg-app-primary-500 data-[state=checked]:text-app-white mx-2 flex cursor-pointer items-center rounded-lg p-2 transition-all duration-200 select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      )}
    >
      {children}
    </DropdownMenuPrimitive.RadioItem>
  ),
  true
)

const MenuSeparator = DropdownMenuPrimitive.Separator

type MenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>
const MenuContent: FC<MenuContentProps> = ({
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

export { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuRadioGroup, MenuRadioItem }
