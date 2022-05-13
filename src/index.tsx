import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

import './shared/styles/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Web3Wrapper from './shared/components/Web3Wrapper';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Web3Wrapper>
          <App />
        </Web3Wrapper>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
