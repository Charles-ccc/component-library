import React from 'react';
import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
