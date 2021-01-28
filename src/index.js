import React, {Component} from 'react';
// import * as React from 'react';

import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  MqttManager  from './realtimeManager';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// init realtime
MqttManager.create(
  {
    uri: 'mqtt://smartcampus.maua.br:1883',
    topic: `smartcampus/app`,
    auth: true,
    user: 'PUBLIC',
    pass: 'public',
    clean: true,
  },
);

MqttManager.subscriber(
  {
    topic: `smartcampus/app`,
    qos: 0,
  },
);


MqttManager.publisher(
  {
    topic: `smartcampus/app`, 
    payload: `Message App`, 
    qos: 0, 
    retain: false,
  }
);




class MqttPubMessage extends Component {

  // Set State constructor with initial values
  constructor (constructorProps) {
    super(constructorProps)
    this.state = {
      mqtt_pub_message_state: '',
      mqtt_sub_message_state: ''
    }
  }

  // Handle this.state properties in the correct way
  // When handleChangeInput function is called, then the value of 
  // onChangeText property is passed here over text and this parameter 
  // could be passed to this.state.mqtt_pub_message_state
  handleChangeInput = (text) => {
    this.setState({ mqtt_pub_message_state: text });
  }

  render() {
    const { mqtt_pub_message_state } = this.state
    console.log(`mqtt_pub_message_state: ${mqtt_pub_message_state}`);

    return (
      <>
        <TextInput
            style={ styles.pubMessageTextInput }
            onChangeText={ this.handleChangeInput }
        />
        <TouchableOpacity
          style={ styles.pubMessageTextButtonStyle }
          underlayColor='#F5FCFF'
          onPress={() => MqttManager.onPublish()}
          >
          <Text style={ styles.pubMessageTextButtonText }>MQTT PUBLISH</Text>
        </TouchableOpacity>
      </>
    );
  }
}

class MqttSubMessage extends Component {
  render(){
    return (
      <>
        <Text style={ styles.subMessageTextInput }>Mqtt Sub payload: { MqttManager.data_payload.data }</Text>
      </>
    );
  }
}

// type Props = {};

// export default class App extends React.Component<Props> {
export default class App extends Component {
// class App extends React.Component <Props, State> {
  // props: Props;
  render() {
    return (
      <View style={ styles.container }>
        <MqttSubMessage  />
        <MqttPubMessage  />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  pubMessageTextInput: { 
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  },

  pubMessageTextButtonStyle: {
    alignItems: "center",
    backgroundColor: "#004686",
    padding: 10,
    width: 300,
  },

  pubMessageTextButtonText: {
    color: 'white',
  },

  subMessageTextInput: { 
    height: 40,
    width: 300,
  },

});