import {useState, useEffect, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {debounce} from 'lodash';

// https://blog.aamnah.com/react/responsive-screen-dimensions-react-native

export type Orientation = 'PORTRAIT' | 'LANDSCAPE' | 'UNKNOWN';

const isPortrait = (): boolean => {
  const {height, width} = Dimensions.get('screen');
  return height >= width;
};

const isLandscape = (): boolean => {
  const {height, width} = Dimensions.get('screen');
  return width >= height;
};

const getOrientation = (): Orientation => {
  if (isPortrait()) {
    return 'PORTRAIT';
  }
  if (isLandscape()) {
    return 'LANDSCAPE';
  }
  return 'UNKNOWN';
};

const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation);

  const handleChange = useCallback(() => {
    setOrientation(getOrientation());
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', debounce(handleChange, 100));
    return () => {
      Dimensions.removeEventListener('change', handleChange);
    };
  }, [handleChange]);

  return orientation;
};

export default useOrientation;
