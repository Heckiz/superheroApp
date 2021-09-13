import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {logOut} from '../../app/slices/auth/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import styles from './styles';

const Profile = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user}</Text>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => dispatch(logOut())}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
