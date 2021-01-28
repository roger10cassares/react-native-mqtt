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

