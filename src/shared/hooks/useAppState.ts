import { createGlobalState } from 'react-use';
import { IHookStateSetAction } from 'react-use/lib/misc/hookState';

interface AppState {
  connectModalVisible: boolean;
  switchNetworkModalVisible: boolean;
}

interface AppStateWithMethods extends AppState {
  setAppState: (state: IHookStateSetAction<AppState>) => void;
}

const appState = createGlobalState<AppState>({
  connectModalVisible: false,
  switchNetworkModalVisible: false,
});

function useAppState(): AppStateWithMethods {
  const [state, setAppState] = appState();

  return {
    ...state,
    setAppState,
  };
}

export default useAppState;
