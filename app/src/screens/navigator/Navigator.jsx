import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Progress, ProgressFilledTrack } from '@gluestack-ui/themed';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function Add() {
    return (
        <Progress value={100} w={300} size="md">
            <ProgressFilledTrack />
        </Progress>
    );
}

export function HomeNavigator() {
    return (
        <Tab.Navigator backBehavior='history' initialRouteName='Add' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Add" component={Add} />
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