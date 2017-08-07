import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  
  componentDidMount(){
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if(origin === 'received' && text){
        Alert.alert(
        'New Push Notification',
        text,
        [{ text: 'Ok.'}]
      );
      } 
    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        },
        {
          tabBarPosition: 'bottom',        
          lazy: true,
          tabBarOptions: {
            showIcon: true,
            labelStyle: { fontSize: 12 },
            iconStyle: {
              width: 30,
              height: 30
            }
          }
        })
      }
    },
    {
      tabBarPosition: 'bottom',
      lazy: true,
      navigationOptions:{
        tabBarVisible: false,
        animationEnabled: false,
        swipeEnabled: false
      }, 
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,//Platform.OS === 'android' ? 24 : 0, //Expo.Constants.statusBarHeight : undefined,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
