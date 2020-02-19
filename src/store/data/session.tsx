import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Document} from 'firestorter';

import Member from './member';

interface Data {
  date: FirebaseFirestoreTypes.Timestamp;
  attendees: FirebaseFirestoreTypes.DocumentReference[];
}

class Session extends Document<Data> {
  private _attendees: Member[] = [];

  get date() {
    return this.data.date;
  }

  set date(date: FirebaseFirestoreTypes.Timestamp) {
    this.update({
      date,
    });
  }

  get attendees() {
    if (
      this._attendees.length !==
      (this.data.attendees ? this.data.attendees.length : 0)
    )
      this._attendees = (this.data.attendees || []).map(ref => new Member(ref));
    return this._attendees;
  }
}

export default Session;
