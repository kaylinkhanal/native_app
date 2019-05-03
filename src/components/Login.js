import React, { Component } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
  BackHandler,
  AsyncStorage
  
  
} from 'react-native'

import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN} 
from './myColors';
const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE'
export default class Login extends Component {
  
  static navigationOptions = {
    header: null,    
  }
//   componentDidMount() {
//   BackHandler.addEventListener('hardwareBackPress', function() {
//     // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
//     // Typically you would use the navigator here to go to the last state.
  
    
//     return true;
//   })
// }
  state = {
    
    
    email:'',
    password:'',
    username:''
    
  }
  
  UserLoginFunction = () =>{
 

    
    
     fetch('http://100.121.101.233:8000/rest-auth/login/', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
        username:this.state.username,
         email: this.state.email,
        
           password: this.state.password
          
      
       })
      
     }).then((response) => response.json())
           .then((responseJson) => {
     
            console.log(responseJson)
             // If server response message same as Data 
             this.saveItem('id_token', this.state.username)
             if(responseJson.key !=null  )
                 {
                 
                       if(responseJson.user_type.is_student==true){
                      this.props.navigation.navigate("StudentDashboard", {
                         
                        username: this.state.username,
                        key:responseJson.key,
                      })
                     }
                else if (responseJson.user_type.is_teacher==true)
                {
                  this.props.navigation.navigate("TeacherDashboard",{

                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                  })
                }
         else{
           Alert.alert('Must be Teacher or student')
         }
                 }
             else{
     
               Alert.alert(JSON.stringify(responseJson));
             }
     
           }).catch((error) => {
             console.error(error);
           });
      
       }
       async saveItem(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
      }
       
  render() {
    
    console.log(this._retrieveData);
    const Divider = (props) => {
      return <View {...props}>
        <View style={styles.line}></View>
        <Text style={styles.textOR}>OR</Text>
        <View style={styles.line}></View>
      </View>
    }
    return (
      //Donot dismis Keyboard when click outside of TextInput
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            
            <Image
         style={{width: 130, height: 130,borderRadius: 130 / 2,    }}
          source={require('./images/collegelogo.png')}
        />
          <Text style={styles.title}>
             Phonics Group Of Instution
          </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
               
                placeholder="Enter your username"
                placeholderTextColor='black'
                onChangeText={username => this.setState({username})}
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor='black'
                secureTextEntry={true}
                onChangeText={password => this.setState({password})}
              >
              </TextInput>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={this.UserLoginFunction}>
              <Text style={styles.loginButtonTitle} >LOGIN</Text>
            </TouchableOpacity>
            <Divider style={styles.divider}></Divider>
            <TouchableOpacity style={styles.RegisterButton}   onPress={() =>  this.props.navigation.navigate("Registration")} >
              <Text style={styles.loginButtonTitle}>Create an account</Text>
              
            </TouchableOpacity>
          </View>
         

       

        </View>
      </TouchableWithoutFeedback>

    )
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
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  down: {
    flex: 7,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    color: COLOR_PINK_MEDIUM,
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color:'black'
  //a = alpha = opacity
  },
  textInput: {
    width: 280,
    height: 45
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  RegisterButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_GREEN
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogContentView: {
    // flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
  customBackgroundDialog: {
    opacity: 0.5,
    backgroundColor: '#000',
  },
})

