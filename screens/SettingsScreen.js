import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component{
    static navigationOptions ={
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => {
                return <Icon name='settings' size={30} color={ tintColor } />;
            }        
        }
    render(){
        return(
            <View>
                <Button
                    title = 'Reset Liked Jobs'
                    large
                    icon={{ name: 'delete-forever' }}
                    backgroundColor='#F44336'
                    onPress = { this.props.clearLikedJobs }
                />
            </View>
        );
    }
}

export default connect(null, { clearLikedJobs }) (SettingsScreen);
