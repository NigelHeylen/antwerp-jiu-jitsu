import {Collection} from 'firestorter';

import Member from './member';
import Session from './session';

class DataStore {
  members = new Collection<Member>('members', {
    query: ref => ref.orderBy('firstName'),
    createDocument: (source, options) => new Member(source, options),
  });

  sessions = new Collection<Session>('sessions', {
    createDocument: (source, options) => new Session(source, options),
  });

  currentSession?: Session = undefined;
}

export default DataStore;
