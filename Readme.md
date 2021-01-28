# MQTT in React-Native

Module created for React Native to include Maps in the App (IOS/Android). This is a **Native MQTT Client Module**

# 1. Initialize a new React-Native Project

## 1.1. Create a new React-Native Project

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
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

## 1.3. Launch Android Specific Emulator (optional)

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



## 1.4. Start the React-Native Project App

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
#yarn add react-native-device-info
yarn add date-fns
yarn add date-fns-tz
# yarn add intl
```

## 2.2. Check App Permissions in AndroidManifest.xml file

- For Android: check the following line in `./android/app/src/main/AndroidManifest.xml`

```
<uses-permission android:name="android.permission.INTERNET" />
```

## 2.3. Specify Google Maps API Key

- For React-Native 0.6+, specify your Google Maps API Key:

  Add your API key to your manifest file (./`android/app/src/main/AndroidManifest.xml`):

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
  
   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
</application>
```

> *Note: As shown above, `com.google.android.geo.API_KEY` is the recommended metadata name for the API key. A key with this name can be used to authenticate to multiple Google Maps-based APIs on the Android platform, including the Google Maps Android API. For backwards compatibility, the API also supports the name `com.google.android.maps.v2.API_KEY`. This legacy name allows authentication to the Android Maps API v2 only. An application can specify only one of the API key metadata names. If both are specified, the API throws an exception.*
>
> *Source: https://developers.google.com/maps/documentation/android-api/signup*

## 2.4. Write the Main Code

Finally, in `./src/index.js`, write the main code:

```js
import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';

import MapView from 'react-native-maps';

const { height, width } = Dimensions.get('window');


class App extends Component {

  state = {
    places: [
      {
        id: 1,
        title: 'IMT',
        description: 'Instituto Maua de Tecnologia',
        latitude: -23.648009025453263, 
        longitude: -46.574244995456134,
      },
      {
        id: 2,
        title: 'Daimon',
        description: 'Daimon, especialistas em energia',
        latitude: -23.55986282115463, 
        longitude: -46.65701059902382
      },
      {
        id: 3,
        title: 'AVL',
        description: 'AVL South America',
        latitude: -23.47134054444347,
        longitude: -46.45401782636043
      }
    ],
  };

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  };


  render() {

    // Set to latitude and longitude the values from state.places[]
    const { latitude, longitude } = this.state.places[0];

    return (
      <View style={styles.container}>
        <MapView 
          ref={map => this.mapView = map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231,
          }} 
          style={styles.mapView}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          onMapReady={this._mapReady}
          >
          { this.state.places.map(place => (
            <MapView.Marker
            ref={mark => place.mark = mark}
            title={place.title}
            description={place.description}
            key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
            />
          )) }
        </MapView>
        <ScrollView
          style={styles.placesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={e => {
            const scrolled = e.nativeEvent.contentOffset.x;

            const place = (scrolled > 0)
              ? parseInt((scrolled / Dimensions.get('window').width) + 1)
              : 0;
            
            const { latitude, longitude, mark } = this.state.places[place];

            this.mapView.animateCamera({
                center: {
                  latitude,
                  longitude,
                },
                pitch: 2,
                heading: 10,
              }, 
              { 
                duration: 1000 
              }
            );

            setTimeout(() => {
              mark.showCallout();
            }, 1000);

          }}
          >
          { this.state.places.map(place => (
            <View key={place.id} style={styles.place}>
              <Text>{place.title}</Text>
              <Text>{place.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },

  place: {
    width: width -40,
    maxHeight: 200,
    backgroundColor: '#FFF',
    marginHorizontal: 20,

  }

})


export default App;
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
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps

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
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps/android
./gradlew bundleRelease
```



### 2.6.5. Testing the release build of the App

```bash
export REACT_NATIVE_PROJECTS_PATH=$HOME/RCP/RCP-Linux/React-Native/
cd $REACT_NATIVE_PROJECTS_PATH

cd maps
yarn react-native run-android --variant=release
```



### 2.6.6. APK Released File Location

The generated `APK` file for the release from the App shall be located at:

````bash
/home/roger/RCP/RCP-Linux/React-Native/maps/android/app/build/outputs/apk/release/app-release.apk
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





