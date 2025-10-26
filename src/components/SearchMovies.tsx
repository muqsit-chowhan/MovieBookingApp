//Works fine//

// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     TextInput,
//     FlatList,
//     Image,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     ActivityIndicator,
// } from 'react-native';
// import { getGenres, searchMovies } from '../api/tmdb';
// import { Movie, Genre } from '../types/movie';
// import { Colors } from '../constants/colors';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { TMDB_BEARER_TOKEN } from '../utils/constants';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import SearchBar from '../components/SearchBar';
// import { SvgXml } from 'react-native-svg';
// import { backButton } from '../assets/svg';
// import Separator from './Separator';

// interface SearchMoviesProps {
//     onClose: () => void;
// }

// const SearchMovies: React.FC<SearchMoviesProps> = ({ onClose }) => {
//     const [genres, setGenres] = useState<(Genre & { image_url?: string })[]>([]);
//     const [query, setQuery] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [results, setResults] = useState<Movie[]>([]);
//     const [loadingGenres, setLoadingGenres] = useState(true);
//     const [genreMap, setGenreMap] = useState<{ [key: number]: string }>({});

//     const navigation = useNavigation();

//     useEffect(() => {
//         (async () => {
//             try {
//                 const g = await getGenres();
//                 const genreMapObj = g.reduce((acc, genre) => {
//                     acc[genre.id] = genre.name;
//                     return acc;
//                 }, {} as { [key: number]: string });
//                 setGenreMap(genreMapObj);


//                 const genreImages = await Promise.all(
//                     g.map(async (genre) => {
//                         try {
//                             const res = await axios.get(
//                                 `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`,
//                                 {
//                                     headers: {
//                                         accept: 'application/json',
//                                         Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
//                                     },
//                                 }
//                             );

//                             const movies = res.data.results || [];
//                             if (movies.length > 0) {
//                                 const randomMovie = movies[Math.floor(Math.random() * movies.length)];
//                                 return {
//                                     ...genre,
//                                     image_url: randomMovie?.poster_path
//                                         ? `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
//                                         : 'https://via.placeholder.com/150?text=No+Image',
//                                 };
//                             } else {
//                                 return {
//                                     ...genre,
//                                     image_url: 'https://via.placeholder.com/150?text=No+Image',
//                                 };
//                             }
//                         } catch {
//                             return {
//                                 ...genre,
//                                 image_url: 'https://via.placeholder.com/150?text=No+Image',
//                             };
//                         }
//                     })
//                 );

//                 setGenres(genreImages);
//             } catch (err) {
//                 console.error('Error fetching genres:', err);
//             } finally {
//                 setLoadingGenres(false);
//             }
//         })();
//     }, []);



//     const handleSearch = async (text: string) => {
//         setQuery(text);
//         if (text.length > 1) {
//             const movies = await searchMovies(text);
//             setResults(movies);
//         } else {
//             setResults([]);
//         }
//     };

//     const handleClose = () => {
//         setQuery('');
//         setSubmitted(false);
//         setResults([]);
//         onClose();
//     };

//     const renderGenreItem = ({ item }: { item: Genre & { image_url?: string } }) => (
//         <TouchableOpacity
//             style={styles.genreCard}
//             onPress={() => {
//                 onClose();
//                 navigation.navigate('GenreMovies', {
//                     genreId: item.id,
//                     genreName: item.name,
//                 });
//             }}
//         >
//             <Image source={{ uri: item.image_url }} style={styles.genreImage} />
//             <View style={styles.genreOverlay} />
//             <Text style={styles.genreText}>{item.name}</Text>
//         </TouchableOpacity>
//     );

//     const renderSearchItem = ({ item }: { item: Movie }) => (
//         <TouchableOpacity
//             style={styles.resultItem}
//             onPress={() => {
//                 onClose();
//                 navigation.navigate('MovieDetail', {
//                     movieId: item.id,
//                     title: item.title,
//                 });
//             }}
//         >
//             {item.poster_path ? (
//                 <Image
//                     source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
//                     style={styles.poster}
//                 />
//             ) : (
//                 <View style={[styles.posterEmpty, styles.placeholderContainer]}>
//                     <Text style={styles.placeholderText}>No Image Found</Text>
//                 </View>
//             )}

//             <View style={{ flex: 1 }}>
//                 <Text style={styles.resultTitle}>{item.title}</Text>
//                 {/* <Text style={styles.resultGenre}>Movie</Text> */}
//                 <Text style={styles.resultGenre}>
//                     {item.genre_ids?.map((id) => genreMap[id]).filter(Boolean).join(', ') || 'Unknown'}
//                 </Text>

//             </View>
//             <Text style={styles.moreIcon}>⋯</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.fullContainer}>
//             <View style={styles.searchBarContainer}>
//                 <SafeAreaView edges={['top']} style={styles.searchBarSafeArea}>
//                     {/* 🔍 Search Bar or Result Header */}
//                     {!submitted ? (
//                         <>
//                             <SearchBar
//                                 placeholder="TV shows, movies and more"
//                                 value={query}
//                                 onChangeText={(text) => {
//                                     setQuery(text);
//                                     handleSearch(text);
//                                 }}
//                                 onSubmitEditing={() => setSubmitted(true)} />
//                         </>
//                     ) : (
//                         <View style={styles.resultHeader}>
//                             <TouchableOpacity
//                                 onPress={() => {
//                                     setQuery('');
//                                     setSubmitted(false);
//                                     setResults([]);
//                                 }}
//                             >
//                                 <SvgXml xml={backButton} height={40} width={40} />
//                             </TouchableOpacity>
//                             <Text style={styles.resultCountText}>
//                                 {results.length > 0
//                                     ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found`
//                                     : 'No movies found'}
//                             </Text>
//                         </View>
//                     )}

//                     {/* Close button when not searching */}
//                     {!submitted && query.length <= 1 && (
//                         <TouchableOpacity
//                             style={styles.closeButton}
//                             onPress={handleClose}
//                         >
//                             <Text style={styles.closeText}>✕</Text>
//                         </TouchableOpacity>
//                     )}
//                 </SafeAreaView>
//             </View>

//             <View style={styles.contentContainer}>
//                 {/* 🔁 Existing logic (unchanged) */}
//                 {query.length > 1 ? (
//                     <View style={{ flex: 1 }}>
//                         {!submitted &&
//                             <><Text style={styles.sectionTitle}>Top Results</Text><Separator /></>

//                         }
//                         <FlatList
//                             key="search-list"
//                             data={results}
//                             keyExtractor={(item) => item.id.toString()}
//                             renderItem={renderSearchItem}
//                             contentContainerStyle={{ paddingBottom: 20, flexGrow: 1, backgroundColor: '#EFEFEF' }}
//                             ListEmptyComponent={
//                                 query.length > 0 ? (
//                                     <View style={styles.emptyContainer}>
//                                         <Text style={styles.emptyText}>No movies found</Text>
//                                     </View>
//                                 ) : null
//                             }
//                         />
//                     </View>
//                 ) : loadingGenres ? (
//                     <ActivityIndicator
//                         size="large"
//                         color={Colors.text}
//                         style={{ marginTop: 50 }}
//                     />
//                 ) : (
//                     <FlatList
//                         key="genres-grid"
//                         data={genres}
//                         numColumns={2}
//                         keyExtractor={(item) => item.id.toString()}
//                         renderItem={renderGenreItem}
//                         contentContainerStyle={{ paddingBottom: 20 }}
//                     />
//                 )}
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     fullContainer: {
//         flex: 1,
//         backgroundColor: '#EFEFEF',
//     },
//     container: { flex: 1, padding: 16 },
//     searchBar: {
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#F2F2F2',
//         paddingHorizontal: 16,
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     input: {
//         fontSize: 16,
//         color: Colors.text,
//     },
//     resultHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         borderRadius: 25,
//         height: 50,
//         marginBottom: 20,
//     },
//     resultCountText: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#333',
//         left: 10
//     },
//     clearText: {
//         color: '#FA8FC2',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 60,
//         right: 20,
//         zIndex: 10,
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: '#F2F2F2',
//         justifyContent: 'center',
//         alignItems: 'center',

//     },
//     closeText: {
//         fontSize: 24,
//         color: '#333',
//         fontWeight: '600',
//     },
//     sectionTitle: {
//         color: Colors.text,
//         fontSize: 13,
//         fontWeight: '600',
//         marginTop: 20,
//         left: 10
//     },
//     genreCard: {
//         flex: 1,
//         margin: 8,
//         borderRadius: 10,
//         overflow: 'hidden',
//         height: 140,
//     },
//     genreImage: { width: '100%', height: '100%', resizeMode: 'cover' },
//     genreOverlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0,0,0,0.4)',
//     },
//     genreText: {
//         position: 'absolute',
//         bottom: 10,
//         left: 10,
//         color: '#fff',
//         fontWeight: '600',
//         fontSize: 16,
//     },
//     resultItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 14,
//         borderRadius: 10,
//         padding: 10,
//         // borderWidth:2
//     },
//     poster: {
//         width: 150,
//         height: 105,
//         borderRadius: 10,
//         marginRight: 12,
//     },
//     resultTitle: {
//         color: Colors.text,
//         fontSize: 16,
//         fontWeight: '500',
//         marginBottom: 4,
//     },
//     resultGenre: {
//         color: Colors.textSecondary,
//         fontSize: 12,
//     },
//     moreIcon: {
//         fontSize: 30,
//         color: Colors.fillObject,
//         paddingHorizontal: 8,

//     },
//     emptyContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingTop: 40,
//     },
//     emptyText: {
//         color: Colors.textSecondary,
//         fontSize: 16,
//         fontWeight: '500',
//     },
//     searchBarContainer: {
//         backgroundColor: '#fff',

//     },
//     searchBarSafeArea: {
//         paddingHorizontal: 16,
//         paddingBottom: 10,
//         backgroundColor: '#fff',
//         zIndex: 1000,
//         borderBottomWidth: 3,
//         borderBottomColor: '#EFEFEF',

//     },
//     contentContainer: {
//         flex: 1,
//         paddingHorizontal: 16,
//         paddingTop: 20
//     },
//     posterEmpty: {
//         width: 150,
//         height: 105,
//         borderWidth:1,
//         borderColor:'#E0E0E0',
//         borderRadius: 10,
//         marginRight: 12,
//         backgroundColor: '#E0E0E0', // light gray fallback
//     },

//     placeholderContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     placeholderText: {
//         color: '#555',
//         fontSize: 12,
//         textAlign: 'center',
//         fontWeight: '500',
//     },

// });

// export default SearchMovies;


// SearchMovies.tsx - Refactored with proper TypeScript and no inline styles
// SearchMovies.tsx - Refactored with proper TypeScript and no inline styles

import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import axios from 'axios';
import { getGenres, searchMovies } from '../api/tmdb';
import { Movie, Genre } from '../types/movie';
import { Colors } from '../constants/colors';
import { TMDB_BEARER_TOKEN } from '../utils/constants';
import SearchBar from '../components/SearchBar';
import Separator from './Separator';
import { backButton } from '../assets/svg';

// ✅ Define navigation route params here (match your actual routes)
type RootStackParamList = {
    GenreMovies: { genreId: number; genreName: string };
    MovieDetail: { movieId: number; title: string };
    // add others if needed (Home, Selection, etc.)
};

// ✅ Define prop type for navigation
type SearchNavigationProp = StackNavigationProp<RootStackParamList>;

interface SearchMoviesProps {
    onClose: () => void;
}

type GenreWithImage = Genre & { image_url?: string };
type GenreMap = { [key: number]: string };

const SearchMovies: React.FC<SearchMoviesProps> = ({ onClose }) => {
    const [genres, setGenres] = useState<GenreWithImage[]>([]);
    const [query, setQuery] = useState<string>('');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [results, setResults] = useState<Movie[]>([]);
    const [loadingGenres, setLoadingGenres] = useState<boolean>(true);
    const [genreMap, setGenreMap] = useState<GenreMap>({});

    const navigation = useNavigation<SearchNavigationProp>();

    useEffect(() => {
        fetchGenresWithImages();
    }, []);

    const fetchGenresWithImages = async (): Promise<void> => {
        try {
            const genresList = await getGenres();

            const genreMapObj = genresList.reduce<GenreMap>((acc, genre) => {
                acc[genre.id] = genre.name;
                return acc;
            }, {});
            setGenreMap(genreMapObj);

            const genreImages = await Promise.all(
                genresList.map(async (genre): Promise<GenreWithImage> => {
                    try {
                        const res = await axios.get(
                            `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&sort_by=popularity.desc`,
                            {
                                headers: {
                                    accept: 'application/json',
                                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                                },
                            }
                        );

                        const movies = res.data.results || [];
                        if (movies.length > 0) {
                            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                            return {
                                ...genre,
                                image_url: randomMovie?.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`
                                    : 'https://via.placeholder.com/150?text=No+Image',
                            };
                        }
                        return {
                            ...genre,
                            image_url: 'https://via.placeholder.com/150?text=No+Image',
                        };
                    } catch {
                        return {
                            ...genre,
                            image_url: 'https://via.placeholder.com/150?text=No+Image',
                        };
                    }
                })
            );

            setGenres(genreImages);
        } catch (err) {
            console.error('Error fetching genres:', err);
        } finally {
            setLoadingGenres(false);
        }
    };

    const handleSearch = async (text: string): Promise<void> => {
        setQuery(text);
        if (text.length > 1) {
            const movies = await searchMovies(text);
            setResults(movies);
        } else {
            setResults([]);
        }
    };

    const handleClose = (): void => {
        setQuery('');
        setSubmitted(false);
        setResults([]);
        onClose();
    };

    const handleBackPress = (): void => {
        setQuery('');
        setSubmitted(false);
        setResults([]);
    };

    const handleGenrePress = (genreId: number, genreName: string): void => {
        onClose();
        navigation.navigate('GenreMovies', { genreId, genreName });
    };

    const handleMoviePress = (movieId: number, title: string): void => {
        onClose();
        navigation.navigate('MovieDetail', { movieId, title });
    };

    const getMovieGenres = (genreIds?: number[]): string => {
        if (!genreIds || genreIds.length === 0) return 'Unknown';
        return genreIds
            .map((id) => genreMap[id])
            .filter(Boolean)
            .join(', ');
    };

    const renderGenreItem: ListRenderItem<GenreWithImage> = ({ item }) => (
        <TouchableOpacity
            style={styles.genreCard}
            onPress={() => handleGenrePress(item.id, item.name)}
            activeOpacity={0.7}
        >
            <Image source={{ uri: item.image_url }} style={styles.genreImage} />
            <View style={styles.genreOverlay} />
            <Text style={styles.genreText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderSearchItem: ListRenderItem<Movie> = ({ item }) => (
        <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handleMoviePress(item.id, item.title)}
            activeOpacity={0.7}
        >
            {item.poster_path ? (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
                    style={styles.poster}
                />
            ) : (
                <View style={[styles.posterEmpty, styles.placeholderContainer]}>
                    <Text style={styles.placeholderText}>No Image Found</Text>
                </View>
            )}

            <View style={styles.movieInfo}>
                <Text style={styles.resultTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.resultGenre} numberOfLines={1}>
                    {getMovieGenres(item.genre_ids)}
                </Text>
            </View>
            <Text style={styles.moreIcon}>⋯</Text>
        </TouchableOpacity>
    );

    const genreKeyExtractor = (item: GenreWithImage): string => item.id.toString();
    const movieKeyExtractor = (item: Movie): string => item.id.toString();

    const renderEmptyComponent = (): React.ReactElement | null => {
        if (query.length === 0) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No movies found</Text>
            </View>
        );
    };

    return (
        <View style={styles.fullContainer}>
            <View style={styles.searchBarContainer}>
                <SafeAreaView edges={['top']} style={styles.searchBarSafeArea}>
                    {!submitted ? (
                        <SearchBar
                            placeholder="TV shows, movies and more"
                            value={query}
                            onChangeText={handleSearch}
                            onSubmitEditing={() => setSubmitted(true)}
                        />
                    ) : (
                        <View style={styles.resultHeader}>
                            <TouchableOpacity onPress={handleBackPress} activeOpacity={0.7}>
                                <SvgXml xml={backButton} height={40} width={40} />
                            </TouchableOpacity>
                            <Text style={styles.resultCountText}>
                                {results.length > 0
                                    ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found`
                                    : 'No movies found'}
                            </Text>
                        </View>
                    )}

                    {!submitted && query.length <= 1 && (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleClose}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                    )}
                </SafeAreaView>
            </View>

            <View style={styles.contentContainer}>
                {query.length > 1 ? (
                    <View style={styles.searchResultsContainer}>
                        {!submitted && (
                            <>
                                <Text style={styles.sectionTitle}>Top Results</Text>
                                <Separator />
                            </>
                        )}
                        <FlatList
                            key="search-list"
                            data={results}
                            keyExtractor={movieKeyExtractor}
                            renderItem={renderSearchItem}
                            contentContainerStyle={styles.searchListContent}
                            ListEmptyComponent={renderEmptyComponent}
                        />
                    </View>
                ) : loadingGenres ? (
                    <ActivityIndicator
                        size="large"
                        color={Colors.text}
                        style={styles.loadingIndicator}
                    />
                ) : (
                    <FlatList
                        key="genres-grid"
                        data={genres}
                        numColumns={2}
                        keyExtractor={genreKeyExtractor}
                        renderItem={renderGenreItem}
                        contentContainerStyle={styles.genresListContent}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: 140,
    },
    genreImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    genreOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
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
    poster: {
        width: 150,
        height: 105,
        borderRadius: 10,
        marginRight: 12,
    },
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
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SearchMovies;
