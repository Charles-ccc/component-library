import React, {createContext, useState} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
export interface MenuProps {
  defaultIndex?: string
  mode?: 'horizontal' | 'vertical'
  className?: string
  style?: React.CSSProperties
  onSelect?: (selectIndex: string) => void
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: (selectIndex: string) => void
  mode?: 'horizontal' | 'vertical'
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
    ...restProps
  } = props

  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  const handleClick = (index: string) => {
    setCurrentActive(index)
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 获取函数组件的实例，通过实例的方法取到displayName，来判断children是否合法
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 将index属性通过克隆节点方式混入
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu' {...restProps}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu