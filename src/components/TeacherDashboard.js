import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';
import { Avatar }  from 'react-native-elements';

import React, { Component } from 'react';

import Dashboard from 'react-native-dashboard';

const items = [
  { name: 'Profile', background: '#3498db', icon: 'user' },
  { name: 'Attendance', background: '#3498db', icon: 'calendar' },
  { name: 'Assignment', background: '#efcf02', icon: 'briefcase' },
  { name: 'Events', background: '#efcf02', icon: 'users' },
  { name: 'Notes', background: '#efcf02', icon: 'file' },
  { name: 'Stats', background: '#efcf02', icon: 'gear' },
];
export default class TeacherDashboard extends Component {
  static navigationOptions = {
    header: null,    
  }
_card = el => {
    console.log('Card: ' + el.name)
    this.props.navigation.navigate(el.name, {

      user: this.state.dataSource.id,
      key:this.props.navigation.state.params.key,
      username:this.props.navigation.state.params.username
    })
  };
  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'NO-ID');
    const email = navigation.getParam('email', 'NO-ID');


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
<TouchableOpacity style={styles.loginButton}  >
              <Text style={styles.loginButtonTitle} >{username}</Text>
            </TouchableOpacity>


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
  loginButton: {
    width: 100,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },

});