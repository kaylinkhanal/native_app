//StudentRegister
import React from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';

import Wizard from './wizard/Wizard';
import Input from './wizard/Input';

export default  class StudentRegister extends React.Component{

  
  render() {
    var forms = [
      {
        placeholder: 'Username here...',
        name: 'username',

      },
      {
        placeholder: 'Email here...',
        name: 'email',
      },
      {
        placeholder: 'Password1...',
        name: 'password1',
      },
      {
        placeholder: 'Password2...',
        name: 'password2',
      },
    ];
    // var wizardstep=[
    //   {
    //     name:'Personal Details'
    //   },
    //   {
    //     name:'Academic Details'
    //   },
    //   {
    //     name:'Account Step'
    //   },
    //   {
    //     name:'Profile Picture'
    //   }
    // ]
    
    return (
      <View style={styles.root}>
        <Wizard
          initialValues={{
            username: '',
            email: '',
            password1: '',
            password2: '',

          }}
        >
            {forms.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                  <Input
                    onChangeValue={onChangeValue}
                    placeholder={el.placeholder}
                    value={values[el.name]}
                    name={el.name}
                  />
                </View>
              )}
            </Wizard.Step>
          ))}
        </Wizard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});