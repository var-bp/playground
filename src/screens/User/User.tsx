import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {getTimeZone} from 'react-native-localize';
import {add, isAfter, differenceInMilliseconds} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';
import useBackgroundTimer from '../../hooks/useBackgroundTimer';
import useAppState from '../../hooks/useAppState';
import styles from './User.style';

const SOME_STATIC_DATE = new Date();

const getAccountDuration = (): number => {
  const userTimeZone = getTimeZone();
  const date = zonedTimeToUtc(
    add(SOME_STATIC_DATE, {seconds: 30}),
    userTimeZone,
  );
  const currentDate = zonedTimeToUtc(new Date(), userTimeZone);
  if (isAfter(date, currentDate)) {
    return differenceInMilliseconds(date, currentDate);
  }
  return 0;
};

const User = () => {
  const [isAccountValid, setIsAccountValid] = useState(true);

  const isForeground = useAppState();

  const accountDuration = getAccountDuration();

  const handleAccountExpiration = () => {
    setIsAccountValid(false);
  };

  useBackgroundTimer(
    handleAccountExpiration,
    accountDuration,
    isAccountValid && isForeground,
  );

  return (
    <View style={styles.container}>
      <Text>
        This is the User screen. Account {isAccountValid ? 'valid' : 'expired'}.
      </Text>
    </View>
  );
};

export default User;
