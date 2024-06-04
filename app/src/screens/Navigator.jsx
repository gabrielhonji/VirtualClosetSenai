import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Box } from '@gluestack-ui/themed';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import Login from './Login';
import Sign from './Sign';
import ResetLogin from './ResetLogin';
import Add from './Add';
import Closet from './Closet';
import RandFit from './RandFit';

export function HomeNavigator({ navigation, route }) {
   // const teste = route.params.obj;
    
    return (
        <Box bg='#1E1716' h='100%'>
            <Tab.Navigator backBehavior='history' initialRouteName='Add' screenOptions={({route}) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let iconSize;
                    let iconColor;

                    if (route.name === 'Closet') {
                        iconName = focused
                        ? 'grid' : 'grid-outline' ;
                    } else if (route.name === 'RandFit') {
                        iconName = focused
                        ? 'shirt' : 'shirt-outline' ;
                    } else if (route.name === 'Add') {
                        iconName = focused
                        ? 'add-circle' : 'add' ;
                    }

                    iconSize = focused
                        ? 30 : 24 ;
                    iconColor = focused
                        ? '#F5F0F6' : '#8f8f8f';

                return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
            
                },
                headerShown: false,
                tabBarShowLabel: false,
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
                    borderTopWidth: 0,
                }
            })}>
                <Tab.Screen name="Closet" component={Closet} />
                <Tab.Screen name="Add" component={Add} />
            </Tab.Navigator>
        </Box>
    );
}

export default function StartNavigator({ navigation }) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeNavigator}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Sign" component={Sign}/>
                <Stack.Screen name="ResetLogin" component={ResetLogin}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}