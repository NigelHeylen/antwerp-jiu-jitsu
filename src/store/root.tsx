import DataStore from './data';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import {initFirestorter} from 'firestorter';

export default class RootStore {
  data: DataStore;

  constructor() {
    initFirestorter({firebase});

    this.data = new DataStore();
  }
}
