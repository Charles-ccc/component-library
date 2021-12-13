import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={'0'} onSelect={index => console.log(index)} defaultOpenSubMenus={['3']}>
          <MenuItem>111</MenuItem>
          <MenuItem>222</MenuItem>
          <MenuItem>333</MenuItem>
          <SubMenu title='dropdown' >
            <MenuItem>444</MenuItem>
            <MenuItem>555</MenuItem>
            <MenuItem>666</MenuItem>
          </SubMenu>
        </Menu>
        
        <Button disabled> disabled </Button>
        <Button btnType={'primary'} size={'lg'}> Large Parimary </Button>
        <Button btnType={'danger'} size={'sm'}> Small Danger </Button>
        <Button btnType={'link'} size={'lg'} href='http://www.baidu.com' > Link </Button>
        <Button btnType={'link'} size={'sm'} href='http://www.baidu.com' disabled> Disabled Link </Button>
      </header>
    </div>
  );
}

export default App;
