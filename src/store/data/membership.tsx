import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Document} from 'firestorter';

import Session from './session';

export type MembershipType = 'recurring' | 'class';

interface Data {
  type: MembershipType;
  startDate: FirebaseFirestoreTypes.Timestamp;
  endDate: FirebaseFirestoreTypes.Timestamp;
  sessions: FirebaseFirestoreTypes.DocumentReference[];
  classes: number;
}

class Membership extends Document<Data> {
  private _sessions: Session[] = [];

  get type() {
    return this.data.type;
  }
  get startDate() {
    return this.data.startDate;
  }

  get endDate() {
    return this.data.endDate;
  }

  get sessions() {
    if (
      this._sessions.length !==
      (this.data.sessions ? this.data.sessions.length : 0)
    )
      this._sessions = (this.data.sessions || []).map(ref => new Session(ref));
    return this._sessions;
  }

  get classes() {
    return this.data.classes;
  }

  get classesLeft() {
    return this.classes - this.sessions.length;
  }
}
export default Membership;
