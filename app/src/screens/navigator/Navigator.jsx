import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './Styles.jsx';
import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Login from '../login/Login';

export function Test() {
    return (
        <Progress value={10} w={300} size="md">
            <ProgressFilledTrack />
        </Progress>
    );
}

export function HomeNavigator() {
    return (
        <Tab.Navigator backBehavior='history' initialRouteName='Test' screenOptions={({route}) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#F5F0F6',
            tabBarActiveBackgroundColor: '#654E4D',
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {
                borderRadius: 10,
                margin: 10,
            },
            tabBarStyle: {
                backgroundColor: '#2D2221',
                borderRadius: 10,
                marginHorizontal: 10,
                marginBottom: 20,
                height: 70,
            },
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                iconName = focused
            }
            })}>
            <Tab.Screen name="Test1" component={Test} />
            <Tab.Screen name="Test2" component={Test} />
            <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
    );
}

export default function StartNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeNavigator' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeNavigator" component={HomeNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}