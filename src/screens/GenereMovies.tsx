import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { getMoviesByGenre } from '../api/tmdb';
import { Movie } from '../types/movie';
import { Colors } from '../constants/colors';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

type GenreMoviesRouteParams = {
    params: {
        genreId: number;
        genreName: string;
    };
};

const GenreMovies: React.FC = () => {
    const route = useRoute<RouteProp<GenreMoviesRouteParams, 'params'>>();
    const navigation = useNavigation<any>();
    const { genreId, genreName } = route.params;

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({ title: genreName });
        (async () => {
            const data = await getMoviesByGenre(genreId);
            setMovies(data);
            setLoading(false);
        })();
    }, [genreId]);



    const handleMoviePress = (movie: Movie) => {
        navigation.navigate('MovieDetail', {
            movieId: movie.id,
            title: movie.title,
        });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color={Colors.text} style={{ marginTop: 50 }} />
            ) : (
                <SafeAreaView>
                    <Header
                    title={genreName}
                    releaseDate={''}
                    onBack={() => navigation.goBack()} />
                    <FlatList
                        data={movies}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.genreCard}
                                activeOpacity={0.8}
                                onPress={() => handleMoviePress(item)}
                            >
                                <Image
                                    source={{
                                        uri: item.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                            : 'https://via.placeholder.com/200x300?text=No+Image',
                                    }}
                                    style={styles.genreImage} />
                                <View style={styles.genreOverlay} />

                                <Text numberOfLines={1} style={styles.genreText}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>No movies found for {genreName}</Text>} /></SafeAreaView>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
    card: {
        flex: 1,
        marginBottom: 16,
        marginHorizontal: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '500',
        marginTop: 6,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: Colors.textSecondary,
        marginTop: 20,
        fontSize: 16,
    },



    fullContainer: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    searchBarContainer: {
        backgroundColor: '#fff',
    },
    searchBarSafeArea: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 1000,
        borderBottomWidth: 3,
        borderBottomColor: '#EFEFEF',
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
    },
    resultCountText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginLeft: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 24,
        color: '#333',
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    searchResultsContainer: {
        flex: 1,
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 13,
        fontWeight: '600',
        marginTop: 20,
        marginLeft: 10,
    },
    searchListContent: {
        paddingBottom: 20,
        flexGrow: 1,
        backgroundColor: '#EFEFEF',
    },
    genresListContent: {
        paddingBottom: 20,
    },
    loadingIndicator: {
        marginTop: 50,
    },
    genreCard: {
        flex: 1,
        margin: 8,
        borderRadius: 10,
        overflow: 'hidden',
        height: 190,
    },
    genreImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    genreOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    genreText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        borderRadius: 10,
        padding: 10,
    },
    // poster: {
    //     width: 150,
    //     height: 105,
    //     borderRadius: 10,
    //     marginRight: 12,
    // },
    posterEmpty: {
        width: 150,
        height: 105,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        marginRight: 12,
        backgroundColor: '#E0E0E0',
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#555',
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
    },
    movieInfo: {
        flex: 1,
    },
    resultTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    resultGenre: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    moreIcon: {
        fontSize: 30,
        color: Colors.fillObject,
        paddingHorizontal: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

});

export default GenreMovies;
