import { StyleSheet,FlatList,StatusBar, TouchableOpacity, ScrollView, Text, View,AppRegistry,Image,AsyncStorage,TouchableHighlight } from 'react-native';
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';
import { Avatar }  from 'react-native-elements';

import React, { Component } from 'react';
import DialogInput from 'react-native-dialog-input';
export default class TeacherSubject extends Component {
    static navigationOptions = {
        title: 'Subjects',
    
      }
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          data:[],
          isDialogVisible: false,

         };
         
       }
       showDialog(isShow){
        this.setState({isDialogVisible: isShow});
      }
      sendInput(inputText){
        console.log("sendInput (DialogInput#1): "+inputText);
        console.log("FacultyID:"+this.state.user)
        console.log("FacultyToekn:"+this.state.key)

        fetch('http://100.121.101.233:8000/users/subject/', {
      method: 'POST',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  `280f577b841ee70418adecec5fdc918ea3ee0a07`,
        Authorization: `Token `+this.state.key,

      },
      body:
        JSON.stringify({
          "subject_name": inputText,
          
          "faculty": this.state.user
        })




    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched
        {this.componentDidMount}
        {this.showDialog(false)}

      });
      }
       componentDidMount(){
        fetch('http://100.121.101.233:8000/users/subject/')
              .then((response) => response.json())
              .then(data => {
                  console.log(data)
            this.setState({ data: data.filter(d => d.faculty === 2) })
          })
              .catch((error) => {
                console.error(error);
              });  
              
              AsyncStorage.getItem('key').then((key) => {
  
                this.setState({
                key:key 
                
                })
                
                console.log("key:"+this.state.key)
               
              })
              AsyncStorage.getItem('user').then((user) => {
              
                this.setState({
                user:user 
                
                })
            })          

          
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
      
      addButton=()=>{
        {this.showDialog(true)}
          console.log("Add Button")
      }
    render() {
    return(
        <View style={styles.MainContainer}>
        <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Add Subject"}
                    // message={""}
                    hintInput ={"Enter Subject Name"}
                    submitInput={ (inputText) => {this.sendInput(inputText)} }
                    closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>
        <FlatList
         
         data={ this.state.data }
         
         ItemSeparatorComponent = {this.FlatListItemSeparator}

         renderItem={({item}) => <Text style={styles.item} 
         
         > {item.subject_name} </Text>}
        >
        
        </FlatList>
        <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={this.addButton}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                    </View>
    );
    }
}
const styles = StyleSheet.create({
    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
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