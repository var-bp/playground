import {useEffect} from 'react';
import BackgroundTimer from 'react-native-background-timer';

// https://github.com/ocetnik/react-native-background-timer

const useBackgroundTimer = (
  fn: () => void,
  fnDelay: number,
  isTimerRelevant = true,
) => {
  useEffect(() => {
    if (isTimerRelevant) {
      BackgroundTimer.runBackgroundTimer(fn, fnDelay);
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [fn, fnDelay, isTimerRelevant]);
};

export default useBackgroundTimer;
