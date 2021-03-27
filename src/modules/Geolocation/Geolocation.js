import {selectPlatform} from '../../utils';
import androidGeolocation from './Geolocation.android';
import iosGeolocation from './Geolocation.ios';

const Geolocation = selectPlatform(iosGeolocation, androidGeolocation, {});

export default Geolocation;
