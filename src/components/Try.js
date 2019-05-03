import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class Try extends Component{
    render(){
    return this.props.namelists.map((namelist)=>{

    <Text>{namelist.title}</Text>
console.log('Contributiontest');
    });
    }
    }

