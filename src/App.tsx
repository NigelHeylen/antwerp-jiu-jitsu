import {Navigation} from 'react-native-navigation';

import {createContext} from './context';
import router from './helper/router';
import RootStore from './store/root';

const start = async () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    const store = new RootStore();
    createContext(store);
    await router.register();
  });
};

export default {start};
