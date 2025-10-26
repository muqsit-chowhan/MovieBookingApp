import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/Dashboard';
import HomeScreen from '../screens/Home';
import MediaLibraryScreen from '../screens/MediaLibrary';
import MoreScreen from '../screens/More';
// import MovieDetailScreen from '../screens/MovieDetail';
import { Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
    watchActive,
    watchNonActive,
    dashBoardActive,
    dashBoardNonActive,
    mediaActive,
    mediaNonActive,
    moreActive,
    moreNonActive
} from '../assets/svg';
import { Colors } from '../constants/colors';
import MovieDetail from '../screens/MovieDetail';
import GenreMovies from '../screens/GenereMovies';
import MovieBooking from '../screens/Booking';
import Selection from '../screens/Selection';

export type RootTabParamList = {
    Dashboard: undefined;
    Watch: undefined;
    'Media Library': undefined;
    More: undefined;
    GenreMovies: undefined,
    MovieBooking: undefined
    Selection: undefined

};

export type RootStackParamList = {
    MainTabs: undefined;
    MovieDetail: { movieId: number };
    GenreMovies: { genreId: number, genreName: string };
    MovieBooking: { name: string, date: string }
    Selection: { name: string, date: string }
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs: React.FC = () => (
    <Tab.Navigator
        initialRouteName="Watch"
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: true,
            tabBarStyle: {
                borderTopWidth: 0,
                borderRadius: 25,
                elevation: 10,
                height: 80,
                paddingBottom: 10,
                // justifyContent:'center',
                paddingTop: 10,
                backgroundColor: Colors.primaryNaviagtor,
            },
            tabBarLabel: ({ focused, color }) => (
                <Text
                    style={{
                        color: color,
                        fontSize: 10,
                        fontWeight: focused ? '700' : '400'
                    }}
                >
                    {route.name}
                </Text>
            ),
            tabBarIcon: ({ focused }) => {
                let iconXml = focused ? dashBoardActive : dashBoardNonActive;
                if (route.name === 'Watch') iconXml = focused ? watchActive : watchNonActive;
                else if (route.name === 'Media Library') iconXml = focused ? mediaActive : mediaNonActive;
                else if (route.name === 'More') iconXml = focused ? moreActive : moreNonActive;

                return <SvgXml xml={iconXml} width={focused ? 18 : 16} height={focused ? 18 : 16} />;
            },
            tabBarActiveTintColor: Colors.textPrimary,
            tabBarInactiveTintColor: Colors.textSecondary,
        })}
    >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Watch" component={HomeScreen} />
        <Tab.Screen name="Media Library" component={MediaLibraryScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
        {/* <Tab.Screen name="MovieBooking" component={MovieBooking} /> */}
    </Tab.Navigator>
);

const AppNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="MovieDetail" component={MovieDetail} />
            <Stack.Screen
                name="GenreMovies"
                component={GenreMovies}
            />
            <Stack.Screen name="MovieBooking" component={MovieBooking} />
            <Stack.Screen name="Selection" component={Selection} />

        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
