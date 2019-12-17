import React from "react"
import {observer} from "mobx-react-lite"
import { Text, FlatList, StyleSheet, SafeAreaView, View, Button } from "react-native"
import { useStore } from "../../context"
import Member from "../../store/data/member"
import Session from "../../store/data/session"
import firestore from "@react-native-firebase/firestore"
import Membership from "src/store/data/membership"


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    flexGrow: 1
  },
  button: {
    fontSize: 16
  },
  ended: {
    fontSize: 16,
    backgroundColor: "red"
  },
  notEnded: {
    fontSize: 16,
    backgroundColor: "green"
  }
});

interface ButtonProps {
  member: Member
  currentSession: Session
  onAdd: () => void
}

const AddAttendee = observer<ButtonProps>(props => {

  const {member,currentSession, onAdd} = props

  const attendance = member.sessions.some(s => s.id === currentSession.id)

   return  <Button color={attendance ? "green" : "blue"} title="Click" onPress={onAdd}/>
})

interface MemberProps {
  member: Member
  currentSession?: Session
}

const addToSession = (session: Session, member: Member) => () => {

  session.update({
    attendees: firestore.FieldValue.arrayUnion(member.ref)
  })

  member.update({
    sessions:firestore.FieldValue.arrayUnion(session.ref)
  })

  if(member.currentMembership){
    member.currentMembership.update({
      sessions:firestore.FieldValue.arrayUnion(session.ref)
    })
  }
} 

interface MembershipEndProps {
  membership: Membership
}

const MembershipEnd = observer<MembershipEndProps>(props => {

  const {membership} = props

  console.log(membership.type)
  let ended
  if(membership.type === "recurring"){
    ended = membership.endDate.toMillis() < firestore.Timestamp.now().toMillis()
  } else {
    ended = membership.classesLeft <= 0 
  }

  console.log(membership.type)

return <Text style={ended? styles.ended : styles.notEnded}>
  {membership.type === "recurring" ? membership.endDate.toDate().toISOString() : membership.classesLeft}
  </Text>
})

const MemberItem = observer<MemberProps>(props => {

  const {member, currentSession} = props;

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{member.fullName}</Text>
      {member.currentMembership?    <MembershipEnd membership={member.currentMembership} /> : undefined}
   
     {currentSession ? 
      <AddAttendee member={member} currentSession={currentSession} onAdd={addToSession(currentSession, member)}/>
      : undefined}
    </View>)
})

interface MemberListProps{
  session: boolean
}

const MemberList = observer<MemberListProps>(props => {
  const {session} = props
  const {data} = useStore()
  const {members, currentSession} = data

  return (
  <SafeAreaView style={styles.container}>
    <FlatList 
  keyExtractor={item => item.id || ""}
  data={members.docs.slice()} 
  renderItem={({item}) => <MemberItem member={item} currentSession={session? currentSession : undefined}/>}/>
  </SafeAreaView>)
})

export default MemberList