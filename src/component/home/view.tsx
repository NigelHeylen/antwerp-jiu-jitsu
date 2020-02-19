import {firebase} from '@react-native-firebase/firestore';
import {observer} from 'mobx-react-lite';
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {useStore} from '../../context';
import {formatDate} from '../../helper/date';
import DataStore from '../../store/data';
import Session from '../../store/data/session';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    fontSize: 16,
  },
});

const startNewClass = (data: DataStore) => () => {
  const time = firebase.firestore.Timestamp.now();
  const session = new Session(`sessions/ajj:${formatDate(time.toMillis())}`);

  session
    .set({
      date: time,
    })
    .then(() => {
      data.currentSession = session;

      Navigation.push('HomeView', {
        component: {
          id: 'MemberList',
          name: 'MemberList',
          passProps: {
            session: true,
          },
        },
      });
    });
};

const memberList = () => {
  Navigation.push('HomeView', {
    component: {
      id: 'MemberList',
      name: 'MemberList',
      passProps: {
        session: false,
      },
    },
  });
};

const HomeView = () => {
  const {data} = useStore();

  return (
    <View style={styles.container}>
      <Button title="new class" onPress={startNewClass(data)} />
      <Button title="members" onPress={memberList} />
    </View>
  );
};

export default observer(HomeView);
