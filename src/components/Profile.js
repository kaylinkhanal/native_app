
import React, { Component } from 'react';
import { Button, Image, StyleSheet, TextInput, View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert, Picker } from 'react-native';
import { ImagePicker } from 'expo';
import Icon from "react-native-vector-icons/Ionicons";
import {
  COLOR_PINK, COLOR_PINK_LIGHT,
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM, COLOR_GREEN
}
  from './myColors';
import { Avatar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',

  }



  changeName(text) {
    this.setstate({ username: text }) //How can I immediately set the defaultValue='PassMeIn' to nameNow? Because this method would never be called unless text is changed within TextInput
  }
  ProfileSubmitFunction = () => {


    console.log(this.props.navigation.state.params.key)
  
    fetch('http://100.121.101.233:8000/users/student/'+this.props.navigation.state.params.user+'/', {
      method: 'PUT',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Authorization:  `7419b3f8649566eeee73097184dd4541920af853`,
        Authorization: `Token `+this.props.navigation.state.params.key,

      },
      body:
        JSON.stringify({
          "user": this.props.navigation.state.params.user,
          //"photo": "",
          "full_name":this.state.dataSource.full_name,
          "DOB": this.state.dataSource.DOB,
          "first_sem_percentage": this.state.dataSource.first_sem_percentage,
          "second_sem_percentage": this.state.dataSource.second_sem_percentage,
          "third_sem_percentage": this.state.dataSource.third_sem_percentage,
          "fourth_sem_percentage":this.state.dataSource.fourth_sem_percentage,
          "fifth_sem_percentage": this.state.dataSource.fifth_sem_percentage,
          "sixth_sem_percentage": 75.0,
          "seventh_sem_percentage": 78.0,
          "eighth_sem_percentage": 0.0,
          "branch": this.state.dataSource.branch
        })




    }).then((response) => response.json())
      .then((responseJson) => {

        // If server response message same as Data Matched

        Alert.alert(JSON.stringify(responseJson));

      });


  }
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
    
   // this.state = {date:"2016-05-15"}
  }
 
  componentDidMount() {
    return fetch('http://100.121.101.233:8000/users/student/'+this.props.navigation.state.params.user+'/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          DOB:responseJson.DOB
        }, function () {

        });
        console.log(this.state.DOB);
        

      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'NO-ID');
    const key = navigation.getParam('key', 'NO-ID');
    const username = navigation.getParam('username', 'NO-ID');

console.log("username:"+username+"userid:"+user+"key:"+key)
    
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.up}>
          <Avatar rounded
            source={{
              uri:
                this.state.dataSource.photo,
            }}
            size="large"
            showEditButton


          />
        </View>
        <View style={styles.down}>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>Full Name:</Text>

            <TextInput
              style={{ flex: 1 }}
              value={this.state.dataSource.full_name}
              underlineColorAndroid="transparent"
              onChangeText={(full_name) => { this.setState({ dataSource: { ...this.state.dataSource, full_name: full_name} }) }}

            />

          </View>
          <View style={styles.SectionStyle}>

             <Text style={styles.TextStyle}>DOB:</Text>

             <DatePicker
              style={{ flex: 1 }}
              //style={{width: 200}}
              date={this.state.dataSource.DOB.toString()}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1990/01/01"
              maxDate={new Date().getDate()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ dataSource: { ...this.state.dataSource, DOB: date} }) }}
              
         />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>first_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType='numeric'
              //placeholder={this.state.dataSource.first_sem_percentage}
              underlineColorAndroid="transparent"
              value={this.state.dataSource.first_sem_percentage.toString()}
              //onChange={(value) => { this.setState({ dataSource: { ...this.state.dataSource, first_sem_percentage: value} }) }}
              onChangeText={(first_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, first_sem_percentage: first_sem_percentage} }) }}
            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>second_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="second_sem_percentage"
              value={this.state.dataSource.second_sem_percentage.toString()}
              onChangeText={(second_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, second_sem_percentage: second_sem_percentage} }) }}
              
              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>third_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.third_sem_percentage.toString()}
              onChangeText={(third_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, third_sem_percentage: third_sem_percentage} }) }}
              
              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>fourth_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.fourth_sem_percentage.toString()}
              onChangeText={(fourth_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, fourth_sem_percentage: fourth_sem_percentage} }) }}

              underlineColorAndroid="transparent"

            />

          </View>
          <View style={styles.SectionStyle}>

            <Text style={styles.TextStyle}>fifth_sem_percentage:</Text>

            <TextInput
              style={{ flex: 1 }}
              keyboardType="numeric"
              value={this.state.dataSource.fifth_sem_percentage.toString()}
              onChangeText={(fifth_sem_percentage) => { this.setState({ dataSource: { ...this.state.dataSource, fifth_sem_percentage: fifth_sem_percentage} }) }}

              underlineColorAndroid="transparent"

            />

          </View>
          
          <View style={styles.SectionStyle}>

<Text style={styles.TextStyle}>Branch:</Text>


<Picker
  style={{ flex: 1 }}
  selectedValue={this.state.dataSource.branch}
  //style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({ dataSource: { ...this.state.dataSource, branch: itemValue} }) 
  }>
  <Picker.Item label="Computer Science & Engineering" value="Computer Science & Engineering" />
  <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
  <Picker.Item label="Others" value="Others" />

</Picker>

</View>




        </View>



       
        <TouchableOpacity style={styles.SubmitButton} onPress={this.ProfileSubmitFunction} >
          <Text style={styles.SubmitButtonTitle} >Submit</Text>
        </TouchableOpacity>

      </View>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: COLOR_PINK_LIGHT
  },
  up: {
    flex: 2,
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10
  },

  TextStyle: {
    flexDirection: 'row',
    margin: 0,

    resizeMode: 'stretch',
    alignItems: 'center'

  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  SubmitButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_PINK
  },
  SubmitButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
})