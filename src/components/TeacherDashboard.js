
import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';
import { Avatar } from 'react-native-elements';
import React, { Component } from 'react';

import Dashboard from 'react-native-dashboard';

const items = [
  { name: 'Profile', background: '#3498db', icon: 'user' },
  { name: 'Attendance', background: '#ef0202', icon: 'calendar' },
  { name: 'Assignment', background: '#efcf02', icon: 'briefcase' },
  { name: 'Events', background: '#02ef1d', icon: 'users' },
  { name: 'Notes', background: '#02cbef', icon: 'file' },
  { name: 'Stats', background: '#ef5802', icon: 'gear' },
];
export default class TeacherDashboard extends Component {
  static navigationOptions = {
    header: null,    
  }
  
  _card = el => {
    console.log('Card: ' + el.name)
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.up}>
        <Avatar rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  }}
  size="large"
 
/>
<Text>Niroj Humagain</Text>
        </View>
      <View style={styles.dashboard}>
        <Dashboard items={items} background={true} card={this._card} column={2} />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',  
    backgroundColor: COLOR_PINK_LIGHT
  },
  dashboard:{
    flex: 8,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  up: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

});