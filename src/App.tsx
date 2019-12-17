import RootStore from "./store/root";
import { createContext } from "./context";
import { Navigation } from "react-native-navigation";
import router from "./helper/router";



const start = async () =>{
  console.log("start")
  Navigation.events().registerAppLaunchedListener(async () => {

    console.log("lol")
  const store = new RootStore()
  createContext(store)
  await router.register()
  })
};

export default { start };
