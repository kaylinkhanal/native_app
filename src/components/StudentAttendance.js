import { StyleSheet,FlatList,StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage,TouchableHighlight } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';
import { Avatar }  from 'react-native-elements';
//import { Accordion, List } from 'antd-mobile';
import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
export default class StudentAttendance extends Component {
    static navigationOptions = {
        title: 'Attendance Record',
    
      }
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          data:[],
          isDialogVisible: false,

         };
         
       }
       
       componentDidMount(){

        AsyncStorage.getItem('username').then((username) => {
              
            this.setState({
            username:username 
            
            })
        }) 
        fetch('http://100.121.101.233:8000/users/attendancerecord/')
              .then((response) => response.json())
              .then(data => {
                  console.log(data)
            this.setState({ data: data.filter(d => d.full_name === this.state.username) })
          })
              .catch((error) => {
                console.error(error);
              });  
              
             
                      

          
       }
       FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#607D8B",
            }}
          />
        );
      }
      
      
    render() {
    return(
        <View style={styles.MainContainer}>
        <FlatList
         
         data={ this.state.data }
         
         ItemSeparatorComponent = {this.FlatListItemSeparator}

         renderItem={({item}) => <Text style={styles.item} 
         
         > {item.subject_name}-{item.Date} </Text>}
        >
        
        </FlatList>
        
                    </View>
    );
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: COLOR_PINK_LIGHT
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
});