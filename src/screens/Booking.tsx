//works

// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     StatusBar,
// } from 'react-native';
// import { SvgXml } from 'react-native-svg';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import Header from '../components/Header';
// import { seats } from '../assets/svg';

// type RootStackParamList = {
//     MovieBooking: {
//         title: string;
//         releaseDate: string;
//         poster?: string;
//         backdrop?: string;
//         genre?: string;
//         rating?: number;
//         overview?: string;
//     };
// };

// type MovieBookingRouteProp = RouteProp<RootStackParamList, 'MovieBooking'>;

// const MovieBooking = () => {
//     const route = useRoute<MovieBookingRouteProp>();
//     const { title, releaseDate } = route.params;




//     const [selectedDate, setSelectedDate] = useState('25 Oct');
//     const [selectedShowtime, setSelectedShowtime] = useState<number | null>(0);

//     const dates = [
//         { day: '25 Oct', date: '25 Oct' },
//         { day: '26 Oct', date: '26 Oct' },
//         { day: '27 Oct', date: '27 Oct' },
//         { day: '28 Oct', date: '28 Oct' },
//         { day: '29 Oct', date: '29 Oct' }
//     ];

//     const showtimes = [
//         {
//             time: '12:30',
//             theater: 'Cinetech + Hall 1',
//             price: 'From 50$ or 2500 bonus',
//         },
//         {
//             time: '13:30',
//             theater: 'Cinetech + Hall 2',
//             price: 'From 75$ or 3000 bonus',
//         },
//         {
//             time: '15:00',
//             theater: 'Cinetech + Hall 3',
//             price: 'From 90$ or 3500 bonus',
//         },
//     ];
//     const navigation = useNavigation()

//     return (
//         <>
//             <SafeAreaView style={styles.container}>

//                 {/* Header */}
//                 <Header
//                     title={title}
//                     releaseDate={releaseDate}
//                     onBack={() => navigation.goBack()}
//                 />
//                 {/* Date Selector */}
//                 <View style={styles.dateSection}>
//                     <Text style={styles.sectionTitle}>Date</Text>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         contentContainerStyle={styles.dateScroll}
//                     >
//                         {dates.map((item, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[
//                                     styles.dateItem,
//                                     selectedDate === item.date && styles.dateItemActive,
//                                 ]}
//                                 onPress={() => setSelectedDate(item.date)}
//                             >
//                                 <Text
//                                     style={[
//                                         styles.dateText,
//                                         selectedDate === item.date && styles.dateTextActive,
//                                     ]}
//                                 >
//                                     {item.day}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>

//                 {/* Seat Container Selection (Scrollable Row) */}
//                 <View style={styles.showtimeSection}>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         contentContainerStyle={styles.showtimeScroll}
//                     >
//                         {showtimes.map((showtime, index) => {
//                             // Extract numeric values dynamically
//                             const priceMatch = showtime.price.match(/From\s*(\d+)\$\s*or\s*(\d+)\s*bonus/i);
//                             const price = priceMatch ? priceMatch[1] : '';
//                             const bonus = priceMatch ? priceMatch[2] : '';

//                             return (
//                                 <View key={index} style={styles.showtimeWrapper}>
//                                     {/* Time + Hall ABOVE card */}
//                                     <View style={styles.showtimeHeader}>
//                                         <Text style={styles.showtimeTime}>{showtime.time}</Text>
//                                         <Text style={styles.theater}>{showtime.theater}</Text>
//                                     </View>

//                                     {/* Seat container */}
//                                     <TouchableOpacity
//                                         activeOpacity={0.9}
//                                         style={[
//                                             styles.showtimeCard,
//                                             selectedShowtime === index && styles.showtimeCardActive,
//                                         ]}
//                                         onPress={() => setSelectedShowtime(index)}
//                                     >
//                                         <View style={styles.seatImageWrapper}>
//                                             <SvgXml xml={seats} width={200} height={150} />
//                                         </View>
//                                     </TouchableOpacity>

//                                     {/* Price Line */}
//                                     <Text style={styles.price}>
//                                         From <Text style={styles.boldText}>{price}$</Text> or{' '}
//                                         <Text style={styles.boldText}>{bonus} bonus</Text>
//                                     </Text>
//                                 </View>
//                             );
//                         })}

//                     </ScrollView>
//                 </View>


//                 {/* Select Seats Button */}

//             </SafeAreaView>
//             <TouchableOpacity style={styles.selectSeatsButton} onPress={() => navigation.navigate('Selection', { title, releaseDate })}
//             >
//                 <Text style={styles.selectSeatsText}>Select Seats</Text>
//             </TouchableOpacity>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#EFEFEF',
//         // top: 30 
//     },
//     header: {
//         paddingTop: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative',
//         backgroundColor: '#fff'
//     },
//     backButton: {
//         position: 'absolute',
//         left: 20,
//     },
//     backText: {
//         fontSize: 22,
//         color: '#000',
//     },
//     movieTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#1A1A1A',
//     },
//     subHeader: {
//         textAlign: 'center',
//         color: '#58A9FF',
//         marginTop: 4,
//         marginBottom: 20,
//     },
//     dateSection: {
//         paddingHorizontal: 20, marginTop: 80,
//     },

//     sectionTitle: {
//         fontSize: 17,
//         fontWeight: '700',
//         color: '#1A1A1A',
//         marginBottom: 12,
//     },
//     dateScroll: {
//         flexDirection: 'row',
//         paddingVertical:12
//     },
//     dateItem: {
//         backgroundColor: '#A6A6A61A',
//         borderRadius: 14,
//         paddingHorizontal: 20,
//         paddingVertical: 12,
//         marginRight: 10,
//     },
//     // dateItemActive: {
//     //     backgroundColor: '#61C3F2',
//     // },
//     dateItemActive: {
//         backgroundColor: '#61C3F2',
//         shadowColor: '#23AAEB',         // bright cyan-blue glow
//         shadowOpacity: 0.18,
//         shadowOffset: { width: 5, height: 5 }, // no directional offset
//         shadowRadius: 12,               // more blur = softer shadow (iOS)
//         elevation: 12,                  // stronger glow on Android
//         // borderWidth: 1,
//         borderColor: '#23AAEB80',       // subtle border to match glow
//       },



//     dateText: {
//         color: '#1A1A1A',
//         fontWeight: '700',
//         fontSize: 14
//     },
//     dateTextActive: {
//         color: '#fff',
//     },
//     showtimeWrapper: {
//         marginRight: 20,
//     },
//     // showtimeSection: {
//     //     marginTop: 20,
//     //     // width:'100%'
//     // },
//     // showtimeScroll: {
//     //     paddingHorizontal: 20,
//     //     flexDirection: 'row',
//     //     alignItems: 'center',

//     // },
//     // showtimeCard: {
//     //     backgroundColor: '#F9FAFB',
//     //     borderRadius: 16,
//     //     padding: 16,
//     //     width: 249,
//     //     height: 145,
//     //     marginRight: 16,
//     //     borderWidth: 1,
//     //     borderColor: '#E5E7EB',
//     //     alignItems: 'center',
//     // },
//     // showtimeCardActive: {
//     //     borderColor: '#58A9FF',
//     //     shadowColor: '#58A9FF',
//     //     shadowOpacity: 0.15,
//     //     shadowOffset: { width: 0, height: 2 },
//     //     shadowRadius: 6,
//     // },
//     // showtimeTime: {
//     //     fontSize: 16,
//     //     fontWeight: '600',
//     //     color: '#1A1A1A',
//     //     marginBottom: 2,
//     // },
//     // theater: {
//     //     fontSize: 12,
//     //     color: '#6B7280',
//     //     marginBottom: 8,
//     // },
//     // seatImageWrapper: {
//     //     alignItems: 'center',
//     //     marginVertical: 6,
//     // },
//     // price: {
//     //     textAlign: 'center',
//     //     color: '#1A1A1A',
//     //     fontWeight: '500',
//     //     fontSize: 12,
//     //     marginTop: 4,
//     // },
//     selectSeatsButton: {
//         backgroundColor: '#61C3F2',
//         marginHorizontal: 20,
//         marginVertical: 30,
//         paddingVertical: 16,
//         borderRadius: 14,
//         height: 60,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     selectSeatsText: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#fff',
//     },

//     showtimeSection: {
//         marginTop: 16,
//         // backgroundColor: '#F8F9FC',
//         paddingVertical: 10,
//     },
//     showtimeScroll: {
//         paddingHorizontal: 16,
//         flexDirection: 'row',
//     },
//     showtimeCard: {
//         backgroundColor: '#FFFFFF',
//         borderRadius: 16,
//         // paddingVertical: 16,
//         // paddingHorizontal: 14,
//         justifyContent: 'center',
//         marginRight: 16,
//         width: 300,
//         height: 190,
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowOffset: { width: 0, height: 1 },
//         shadowRadius: 3,
//         elevation: 1,
//         alignItems: 'center',
//     },
//     showtimeCardActive: {
//         borderColor: '#58A9FF',
//         shadowColor: '#58A9FF',
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//     },
//     showtimeHeader: {
//         alignSelf: 'flex-start',
//         marginBottom: 10,
//         flexDirection: 'row'
//     },
//     showtimeTime: {
//         // fontFamily: Fonts.semiBold,
//         fontWeight: '600',
//         fontSize: 14,
//         color: '#1A1A1A',
//     },
//     theater: {
//         // fontFamily: Fonts.regular,
//         fontWeight: '400',
//         fontSize: 14,
//         color: '#8F8F8F',
//         // marginTop: 2,
//         left: 10
//     },
//     seatImageWrapper: {
//         marginVertical: 4,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     price: {
//         // fontFamily: Fonts.regular,
//         fontWeight: '500',
//         fontSize: 12,
//         color: '#827D88',
//         marginTop: 8,
//     },
//     boldText: {
//         // fontFamily: Fonts.semiBold,
//         fontWeight: 'bold',
//         fontSize: 14,
//         color: '#2E2739',
//     },



// });

// export default MovieBooking;
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import {
    RouteProp,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';
import { seats } from '../assets/svg';
import { DATES, SHOWTIMES } from '../constants/bookingData';


export type RootStackParamList = {
    MovieBooking: {
        title: string;
        releaseDate: string;
        poster?: string;
        backdrop?: string;
        genre?: string;
        rating?: number;
        overview?: string;
    };
    Selection: {
        title: string;
        releaseDate: string;
    };
};


type MovieBookingRouteProp = RouteProp<RootStackParamList, 'MovieBooking'>;
type MovieBookingNavigationProp = StackNavigationProp<
    RootStackParamList,
    'MovieBooking'
>;

const MovieBooking: React.FC = () => {
    const navigation = useNavigation<MovieBookingNavigationProp>();
    const route = useRoute<MovieBookingRouteProp>();
    const { title, releaseDate } = route.params;

    const [selectedDate, setSelectedDate] = useState<string>('25 Oct');
    const [selectedShowtime, setSelectedShowtime] = useState<number | null>(0);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header
                    title={title}
                    releaseDate={releaseDate}
                    onBack={() => navigation.goBack()}
                />
                <View style={styles.dateSection}>
                    <Text style={styles.sectionTitle}>Date</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateScroll}
                    >
                        {DATES.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dateItem,
                                    selectedDate === item.date && styles.dateItemActive,
                                ]}
                                onPress={() => setSelectedDate(item.date)}
                            >
                                <Text
                                    style={[
                                        styles.dateText,
                                        selectedDate === item.date && styles.dateTextActive,
                                    ]}
                                >
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.showtimeSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.showtimeScroll}
                    >
                        {SHOWTIMES.map((showtime, index) => {
                            const priceMatch = showtime.price.match(
                                /From\s*(\d+)\$\s*or\s*(\d+)\s*bonus/i
                            );
                            const price = priceMatch ? priceMatch[1] : '';
                            const bonus = priceMatch ? priceMatch[2] : '';

                            return (
                                <View key={index} style={styles.showtimeWrapper}>
                                    {/* Time + Theater Above Card */}
                                    <View style={styles.showtimeHeader}>
                                        <Text style={styles.showtimeTime}>{showtime.time}</Text>
                                        <Text style={styles.theater}>{showtime.theater}</Text>
                                    </View>

                                    {/* Seat container */}
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        style={[
                                            styles.showtimeCard,
                                            selectedShowtime === index && styles.showtimeCardActive,
                                        ]}
                                        onPress={() => setSelectedShowtime(index)}
                                    >
                                        <View style={styles.seatImageWrapper}>
                                            <SvgXml xml={seats} width={200} height={150} />
                                        </View>
                                    </TouchableOpacity>

                                    {/* Price Line */}
                                    <Text style={styles.price}>
                                        From <Text style={styles.boldText}>{price}$</Text> or{' '}
                                        <Text style={styles.boldText}>{bonus} bonus</Text>
                                    </Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </SafeAreaView>
            <TouchableOpacity
                style={styles.selectSeatsButton}
                onPress={() =>
                    navigation.navigate('Selection', {
                        title,
                        releaseDate,
                    })
                }
            >
                <Text style={styles.selectSeatsText}>Select Seats</Text>
            </TouchableOpacity>
        </>
    );
};

export default MovieBooking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    dateSection: {
        paddingHorizontal: 20,
        marginTop: 80,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    dateScroll: {
        flexDirection: 'row',
        paddingVertical: 12,
    },
    dateItem: {
        backgroundColor: '#A6A6A61A',
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginRight: 10,
    },
    dateItemActive: {
        backgroundColor: '#61C3F2',
        shadowColor: '#23AAEB',
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 12,
        elevation: 12,
        borderColor: '#23AAEB80',
    },
    dateText: {
        color: '#1A1A1A',
        fontWeight: '700',
        fontSize: 14,
    },
    dateTextActive: {
        color: '#fff',
    },
    showtimeSection: {
        marginTop: 16,
        paddingVertical: 10,
    },
    showtimeScroll: {
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    showtimeWrapper: {
        marginRight: 20,
    },
    showtimeHeader: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        flexDirection: 'row',
    },
    showtimeTime: {
        fontWeight: '600',
        fontSize: 14,
        color: '#1A1A1A',
    },
    theater: {
        fontWeight: '400',
        fontSize: 14,
        color: '#8F8F8F',
        marginLeft: 10,
    },
    showtimeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        marginRight: 16,
        width: 300,
        height: 190,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 1,
        alignItems: 'center',
    },
    showtimeCardActive: {
        borderColor: '#58A9FF',
        shadowColor: '#58A9FF',
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    seatImageWrapper: {
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    price: {
        fontWeight: '500',
        fontSize: 12,
        color: '#827D88',
        marginTop: 8,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#2E2739',
    },
    selectSeatsButton: {
        backgroundColor: '#61C3F2',
        marginHorizontal: 20,
        marginVertical: 30,
        paddingVertical: 16,
        borderRadius: 14,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectSeatsText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
});
