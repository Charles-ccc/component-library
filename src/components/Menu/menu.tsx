import React, {createContext, useState} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'
export interface MenuProps {
  defaultIndex?: number
  mode?: 'horizontal' | 'vertical'
  className?: string
  style?: React.CSSProperties
  onSelect?: (selectIndex: number) => void
}

interface IMenuContext {
  index: number
  onSelect?: (selectIndex: number) => void
}

export const MenuContext = createContext<IMenuContext>({index: 0})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    ...restProps
  } = props

  const [currentActive, setCurrentActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  })

  const handleClick = (index: number) => {
    setCurrentActive(index)
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 获取函数组件的实例，通过实例的方法取到displayName，来判断children是否合法
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} = childElement.type
      if (displayName === 'MenuItem') {
        // 将index属性通过克隆节点方式混入
        return React.cloneElement(childElement, { index })
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
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu