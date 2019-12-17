import React from "react"
import { observer } from "mobx-react-lite"
import { Button, StyleSheet, View } from "react-native"
import { useStore } from "../../context";
import Session from "../../store/data/session";
import { firebase } from "@react-native-firebase/firestore";
import { Navigation } from "react-native-navigation";
import DataStore from "../../store/data";
import {formatDate} from "../../helper/date"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    fontSize: 16
  }
});

const startNewClass = (data: DataStore) => () => {

  const time = firebase.firestore.Timestamp.now()
  const session = new Session(`sessions/ajj:${formatDate(time.toMillis())}`)

  
  session.update({
    date: time
  }).then(() =>{
    data.currentSession = session

    Navigation.push("HomeView",{
      component: {
        id:"MemberList",
        name: "MemberList",
        passProps: {
          session: true
        }
      }
    })
  })
  }

const HomeView = () => {

  const {data} = useStore()

  return ( <View style={styles.container}> 
  <Button title="newclass" onPress={startNewClass(data)} />
  </View>)

}

export default observer(HomeView)