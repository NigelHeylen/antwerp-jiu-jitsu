import { Document, Collection } from "firestorter";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import Session from "./session";
import Membership from "./membership";

interface Data {
  firstName: string
  lastName: string
  sessions: FirebaseFirestoreTypes.DocumentReference[]
  memberships: FirebaseFirestoreTypes.DocumentReference[]
  currentMembership: FirebaseFirestoreTypes.DocumentReference
}

class Member extends Document<Data> {
  private _sessions: Session[] = [];
  private _memberships: Membership[] = [];

  get firstName(){
    return this.data.firstName
  }

  get lastName(){
    return this.data.lastName
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`
  }

  get sessions(){
    if (this._sessions.length !== (this.data.sessions ? this.data.sessions.length : 0))
      this._sessions = (this.data.sessions || []).map(ref => new Session(ref));
    return this._sessions;
  }

  get memberships(){
    if (this._memberships.length !== (this.data.memberships ? this.data.memberships.length : 0))
      this._memberships = (this.data.memberships || []).map(ref => new Membership(ref));
    return this._memberships;
  }

  get currentMembership(){
    if(this.data.currentMembership) return new Membership(this.data.currentMembership)
    else return undefined
  }
}

export default Member