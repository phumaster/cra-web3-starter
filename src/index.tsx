import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { HashRouter } from 'react-router-dom';

import './assets/styles/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Web3Wrapper from './shared/packages/web3/components/Web3Wrapper';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HashRouter>
        <Web3Wrapper>
          <App />
        </Web3Wrapper>
      </HashRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
