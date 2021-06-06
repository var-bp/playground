import {useState, useRef, useEffect, useCallback} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const isBackground = (state: AppStateStatus): boolean =>
  !!state.match(/inactive|background/);

const useAppState = (): boolean => {
  const appState = useRef(AppState.currentState);

  const [isForeground, setIsForeground] = useState<boolean>(
    !isBackground(appState.current),
  );

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    setIsForeground(!isBackground(nextAppState));
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  return isForeground;
};

export default useAppState;
