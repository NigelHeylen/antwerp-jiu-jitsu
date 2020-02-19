import {Document} from 'firestorter';
import {pickBy, set} from 'lodash';
import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Navigation} from 'react-native-navigation';
import styled from 'styled-components/native';

import {useStore} from '../../context';
import Member, {MemberData} from '../../store/data/member';
import Store from '../../store/root';
import {Container} from '../general/components';

const Input = styled.TextInput``;
const Button = styled.Button`
  /* Adapt the colors based on primary prop */

  font-size: 10px;
  margin: 10px;
  padding: 0.25em 10px;
  border: 2px solid black;
  border-radius: 3px;
`;

const PrimaryButton = styled(Button)`
  background-color: black;
  color: white;
`;

interface MemberDetailProps {
  member: Member;
}

const MemberDetail = observer<MemberDetailProps>(props => {
  const store = useStore();

  const {member} = props;

  const [data, setData] = useState<MemberData>(member.data);

  const {
    firstName,
    lastName,
    email,
    street,
    houseNumber,
    bus,
    city,
    country,
    phone,
    nationality,
    birthdate,
  } = data;

  return (
    <ScrollView>
      <Container>
        <Input
          placeholder="First name"
          onChangeText={updateData('firstName', setData, data)}>
          {firstName}
        </Input>
        <Input
          placeholder="Last name"
          onChangeText={updateData('lastName', setData, data)}>
          {lastName}
        </Input>
        <Input
          placeholder="Birthdate"
          onChangeText={updateData('birthdate', setData, data)}>
          {birthdate}
        </Input>
        <Input
          placeholder="Nationality"
          onChangeText={updateData('nationality', setData, data)}>
          {nationality}
        </Input>
        <Input
          placeholder="Street"
          onChangeText={updateData('street', setData, data)}>
          {street}
        </Input>
        <Input
          placeholder="Number"
          onChangeText={updateData('houseNumber', setData, data)}>
          {houseNumber}
        </Input>
        <Input
          placeholder="Bus"
          onChangeText={updateData('bus', setData, data)}>
          {bus}
        </Input>
        <Input
          placeholder="City"
          onChangeText={updateData('city', setData, data)}>
          {city}
        </Input>
        <Input
          placeholder="Country"
          onChangeText={updateData('country', setData, data)}>
          {country}
        </Input>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={updateData('email', setData, data)}>
          {email}
        </Input>
        <Input
          placeholder="Phone Number"
          keyboardType="phone-pad"
          onChangeText={updateData('phone', setData, data)}>
          {phone}
        </Input>
        <PrimaryButton title="Save" onPress={saveMember(data, store, member)} />
      </Container>
    </ScrollView>
  );
});

const saveMember = (data: MemberData, store: Store, member?: Member) => () => {
  if (member) {
    member.update(data).then(() => {
      Navigation.pop('MemberDetail');
    });
  } else {
    store.data.members.add(data).then(() => {
      Navigation.pop('MemberDetail');
    });
  }
};

const updateData = (
  field: string,
  setData: React.Dispatch<React.SetStateAction<MemberData>>,
  data: MemberData,
) => (value: string) => {
  setData(set(data, field, value));
};

export default MemberDetail;
