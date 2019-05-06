import { StyleSheet, StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';
import { Avatar }  from 'react-native-elements';

import React, { Component } from 'react';

import Dashboard from 'react-native-dashboard';

import {DrawerNavigator} from 'react-navigation'
const items = [
  { name: 'Profile', background: '#3498db', icon: 'user' },
  { name: 'Attendance', background: '#3498db', icon: 'calendar' },
  { name: 'Assignment', background: '#efcf02', icon: 'briefcase' },
  { name: 'Events', background: '#efcf02', icon: 'users' },
  { name: 'Notes', background: '#efcf02', icon: 'file' },
  { name: 'Stats', background: '#efcf02', icon: 'gear' },
];
export default class StudentDashboard extends Component {
  static navigationOptions = {
    header: null,
    
  }
  constructor(props) {
    super(props);
    this.state = { dataSource: [],hasToken: false }
    
   // this.state = {date:"2016-05-15"}
  }
  
  componentDidMount(){
    //console.log(this.props.navigation.state.params.username)
    fetch("http://100.121.101.233:8000/users/users/"+this.state.username+"/")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       
       dataSource: responseJson
      })
      .catch(error=>console.log(error))
    })
    AsyncStorage.getItem('username').then((username) => {
    
      this.setState({
      username:username 
      
      })
      
      console.log("Username:"+this.state.username)
     
    })
    // AsyncStorage.getItem('key').then((key) => {
    
    //   this.setState({
    //   key:key 
      
    //   })
      
  
    //  console.log("key:"+this.state.key)

    // })
  }
_card = el => {
 
 
    this.props.navigation.navigate('Student'+el.name)
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
<TouchableOpacity style={styles.loginButton}  >
              <Text style={styles.loginButtonTitle} >{this.state.username}</Text>
            </TouchableOpacity>


        </View>
      <View style={styles.dashboard}>
        <Dashboard items={items} background={true} card={this._card} column={2}  />
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