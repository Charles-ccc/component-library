import React from 'react';
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={index => console.log(index)}>
          <MenuItem>111</MenuItem>
          <MenuItem>222</MenuItem>
          <MenuItem>333</MenuItem>
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
