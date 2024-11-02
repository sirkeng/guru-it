// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import { Icon } from '@iconify/react/dist/iconify.js'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/home' icon={<Icon icon='tabler-smart-home' />}>
          Home
        </MenuItem>
        <SubMenu label={"TicketPage"} icon={<Icon icon='tabler:ticket' />}>
          <MenuItem href='/ticket/overview' icon={<Icon icon='tabler-info-circle' />}>
            Overview
          </MenuItem>
          <SubMenu label={"Ticket"} icon={<Icon icon='mdi:ticket' />}>
            <MenuItem href='/ticket/overview?add=ticket' icon={<Icon icon='ph:plus-fill' />}>
              Add
            </MenuItem>
            <MenuItem href='/ticket/overview?pageNo=1&sttkid=0' icon={<Icon icon='tabler-info-circle' />}>
              Waiting
            </MenuItem>
            <MenuItem href='/ticket/overview?pageNo=1&sttkid=1' icon={<Icon icon='tabler-info-circle' />}>
              On Process
            </MenuItem>
            <MenuItem href='/ticket/overview?pageNo=1&sttkid=2' icon={<Icon icon='tabler-info-circle' />}>
              Complete
            </MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu label={"MaintenancePage"} icon={<Icon icon='tabler:tools' />}>
          <MenuItem href='/maintenance/overview' icon={<Icon icon='tabler-info-circle' />}>
            Overview
          </MenuItem>
          <SubMenu label={"Maintenance"} icon={<Icon icon='game-icons:toolbox' />}>
            <MenuItem href='/maintenance/adddata' icon={<Icon icon='ph:plus-fill' />}>
              Add
            </MenuItem>
            <MenuItem href='/maintenance/overview?pageNo=1&stmid=0' icon={<Icon icon='tabler-info-circle' />}>
              Draft
            </MenuItem>
            <MenuItem href='/maintenance/overview?pageNo=1&stmid=1' icon={<Icon icon='tabler-info-circle' />}>
              Complete
            </MenuItem>
          </SubMenu>
        </SubMenu>

        <SubMenu label={"ListUserPage"} icon={<Icon icon='ph:user-bold' />}>
          <MenuItem href='/customer/overview' icon={<Icon icon='tabler-info-circle' />}>
            Customer
          </MenuItem>
          <MenuItem href='/engineer/overview' icon={<Icon icon='tabler-info-circle' />}>
            Engineer
          </MenuItem>
        </SubMenu>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData(dictionary)} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
