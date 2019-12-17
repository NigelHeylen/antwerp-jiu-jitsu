
import { Navigation } from "react-native-navigation";

import HomeView from "../component/home/view"
import MemberList from "../component/member/list"

const register = async() => {

  console.log("register component")
  Navigation.registerComponent("HomeView", () => HomeView)
  Navigation.registerComponent("MemberList", () => MemberList)

  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "HomeView",
              id: "HomeView"
            }
          }
        ]
      }
   
    }
  });
}


export default {
  register
};