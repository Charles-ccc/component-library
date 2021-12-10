import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}
const testVerProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
}
const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    menuElement= wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
})

describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  // it('should show dropdown items when click on subMenu for vertical mode', () => {
  //   const dropDownItem = wrapper2.queryByText('drop1')
  //   expect(dropDownItem).not.toBeVisible()
  //   fireEvent.click(wrapper2.getByText('dropdown'))
  //   expect(dropDownItem).toBeVisible()
  // })
  // it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
  //   expect(wrapper2.queryByText('opened1')).toBeVisible()
  // })
})