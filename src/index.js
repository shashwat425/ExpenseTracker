import React from 'react';
import ReactDOM from 'react-dom';

import { SpeechProvider } from '@speechly/react-client';


// Finally wrap our whole application with our context
import { Provider } from './context/context';

import App from './App';  // MAIN COMPONENT
import './index.css';

ReactDOM.render(
  <SpeechProvider appId="3c2bbbb8-9c15-4b44-b99c-735bc75d45fb" language="en-US">
    <Provider>
      <App />
     </Provider>
  </SpeechProvider>,
  document.getElementById('root'),
);