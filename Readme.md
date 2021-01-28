# MQTT in React-Native

Module created for React Native to include Maps in the App (IOS/Android). This is a **Native MQTT Client Module**

# 1. React-Native Project

- Create a new Project from the beggining (1.1-1.2)
- Clone this repository (1.3)

## 1.1. Create a new React-Native Project

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

# Init a new React-Native Project
npx react-native init mqtt
cd mqtt
code .
```

## 1.2. Modify default files

- Delete `./eslintrc.js` file from the top level directory 
- Delete `./App.js` file from the top level directory
- Create a `./src/` folder from the top level directory
- Create a `./src/index.js` file to be the `entrypoint` instead of `App.js` file
- In `./index.js`, modify the following line to match `./src` instead of `./App`

```js
// Modify this:
...
import App from './App';
...

//To match this:
import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

- In `./src/index.js`, create a `funcional` `component` to generate a default `App`

```js
import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

export default function App() {
  return (
  <View />
  );
}
```

## 1.3. Clone this repository and install dependencies

From a terminal with `git cli` installed

```bash
cd $HOME
git clone `https://github.com/roger10cassares/react-native-mqtt.git
mkdir -p $HOME/React-Native`
cd $HOME/React-Native`
yarn

## 1.4. Launch Android Specific Emulator (optional)

Launch the `Android Emulator` installed from `android-studio`

- With the `android-studio` and `Android SDK` correctly installed, launch from an external `Terminal` from anywhere ant type the following command line to start `android-studio`:`


```bash
studio.sh
```

![image-20210113162218535](/home/roger/.config/Typora/typora-user-images/image-20210113162218535.png)



- Then select `Configure --> AVD Manager`

![](/home/roger/.config/Typora/typora-user-images/image-20210113162400453.png)



- The `Andorid Virtual Dvice Manager` shall be opened. The select specific `Android Emulator` version and press the `Play` button under the `Actions` column

![image-20210113162522851](/home/roger/.config/Typora/typora-user-images/image-20210113162522851.png)

- The `Android Emulator` shall boot as the following Picture:

![image-20210113163108775](/home/roger/.config/Typora/typora-user-images/image-20210113163108775.png)



- After the boot, there was a Main Screen Android and the `Android Emulator` is ready to work. 

![image-20210113163511153](/home/roger/.config/Typora/typora-user-images/image-20210113163511153.png)

The command line to check the attached `Android Emulator` device is

```bash
adb devices
----
List of devices attached
emulator-5554	device
```

This list above shows the a device named `emulator-5554` is attached to the `adb devices` list

> *Note: `adb devices` are binded to the `8081` `localhost` port. So anything that attempts to connect at this port or another `Android Emulator` device shall not be run and failed because the port had already been bound to this application.*



## 1.5. Start the React-Native Project App

- Open the terminal inside the `Visual Code IDE` typing `Ctrl + ` `

- Execute the following command to start the `package.json` dependencies and the `App`:

```bash
yarn start
```

- Then, split the terminal and start the default`Android Emulator` installed from `android-studio`:

```bash
yarn react-native run-android
```

At this point, the `Android Emulator` shall be successfully build and the `App` shall be correctly installed with a `blank screen` because there is no component yet inside the `App`.

![image-20210113164721598](/home/roger/.config/Typora/typora-user-images/image-20210113164721598.png)



# 2. React-Native App Development

## 2.1. Import sp-react-native-mqtt and add it to the project

From: https://github.com/SudoPlz/sp-react-native-mqtt

Description: React Native MQTT components for iOS + Android

- To add `react-native-module` in the dependencies of the `package.json` file in the project, go to the top level project directory and `add` the module with `yarn add` command line:

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH/maps

yarn add sp-react-native-mqtt
yarn add underscore
yarn add date-fns
yarn add date-fns-tz
```

## 2.2. Check App Permissions in AndroidManifest.xml file

- For Android: check the following line in `./android/app/src/main/AndroidManifest.xml`

```
<uses-permission android:name="android.permission.INTERNET" />
```

## 2.3. Write the Main Code

Finally, in `./src/index.js`, write the main code:

```js
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
```

In `./src/realtimeManager.js`. write 

```js
import MQTT from 'sp-react-native-mqtt';
import _ from 'underscore';

// import DeviceInfo from 'react-native-device-info';
import { addHours, isAfter, isBefore, formatDistance, format, formatRelative, parseISO, subDays  } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz';


// import pt from '../node_modules/date-fns/locale/pt-BR';


var timestamp = Number(new Date());
var znDate = format(
                      new Date(),
                      'dd/MM/yyyy HH:mm',
                      {
                        timeZone: 'America/Sao_Paulo',
                      }
                    );

module.exports = {
  
  props: null,
 
  randIdCreator() {
    const S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    return `${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}${S4()}`;
  },

  subscriber(subscriberProps = {}) {
    if (subscriberProps) {
      this.subProps = subscriberProps;
    }
  },

  publisher(publisherProps = {}) {
    if (publisherProps) {
      this.pubProps = publisherProps;
    }
  },

  create(connectionProps = {}) {
    if (connectionProps) {
      this.onConnectionOpened = this.onConnectionOpened.bind(this);
      this.onConnectionClosed = this.onConnectionClosed.bind(this);
      this.onError = this.onError.bind(this);
      this.onMessageArrived = this.onMessageArrived.bind(this);
      this.disconnect = this.disconnect.bind(this);

      const clientId = this.randIdCreator()
        .replace(/[^a-zA-Z0-9]+/g, '');

      this.conProps = _.extend({
        clientId: `clientId-${clientId}`,
        timestamp: timestamp,
        znDate: znDate,
      }, connectionProps);


      this.data_payload = {};


      /* create mqtt client */
      MQTT.createClient(this.conProps)
        .then((client) => {
          this.client = client;
          client.on('closed', this.onConnectionClosed);
          client.on('error', this.onError);
          client.on('message', this.onMessageArrived);
          client.on('connect', this.onConnectionOpened); // Subscribe


          client.connect();

        }).catch((err) => {
          console.error(`MQTT.createClient error: ${err}`);
        });
    }
  },

  disconnect() {
    if (this.client) {
      console.log('Now killing open realtime connection.');
      this.client.disconnect();
    }
  },

  onError(error) {
    console.error(`MQTT onError: ${error}`);
  },

  onConnectionOpened() {
    // subscribe to the client topic
    this.client.subscribe(this.conProps.topic, this.subProps.qos);
    console.log('MQTT onConnectionOpened');
  },

  onConnectionClosed(err) {
    console.log(`MQTT onConnectionClosed ${err}`);
  },

  onMessageArrived(message) {
    if (message) {
      console.log(`MQTT New message: ${JSON.stringify(message)}`);
      console.log(`data_payload before receiveing message: ${JSON.stringify(this.data_payload)}`)
      this.data_payload = message;
      console.log(`data_payload after receiveing message: ${JSON.stringify(this.data_payload)}`)

    }
  },

  onPublish(topic, payload, qos, retain) {
    this.client.publish(
      this.pubProps.topic,
      this.pubProps.payload,
      this.pubProps.qos,
      this.pubProps.retain
      );
  },




};


```

When the code above is saved, the `App` shall be modified according to this file. 

Note: When a new dependency is installed, the installed `App` in `Android Emulator` must me removed by `uninstalling` it and `reinstalled` again with the command

```bash
yarn react-native run-android
```



## 2.5. View the App in the Emulator

The `App` described above shalls look like the Picture bellow:

![image-20210115142640107](/home/roger/.config/Typora/typora-user-images/image-20210115142640107.png)



## 2.6. Deploy the App to Realease and Genarate APK file

From: https://reactnative.dev/docs/signed-apk-android

### 2.6.1.  Generating an upload key

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd mqtt

keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2.6.2. Setting up Gradle variables

- Place the `my-upload-key.keystore` file under the `./android/app` directory in the project folder.

```bash
mv my-upload-key.keystore ./android/app/
```

- Edit the file `./android/gradle.properties` and add the following lines  (replace `*****` with the correct `keystore password`, `alias` and `key password`),

```bash
# Add my-upload-key.keystore file, upload_store_password and upload_key_password
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

### 2.6.3. Adding signing configuration to the App's Gradle configuration

- The last configuration step that needs to be done is to setup release builds to be signed using `upload key`. Edit the file `./android/app/build.gradle` in the project folder, and add the `signing config`:

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
           ...
            signingConfig signingConfigs.release
        }
    }
}
...
```



### 2.6.4. Generating the release APK

Run the following in any  Terminal:

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps/android
./gradlew bundleRelease
```



### 2.6.5. Testing the release build of the App

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd mqtt
yarn react-native run-android --variant=release
```



### 2.6.6. APK Released File Location

The generated `APK` file for the release from the App shall be located at:

````bash
$HOME/React-Native/React-Native/maps/android/app/build/outputs/apk/release/app-release.apk
````







realtimeManager.js

```js
  onConnectionOpened() {
    // subscribe to the client channel
    this.client.subscribe(this.conProps.channelToUse, this.QOS);

    console.log('MQTT onConnectionOpened');
    console.log(`MQTT client: ${JSON.stringify(this.client)}`);

  },
```

client object returns:

```json
{
    "options":
    {
        "clientId":"realtime.bob.random .. 38239efad6c64dfcf3e39e3bf2c59ccdde3",
        "channelToUse":"teste",
        "auth":false,
        "clean":true,
        "uri":"mqtt://10.33.133.136:1883",
        "port":1883,
        "host":"10.33.133.136",
        "protocol":"tcp"
    },
    "clientRef":"80aae741-04b9-479c-9d6f-a7ef82ee2c3c",
    "eventHandler":{}
}
```



props object returns:

```json
{
 "clientId":"realtime.roger.random046953 .. ef0e0746b",
 "channelToUse":"smartcampus/roger",
 "auth":false,
 "clean":true,
 "uri":"mqtt://10.33.133.136:1883",
 "port":1883,
 "host":"10.33.133.136",
 "protocol":"tcp"
}


```





client object returns:

```json
{
    "options":
    	"props",
    	"clientRef":"80aae741-04b9-479c-9d6f-a7ef82ee2c3c",
    	"eventHandler":{}
}
```



realtimeManager.js conProps

```js
{
    "clientId":"clientId-fecb9bc7ad23bf2b316790afe94d5c5b",
        "timestamp":1611773999146,
        "znDate":"27/01/2021 15:59",
        "uri":"mqtt://smartcampus.maua.br:1883",
        "topic":"smartcampus/pub",
        "auth":true,
        "user":"PUBLIC",
        "pass":"public",
        "clean":true,
        "port":1883,
        "host":"smartcampus.maua.br",
		"protocol":"tcp"
}
```







module.exports when message is arrived

```js
Module.export arrived: 
{
    "props":null,
    "conProps":{
        "clientId":"clientId-a92229717278fdfb6159876b625960a9",
        "znDate":"27/01/2021 10:39",
        "uri":"mqtt://smartcampus.maua.br:1883",
        "topic":"smartcampus/pub",
        "auth":true,
        "user":"PUBLIC",
        "pass":"public",
        "clean":true,
        "port":1883,
        "host":"smartcampus.maua.br",
        "protocol":"tcp"
    },
    "subProps":{
    	"topic":"smartcampus/pub",
    	"qos":0
    },
    "pubProps":{
        "topic":"smartcampus/pub",
        "payload":"Message from the App",
        "qos":0,
        "retain":false
    },
    "client":{
    	"options":{
            "clientId":"clientId-a92229717278fdfb6159876b625960a9",
            "znDate":"27/01/2021 10:39",
            "uri":"mqtt://smartcampus.maua.br:1883",
            "topic":"smartcampus/pub",
            "auth":true,
            "user":"PUBLIC",
            "pass":"public",
            "clean":true,
            "port":1883,
            "host":"smartcampus.maua.br",
            "protocol":"tcp"
        },
        "clientRef":"4ca6dcda-8876-4364-8027-a1e21199e07f",
        "eventHandler":{}
    }
}
```





