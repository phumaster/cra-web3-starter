import { FC, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

const Account: FC = () => {
  const { active, deactivate, account } = useWeb3React();
  const handleDisconnect = useCallback(() => {
    if (active) {
      deactivate();
      // This localStorage key is set by @web3-react/walletconnect-connector
      if (window.localStorage.getItem('walletconnect')) {
        window.localStorage.removeItem('walletconnect');
      }
    }
  }, [deactivate, active]);
  if (!active) return null;
  return (
    <div className="connectButton" onClick={handleDisconnect}>
      <span>{account ?? ''}</span>
    </div>
  );
};

export default Account;
