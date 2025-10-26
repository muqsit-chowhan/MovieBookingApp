//WORKS //

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { getUpcomingMovies } from '../api/tmdb';
// import { Movie } from '../types/movie';
// import MovieCard from '../components/MovieCard';
// import { search } from '../assets/svg';
// import { SvgXml } from 'react-native-svg';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import SearchMovies from '../components/SearchMovies';

// type RootStackParamList = {
//     MainTabs: undefined;
//     MovieDetail: { movieId: number };
// };

// type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

// const Home: React.FC = () => {
//     const navigation = useNavigation<HomeNavigationProp>();
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [showSearch, setShowSearch] = useState(false);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             const data = await getUpcomingMovies();
//             setMovies(data);
//             setLoading(false);
//         };
//         fetchMovies();
//     }, []);

//     if (loading) {
//         return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
//     }

//     return (
//         <>
//             <View style={styles.headerContainer}>
//                 <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
//                     <View style={styles.header}>
//                         <Text style={styles.headerTitle}>Watch</Text>
//                         <TouchableOpacity 
//                             onPress={() => setShowSearch(true)}
//                         >
//                             <SvgXml xml={search} width={36} height={36} />
//                         </TouchableOpacity>
//                     </View>
//                 </SafeAreaView>
//             </View>

//             <View style={styles.contentContainer}>
//                 <FlatList
//                     data={movies}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <MovieCard 
//                             movie={item} 
//                             onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
//                         />
//                     )}
//                     contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
//                     showsVerticalScrollIndicator={false}
//                 />
//             </View>

//             {showSearch && (
//                 <View style={styles.searchOverlay}>
//                     <SearchMovies onClose={() => setShowSearch(false)} />
//                 </View>
//             )}
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     headerContainer: {
//         backgroundColor: '#fff',
//     },
//     headerSafeArea: {
//         paddingHorizontal: 15,
//         paddingBottom: 15,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         // paddingTop: 40,
//         // borderWidth:1,
//         padding:5,
//         paddingVertical:12
//     },
//     headerTitle: { fontSize: 22, fontWeight: '700', color: '#000' },
//     contentContainer: {
//         flex: 1,
//         backgroundColor: '#EFEFEF',
//         top:30
//     },
//     searchOverlay: {
//         position: 'absolute',
//         top: 15,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'transparent',
//         zIndex: 1000,
//     },
// });

// export default Home;


// Home.tsx - Refactored with proper TypeScript and no inline styles

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { getUpcomingMovies } from '../api/tmdb';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import SearchMovies from '../components/SearchMovies';
import { search } from '../assets/svg';

type RootStackParamList = {
    MainTabs: undefined;
    MovieDetail: { movieId: number };
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const Home: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showSearch, setShowSearch] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = async (): Promise<void> => {
            const data = await getUpcomingMovies();
            setMovies(data);
            setLoading(false);
        };
        fetchMovies();
    }, []);

    const handleMoviePress = (movieId: number): void => {
        navigation.navigate('MovieDetail', { movieId });
    };

    const handleSearchToggle = (): void => {
        setShowSearch(true);
    };

    const handleSearchClose = (): void => {
        setShowSearch(false);
    };

    const renderMovieItem: ListRenderItem<Movie> = ({ item }) => (
        <MovieCard movie={item} onPress={() => handleMoviePress(item.id)} />
    );

    const keyExtractor = (item: Movie): string => item.id.toString();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Watch</Text>
                        <TouchableOpacity
                            onPress={handleSearchToggle}
                            activeOpacity={0.7}
                        >
                            <SvgXml xml={search} width={36} height={36} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.contentContainer}>
                <FlatList
                    data={movies}
                    keyExtractor={keyExtractor}
                    renderItem={renderMovieItem}
                    contentContainerStyle={styles.flatListContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {showSearch && (
                <View style={styles.searchOverlay}>
                    <SearchMovies onClose={handleSearchClose} />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    headerContainer: {
        backgroundColor: '#fff',
    },
    headerSafeArea: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingVertical: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        top: 30,
    },
    flatListContent: {
        paddingBottom: 100,
        paddingHorizontal: 16,
    },
    searchOverlay: {
        position: 'absolute',
        top: 15,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 1000,
    },
});

export default Home;