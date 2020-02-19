import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {Document} from 'firestorter';

import Membership from './membership';
import Session from './session';

export interface MemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  houseNumber: string;
  areaCode: string;
  birthdate: string;
  bus: string;
  city: string;
  country: string;
  nationality: string;
  sessions: FirebaseFirestoreTypes.DocumentReference[];
  currentMembership: FirebaseFirestoreTypes.DocumentReference;
}

class Member extends Document<MemberData> {
  private _sessions: Session[] = [];

  get firstName() {
    return this.data.firstName;
  }

  get lastName() {
    return this.data.lastName;
  }

  get email() {
    return this.data.email;
  }

  get phone() {
    return this.data.phone;
  }

  get street() {
    return this.data.street;
  }

  get city() {
    return this.data.city;
  }

  get houseNumber() {
    return this.data.houseNumber;
  }

  get areaCode() {
    return this.data.areaCode;
  }

  get birthdate() {
    return this.data.birthdate;
  }

  get bus() {
    return this.data.bus;
  }

  get country() {
    return this.data.country;
  }

  get nationality() {
    return this.data.nationality;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get sessions() {
    if (
      this._sessions.length !==
      (this.data.sessions ? this.data.sessions.length : 0)
    ) {
      this._sessions = (this.data.sessions || []).map(ref => new Session(ref));
    }
    return this._sessions;
  }

  get currentMembership() {
    if (this.data.currentMembership)
      return new Membership(this.data.currentMembership);
    return undefined;
  }
}

export default Member;
