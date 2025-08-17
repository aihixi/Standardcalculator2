import React from 'react'
import RouterConfig from './router'
import TitleBar from './components/Mytitle'
//import Versions from './components/Versions';
//import electronLogo from './assets/electron.svg';

function App(): React.JSX.Element {
  return (
    <div className="no-select">
      {window.api && <TitleBar />}
      <RouterConfig />
    </div>
  )
}

export default App
