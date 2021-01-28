// import React, {Component} from 'react';
import * as React from 'react';

import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import  MqttManager  from './realtimeManager';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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




type Props = {};


export default class App extends React.Component<Props> {
// class App extends React.Component <Props, State> {
  props: Props;

  constructor (constructorProps) {
    super(constructorProps)
    this.state = {
      mqtt_pub_message_state: '',
      mqtt_sub_message_state: ''
    }
  }

  handleChangeInput = (text) => {
    this.setState({ mqtt_pub_message_state: text })
  }

  render() {
          // console.log(` Props: ${JSON.stringify(this.props)}`);
    const { mqtt_pub_message_state } = this.state
    console.log(`mqtt_pub_message_state: ${mqtt_pub_message_state}`);

    return (

      <View style={styles.container}>
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this.handleChangeInput}
          value={mqtt_pub_message_state}
        />
        {/* <Text style={styles.welcome}>Welcome to React Native!</Text> */}
        {/* <Text style={styles.instructions}>To get started, edit App.js</Text> */}
        <Text style={styles.instructions}>A: {MqttManager.data_payload.data}</Text>
        <Button
          title="Press me"
          color="#004686"
          onPress={() => MqttManager.onPublish()}
        />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});