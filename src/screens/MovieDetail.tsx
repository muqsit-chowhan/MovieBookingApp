// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     ActivityIndicator,
//     Image,
//     Dimensions,
//     StatusBar,
//     Alert,
// } from 'react-native';
// import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { getMovieDetails, getMovieVideos } from '../api/tmdb';
// import { MovieDetails, Video } from '../types/movie';
// import VideoPlayer from '../components/VideoPlayer';

// type RootStackParamList = {
//     MovieDetail: { movieId: number };
// };

// type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;
// type MovieDetailNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;

// const { width } = Dimensions.get('window');

// const MovieDetail: React.FC = () => {
//     const route = useRoute<MovieDetailRouteProp>();
//     const navigation = useNavigation<MovieDetailNavigationProp>();
//     const { movieId } = route.params;

//     const [movie, setMovie] = useState<MovieDetails | null>(null);
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [showVideoPlayer, setShowVideoPlayer] = useState(false);
//     const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

//     console.log("moviemoviemovie", movie);


//     useEffect(() => {
//         const fetchMovieData = async () => {
//             try {
//                 console.log('Fetching data for movie ID:', movieId);

//                 const [movieDetails, movieVideos] = await Promise.all([
//                     getMovieDetails(movieId),
//                     getMovieVideos(movieId),
//                 ]);

//                 setMovie(movieDetails);
//                 setVideos(Array.isArray(movieVideos) ? movieVideos : []);

//                 console.log('Movie:', movieDetails?.title);
//                 console.log('Videos found:', movieVideos);

//             } catch (error) {
//                 console.error('Error fetching movie data:', error);
//                 setVideos([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovieData();
//     }, [movieId]);

//     // Get the best available trailer
//     const getTrailer = (): Video | null => {
//         if (!Array.isArray(videos) || videos.length === 0) {
//             console.log('No videos available');
//             return null;
//         }

//         console.log('Available videos:', videos.map(v => ({
//             name: v.name,
//             type: v.type,
//             site: v.site,
//             key: v.key,
//             official: v.official
//         })));

//         // Look for YouTube trailers
//         const youtubeTrailers = videos.filter(video =>
//             video.site === 'YouTube' &&
//             video.type === 'Trailer' &&
//             video.key &&
//             video.key.length > 5 // Basic validation
//         );

//         if (youtubeTrailers.length > 0) {
//             // Prefer official trailers
//             const officialTrailer = youtubeTrailers.find(v => v.official);
//             if (officialTrailer) {
//                 console.log('Using official trailer:', officialTrailer.name);
//                 return officialTrailer;
//             }
//             console.log('Using first trailer:', youtubeTrailers[0].name);
//             return youtubeTrailers[0];
//         }

//         console.log('No YouTube trailers found');
//         return null;
//     };

//     const hasTrailer = (): boolean => {
//         return getTrailer() !== null;
//     };

//     const handleWatchTrailer = () => {
//         const trailer = getTrailer();
//         console.log("trailertrailertrailertrailer", trailer);


//         if (!trailer) {
//             Alert.alert('No Trailer', 'No trailer available for this movie');
//             return;
//         }

//         console.log('Opening trailer:', trailer.name, 'with key:', trailer.key);
//         setSelectedVideo(trailer);
//         setShowVideoPlayer(true);
//     };

//     const handleCloseVideo = () => {
//         setShowVideoPlayer(false);
//         setSelectedVideo(null);
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!movie) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <Text>Movie not found</Text>
//             </View>
//         );
//     }

//     const handlePlayerEnd = () => {
//         // console.log("calledcalled called");

//         setShowVideoPlayer(false);
//         navigation.goBack(); // 👈 automatically go back
//     };

//     const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="light-content" />

//             <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//                 {/* Backdrop Image */}
//                 <View style={styles.backdropContainer}>
//                     <Image
//                         source={{
//                             uri: movie.backdrop_path
//                                 ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
//                                 : 'https://via.placeholder.com/780x440?text=No+Image',
//                         }}
//                         style={styles.backdrop}
//                         resizeMode="cover"
//                     />
//                     <View style={styles.backdropOverlay} />

//                     <View style={styles.header}>
//                         <Text style={styles.headerTitle}>Watch</Text>
//                     </View>
//                 </View>

//                 {/* Movie Content */}
//                 <View style={styles.content}>
//                     <Text style={styles.movieTitle}>{movie.title}</Text>
//                     <Text style={styles.releaseInfo}>In Theaters December {releaseYear}</Text>

//                     {/* Action Buttons */}
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity style={styles.ticketButton}>
//                             <Text style={styles.ticketButtonText}>Get Tickets</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={[
//                                 styles.trailerButton,
//                                 !hasTrailer() && styles.disabledButton
//                             ]}
//                             onPress={handleWatchTrailer}
//                             disabled={!hasTrailer()}
//                         >
//                             <Text style={[
//                                 styles.trailerButtonText,
//                                 !hasTrailer() && styles.disabledButtonText
//                             ]}>
//                                 Watch Trailer
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Genres */}
//                     <View style={styles.genresContainer}>
//                         <Text style={styles.sectionLabel}>Genres</Text>
//                         <View style={styles.genresList}>
//                             {movie.genres?.map((genre, index) => (
//                                 <View key={genre.id} style={styles.genreTag}>
//                                     <Text style={styles.genreText}>{genre.name}</Text>
//                                     {index < movie.genres.length - 1 && (
//                                         <Text style={styles.genreSeparator}>    </Text>
//                                     )}
//                                 </View>
//                             ))}
//                         </View>
//                     </View>

//                     {/* Overview */}
//                     <View style={styles.overviewContainer}>
//                         <Text style={styles.sectionLabel}>Overview</Text>
//                         <Text style={styles.overviewText}>{movie.overview}</Text>
//                     </View>

//                     {/* Debug Info */}
//                     {__DEV__ && (
//                         <View style={styles.debugContainer}>
//                             <Text style={styles.debugText}>
//                                 Videos: {videos.length} |
//                                 Has Trailer: {hasTrailer() ? 'Yes' : 'No'}
//                             </Text>
//                         </View>
//                     )}
//                 </View>
//             </ScrollView>

//             {/* Video Player Modal */}
//             {/* <VideoPlayer
//                 video={selectedVideo}
//                 visible={showVideoPlayer}
//                 onClose={handleCloseVideo}
//             /> */}
//             {/* <VideoPlayer
//                 video={selectedVideo}
//                 visible={showVideoPlayer}
//                 onClose={() => setShowVideoPlayer(false)}
//                 onEnd={() => setShowVideoPlayer(false)}
//             /> */}

//             <VideoPlayer
//                 video={selectedVideo}
//                 visible={showVideoPlayer}
//                 onClose={() => setShowVideoPlayer(false)}
//                 onEnd={handlePlayerEnd}
//             />
//         </View>
//     );
// };

// // ... keep your existing styles the same

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     scrollView: {
//         flex: 1,
//     },
//     backdropContainer: {
//         position: 'relative',
//     },
//     backdrop: {
//         width: '100%',
//         height: 440,
//     },
//     backdropOverlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     },
//     header: {
//         position: 'absolute',
//         top: 60,
//         left: 20,
//         right: 20,
//     },
//     headerTitle: {
//         fontSize: 22,
//         fontWeight: '700',
//         color: '#fff',
//         textAlign: 'center',
//     },
//     content: {
//         padding: 20,
//     },
//     movieTitle: {
//         fontSize: 28,
//         fontWeight: '700',
//         color: '#000',
//         marginBottom: 8,
//         textAlign: 'center',
//     },
//     releaseInfo: {
//         fontSize: 16,
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 24,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 32,
//         paddingHorizontal: 20,
//     },
//     ticketButton: {
//         flex: 1,
//         backgroundColor: '#000',
//         paddingVertical: 16,
//         borderRadius: 10,
//         marginRight: 12,
//         alignItems: 'center',
//     },
//     trailerButton: {
//         flex: 1,
//         backgroundColor: 'transparent',
//         paddingVertical: 16,
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#000',
//         marginLeft: 12,
//         alignItems: 'center',
//     },
//     disabledButton: {
//         borderColor: '#ccc',
//         opacity: 0.5,
//     },
//     ticketButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     trailerButtonText: {
//         color: '#000',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     disabledButtonText: {
//         color: '#ccc',
//     },
//     genresContainer: {
//         marginBottom: 24,
//     },
//     sectionLabel: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#000',
//         marginBottom: 12,
//     },
//     genresList: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     genreTag: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     genreText: {
//         fontSize: 14,
//         color: '#666',
//         fontWeight: '500',
//     },
//     genreSeparator: {
//         fontSize: 14,
//         color: '#666',
//     },
//     overviewContainer: {
//         marginBottom: 40,
//     },
//     overviewText: {
//         fontSize: 14,
//         color: '#666',
//         lineHeight: 22,
//     },
//     debugContainer: {
//         backgroundColor: '#f8f8f8',
//         padding: 8,
//         borderRadius: 4,
//         marginTop: 16,
//     },
//     debugText: {
//         fontSize: 12,
//         color: '#666',
//         textAlign: 'center',
//     },
// });

// export default MovieDetail;

//WORKS COMPLETE//

// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     ActivityIndicator,
//     Image,
//     Dimensions,
//     StatusBar,
//     Alert,
// } from 'react-native';
// import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { getMovieDetails, getMovieVideos } from '../api/tmdb';
// import { MovieDetails, Video } from '../types/movie';
// import VideoPlayer from '../components/VideoPlayer';

// type RootStackParamList = {
//     MovieDetail: { movieId: number };
//     MovieBooking: { 
//         title: string;
//         releaseDate: string;
//         poster?: string;
//         backdrop?: string;
//         genre?: string;
//         duration?: string;
//         rating?: number;
//         overview?: string;
//     };
// };

// type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;
// type MovieDetailNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;

// const { width } = Dimensions.get('window');

// const MovieDetail: React.FC = () => {
//     const route = useRoute<MovieDetailRouteProp>();
//     const navigation = useNavigation<MovieDetailNavigationProp>();
//     const { movieId } = route.params;

//     const [movie, setMovie] = useState<MovieDetails | null>(null);
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [showVideoPlayer, setShowVideoPlayer] = useState(false);
//     const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

//     console.log("moviemoviemovie", movie);

//     useEffect(() => {
//         const fetchMovieData = async () => {
//             try {
//                 console.log('Fetching data for movie ID:', movieId);

//                 const [movieDetails, movieVideos] = await Promise.all([
//                     getMovieDetails(movieId),
//                     getMovieVideos(movieId),
//                 ]);

//                 setMovie(movieDetails);
//                 setVideos(Array.isArray(movieVideos) ? movieVideos : []);

//                 console.log('Movie:', movieDetails?.title);
//                 console.log('Videos found:', movieVideos);

//             } catch (error) {
//                 console.error('Error fetching movie data:', error);
//                 setVideos([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovieData();
//     }, [movieId]);

//     // Get the best available trailer
//     const getTrailer = (): Video | null => {
//         if (!Array.isArray(videos) || videos.length === 0) {
//             console.log('No videos available');
//             return null;
//         }

//         console.log('Available videos:', videos.map(v => ({
//             name: v.name,
//             type: v.type,
//             site: v.site,
//             key: v.key,
//             official: v.official
//         })));

//         // Look for YouTube trailers
//         const youtubeTrailers = videos.filter(video =>
//             video.site === 'YouTube' &&
//             video.type === 'Trailer' &&
//             video.key &&
//             video.key.length > 5 // Basic validation
//         );

//         if (youtubeTrailers.length > 0) {
//             // Prefer official trailers
//             const officialTrailer = youtubeTrailers.find(v => v.official);
//             if (officialTrailer) {
//                 console.log('Using official trailer:', officialTrailer.name);
//                 return officialTrailer;
//             }
//             console.log('Using first trailer:', youtubeTrailers[0].name);
//             return youtubeTrailers[0];
//         }

//         console.log('No YouTube trailers found');
//         return null;
//     };

//     const hasTrailer = (): boolean => {
//         return getTrailer() !== null;
//     };

//     const handleWatchTrailer = () => {
//         const trailer = getTrailer();
//         console.log("trailertrailertrailertrailer", trailer);

//         if (!trailer) {
//             Alert.alert('No Trailer', 'No trailer available for this movie');
//             return;
//         }

//         console.log('Opening trailer:', trailer.name, 'with key:', trailer.key);
//         setSelectedVideo(trailer);
//         setShowVideoPlayer(true);
//     };

//     const handleCloseVideo = () => {
//         setShowVideoPlayer(false);
//         setSelectedVideo(null);
//     };

//     const handleGetTickets = () => {
//         if (!movie) return;

//         // Format release date for display
//         const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
//         const formattedReleaseDate = `In Theaters December ${releaseYear}`;

//         // Prepare navigation parameters
//         const movieParams = {
//             title: movie.title,
//             releaseDate: formattedReleaseDate,
//             poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
//             backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : undefined,
//             genre: movie.genres?.map(genre => genre.name).join(', '),
//             rating: movie.vote_average,
//             overview: movie.overview,
//             // You can add more movie details as needed
//         };

//         console.log('Navigating to MovieBooking with params:', movieParams);

//         // Navigate to MovieBooking screen
//         navigation.navigate('MovieBooking', movieParams);
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!movie) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <Text>Movie not found</Text>
//             </View>
//         );
//     }

//     const handlePlayerEnd = () => {
//         setShowVideoPlayer(false);
//         navigation.goBack();
//     };

//     const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//                 {/* Backdrop Image */}
//                 <View style={styles.backdropContainer}>
//                     <Image
//                         source={{
//                             uri: movie.backdrop_path
//                                 ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
//                                 : 'https://via.placeholder.com/780x440?text=No+Image',
//                         }}
//                         style={styles.backdrop}
//                         resizeMode="cover"
//                     />
//                     <View style={styles.backdropOverlay} />

//                     <View style={styles.header}>
//                         <Text style={styles.headerTitle}>Watch</Text>
//                     </View>
//                 </View>

//                 {/* Movie Content */}
//                 <View style={styles.content}>
//                     <Text style={styles.movieTitle}>{movie.title}</Text>
//                     <Text style={styles.releaseInfo}>In Theaters December {releaseYear}</Text>

//                     {/* Action Buttons */}
//                     <View style={styles.buttonContainer}>
//                         <TouchableOpacity 
//                             style={styles.ticketButton}
//                             onPress={handleGetTickets}
//                         >
//                             <Text style={styles.ticketButtonText}>Get Tickets</Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             style={[
//                                 styles.trailerButton,
//                                 !hasTrailer() && styles.disabledButton
//                             ]}
//                             onPress={handleWatchTrailer}
//                             disabled={!hasTrailer()}
//                         >
//                             <Text style={[
//                                 styles.trailerButtonText,
//                                 !hasTrailer() && styles.disabledButtonText
//                             ]}>
//                                 Watch Trailer
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Genres */}
//                     <View style={styles.genresContainer}>
//                         <Text style={styles.sectionLabel}>Genres</Text>
//                         <View style={styles.genresList}>
//                             {movie.genres?.map((genre, index) => (
//                                 <View key={genre.id} style={styles.genreTag}>
//                                     <Text style={styles.genreText}>{genre.name}</Text>
//                                     {index < movie.genres.length - 1 && (
//                                         <Text style={styles.genreSeparator}>    </Text>
//                                     )}
//                                 </View>
//                             ))}
//                         </View>
//                     </View>

//                     {/* Overview */}
//                     <View style={styles.overviewContainer}>
//                         <Text style={styles.sectionLabel}>Overview</Text>
//                         <Text style={styles.overviewText}>{movie.overview}</Text>
//                     </View>

//                     {/* Debug Info */}
//                     {__DEV__ && (
//                         <View style={styles.debugContainer}>
//                             <Text style={styles.debugText}>
//                                 Videos: {videos.length} |
//                                 Has Trailer: {hasTrailer() ? 'Yes' : 'No'}
//                             </Text>
//                         </View>
//                     )}
//                 </View>
//             </ScrollView>

//             <VideoPlayer
//                 video={selectedVideo}
//                 visible={showVideoPlayer}
//                 onClose={() => setShowVideoPlayer(false)}
//                 onEnd={handlePlayerEnd}
//             />
//         </View>
//     );
// };

// // ... keep your existing styles the same

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     scrollView: {
//         flex: 1,
//     },
//     backdropContainer: {
//         position: 'relative',
//     },
//     backdrop: {
//         width: '100%',
//         height: 440,
//     },
//     backdropOverlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     },
//     header: {
//         position: 'absolute',
//         top: 60,
//         left: 20,
//         right: 20,
//     },
//     headerTitle: {
//         fontSize: 22,
//         fontWeight: '700',
//         color: '#fff',
//         textAlign: 'center',
//     },
//     content: {
//         padding: 20,
//     },
//     movieTitle: {
//         fontSize: 28,
//         fontWeight: '700',
//         color: '#000',
//         marginBottom: 8,
//         textAlign: 'center',
//     },
//     releaseInfo: {
//         fontSize: 16,
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 24,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 32,
//         paddingHorizontal: 20,
//     },
//     ticketButton: {
//         flex: 1,
//         backgroundColor: '#000',
//         paddingVertical: 16,
//         borderRadius: 10,
//         marginRight: 12,
//         alignItems: 'center',
//     },
//     trailerButton: {
//         flex: 1,
//         backgroundColor: 'transparent',
//         paddingVertical: 16,
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#000',
//         marginLeft: 12,
//         alignItems: 'center',
//     },
//     disabledButton: {
//         borderColor: '#ccc',
//         opacity: 0.5,
//     },
//     ticketButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     trailerButtonText: {
//         color: '#000',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     disabledButtonText: {
//         color: '#ccc',
//     },
//     genresContainer: {
//         marginBottom: 24,
//     },
//     sectionLabel: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#000',
//         marginBottom: 12,
//     },
//     genresList: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     genreTag: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     genreText: {
//         fontSize: 14,
//         color: '#666',
//         fontWeight: '500',
//     },
//     genreSeparator: {
//         fontSize: 14,
//         color: '#666',
//     },
//     overviewContainer: {
//         marginBottom: 40,
//     },
//     overviewText: {
//         fontSize: 14,
//         color: '#666',
//         lineHeight: 22,
//     },
//     debugContainer: {
//         backgroundColor: '#f8f8f8',
//         padding: 8,
//         borderRadius: 4,
//         marginTop: 16,
//     },
//     debugText: {
//         fontSize: 12,
//         color: '#666',
//         textAlign: 'center',
//     },
// });

// export default MovieDetail;




//works//

// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     ActivityIndicator,
//     Image,
//     Dimensions,
//     StatusBar,
//     Alert,
// } from 'react-native';
// import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { getMovieDetails, getMovieVideos } from '../api/tmdb';
// import { MovieDetails, Video } from '../types/movie';
// import VideoPlayer from '../components/VideoPlayer';
// import { backButton, backButtonWhite } from '../assets/svg';
// import { SvgXml } from 'react-native-svg';
// import { getHeight, getWidth } from '../utils/resizeUtils';
// import Separator from '../components/Separator';

// type RootStackParamList = {
//     MovieDetail: { movieId: number };
//     MovieBooking: {
//         title: string;
//         releaseDate: string;
//         poster?: string;
//         backdrop?: string;
//         genre?: string;
//         duration?: string;
//         rating?: number;
//         overview?: string;
//     };
// };

// type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;
// type MovieDetailNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;

// const { width, height } = Dimensions.get('window');

// const MovieDetail: React.FC = () => {
//     const route = useRoute<MovieDetailRouteProp>();
//     const navigation = useNavigation<MovieDetailNavigationProp>();
//     const { movieId } = route.params;

//     const [movie, setMovie] = useState<MovieDetails | null>(null);
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [showVideoPlayer, setShowVideoPlayer] = useState(false);
//     const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

//     const GENRE_COLORS = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F'];

//     useEffect(() => {
//         const fetchMovieData = async () => {
//             try {
//                 console.log('Fetching data for movie ID:', movieId);

//                 const [movieDetails, movieVideos] = await Promise.all([
//                     getMovieDetails(movieId),
//                     getMovieVideos(movieId),
//                 ]);

//                 setMovie(movieDetails);
//                 setVideos(Array.isArray(movieVideos) ? movieVideos : []);

//                 console.log('Movie:', movieDetails?.title);
//                 console.log('Videos found:', movieVideos);

//             } catch (error) {
//                 console.error('Error fetching movie data:', error);
//                 setVideos([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovieData();
//     }, [movieId]);

//     // Get the best available trailer
//     const getTrailer = (): Video | null => {
//         if (!Array.isArray(videos) || videos.length === 0) {
//             console.log('No videos available');
//             return null;
//         }

//         console.log('Available videos:', videos.map(v => ({
//             name: v.name,
//             type: v.type,
//             site: v.site,
//             key: v.key,
//             official: v.official
//         })));

//         // Look for YouTube trailers
//         const youtubeTrailers = videos.filter(video =>
//             video.site === 'YouTube' &&
//             video.type === 'Trailer' &&
//             video.key &&
//             video.key.length > 5 // Basic validation
//         );

//         if (youtubeTrailers.length > 0) {
//             // Prefer official trailers
//             const officialTrailer = youtubeTrailers.find(v => v.official);
//             if (officialTrailer) {
//                 console.log('Using official trailer:', officialTrailer.name);
//                 return officialTrailer;
//             }
//             console.log('Using first trailer:', youtubeTrailers[0].name);
//             return youtubeTrailers[0];
//         }

//         console.log('No YouTube trailers found');
//         return null;
//     };

//     const hasTrailer = (): boolean => {
//         return getTrailer() !== null;
//     };

//     const handleWatchTrailer = () => {
//         const trailer = getTrailer();

//         if (!trailer) {
//             Alert.alert('No Trailer', 'No trailer available for this movie');
//             return;
//         }

//         console.log('Opening trailer:', trailer.name, 'with key:', trailer.key);
//         setSelectedVideo(trailer);
//         setShowVideoPlayer(true);
//     };

//     const handleGetTickets = () => {
//         if (!movie) return;

//         // Format release date for display
//         const releaseYear = movie.release_date
//         ? new Date(movie.release_date).toLocaleDateString('en-US', { 
//             year: 'numeric', 
//             month: 'long', 
//             day: 'numeric' 
//           })
//         : '';
//       ;
//         const formattedReleaseDate = `In Theaters ${releaseYear}`;

//         // Prepare navigation parameters
//         const movieParams = {
//             title: movie.title,
//             releaseDate: formattedReleaseDate,
//             poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
//             backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : undefined,
//             genre: movie.genres?.map(genre => genre.name).join(', '),
//             rating: movie.vote_average,
//             overview: movie.overview,
//         };

//         console.log('Navigating to MovieBooking with params:', movieParams);

//         // Navigate to MovieBooking screen
//         navigation.navigate('MovieBooking', movieParams);
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (!movie) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <Text>Movie not found</Text>
//             </View>
//         );
//     }

//     const handlePlayerEnd = () => {
//         setShowVideoPlayer(false);
//         navigation.goBack();
//     };

//     const releaseYear = movie.release_date
//         ? new Date(movie.release_date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         })
//         : '';
//     ;

//     return (
//         <View style={styles.container}>
//             <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

//             <ScrollView
//                 style={styles.scrollView}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContent}
//             >
//                 {/* Backdrop Image with Overlay Content */}
//                 <View style={styles.backdropContainer}>
//                     {movie.backdrop_path ? (
//                         <Image
//                             source={{
//                                 uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
//                             }}
//                             style={styles.backdrop}
//                             resizeMode="cover"
//                         />
//                     ) : (
//                         <View style={[styles.backdrop, styles.backdropPlaceholder]}>
//                             <Text style={styles.backdropPlaceholderText}>No Image Found</Text>
//                         </View>
//                     )}


//                     {/* Dark gradient overlay */}
//                     <View style={styles.gradientOverlay} />

//                     {/* Back button and Watch text */}
//                     <View style={styles.header}>
//                         <SvgXml xml={backButtonWhite} width={30} height={30} onPress={() => navigation.goBack()} />
//                         <Text style={styles.headerTitle}>Watch</Text>
//                     </View>

//                     {/* Movie Title and Info on Image */}
//                     <View style={styles.overlayContent}>
//                         <Text style={styles.movieTitle}>In Theaters {releaseYear}</Text>

//                         {/* Action Buttons */}
//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity
//                                 style={styles.ticketButton}
//                                 onPress={handleGetTickets}
//                             >
//                                 <Text style={styles.ticketButtonText}>Get Tickets</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[
//                                     styles.trailerButton,
//                                     !hasTrailer() && styles.disabledButton
//                                 ]}
//                                 onPress={handleWatchTrailer}
//                                 disabled={!hasTrailer()}
//                             >
//                                 <Text style={[
//                                     styles.trailerButtonText,
//                                     !hasTrailer() && styles.disabledButtonText
//                                 ]}>
//                                     ▶ Watch Trailer
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>

//                 {/* White Content Section */}
//                 <View style={styles.contentSection}>
//                     {/* Genres */}
//                     <View style={styles.genresContainer}>
//                         <Text style={styles.sectionLabel}>Genres</Text>
//                         <View style={styles.genresList}>
//                             {movie.genres?.map((genre, index) => (
//                                 <View
//                                     key={genre.id}
//                                     style={[
//                                         styles.genreTag,
//                                         { backgroundColor: GENRE_COLORS[index % GENRE_COLORS.length] }
//                                     ]}
//                                 >
//                                     <Text style={styles.genreText}>{genre.name}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>

//                     <Separator />


//                     {/* Overview */}
//                     <View style={styles.overviewContainer}>
//                         <Text style={styles.sectionLabel}>Overview</Text>
//                         <Text style={styles.overviewText}>{movie.overview}</Text>
//                     </View>
//                 </View>
//             </ScrollView>

//             <VideoPlayer
//                 video={selectedVideo}
//                 visible={showVideoPlayer}
//                 onClose={() => setShowVideoPlayer(false)}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         flexGrow: 1,
//     },
//     backdropContainer: {
//         position: 'relative',
//         height: height * 0.67,
//         width: '100%',
//     },
//     backdrop: {
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//     },
//     gradientOverlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     },
//     header: {
//         position: 'absolute',
//         top: 70,
//         left: 0,
//         right: 0,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         paddingHorizontal: 20,
//         zIndex: 10,
//     },
//     backButton: {
//         width: 40,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     backButtonText: {
//         color: '#fff',
//         fontSize: 28,
//         fontWeight: '300',
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#fff',
//         flex: 1,
//         // textAlign: 'center',
//         left: 10,
//     },
//     overlayContent: {
//         position: 'absolute',
//         bottom: 100,
//         left: 0,
//         right: 0,
//         paddingHorizontal: 20,
//     },
//     movieTitle: {
//         fontSize: 22,
//         fontWeight: '500',
//         color: '#fff',
//         marginBottom: 20,
//         textAlign: 'center',
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: 0, height: 2 },
//         textShadowRadius: 4,
//     },
//     releaseInfo: {
//         fontSize: 15,
//         color: '#fff',
//         textAlign: 'center',
//         marginBottom: 24,
//         opacity: 0.9,
//     },
//     buttonContainer: {
//         flexDirection: 'column',
//         gap: 12,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     ticketButton: {
//         backgroundColor: '#61C3F2',
//         paddingVertical: 16,
//         borderRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: getWidth(70),
//         height: getHeight(7)
//     },
//     trailerButton: {
//         backgroundColor: 'transparent',
//         paddingVertical: 16,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#61C3F2',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: getWidth(70),
//         height: getHeight(7)

//     },
//     disabledButton: {
//         borderColor: 'rgba(255, 255, 255, 0.5)',
//         opacity: 0.5,
//     },
//     ticketButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '700',
//     },
//     trailerButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '700',
//     },
//     disabledButtonText: {
//         color: 'rgba(255, 255, 255, 0.5)',
//     },
//     contentSection: {
//         backgroundColor: '#fff',
//         // borderTopLeftRadius: 20,
//         // borderTopRightRadius: 20,
//         marginTop: -60,
//         paddingTop: 24,
//         paddingHorizontal: 20,
//         paddingBottom: 40,
//     },
//     genresContainer: {
//         marginBottom: 24,
//         paddingHorizontal: 10
//     },
//     sectionLabel: {
//         fontSize: 16,
//         fontWeight: '800',
//         color: '#202C43',
//         marginBottom: 16,
//     },
//     genresList: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: 8,
//     },
//     genreTag: {
//         // Remove this line: backgroundColor: '#61C3F2',
//         paddingHorizontal: 18,
//         paddingVertical: 8,
//         borderRadius: 16,
//     },
//     genreText: {
//         fontSize: 13,
//         color: '#fff',
//         fontWeight: '700',
//     },
//     overviewContainer: {
//         marginBottom: 24,
//         paddingHorizontal: 10,
//         paddingVertical: 20


//     },
//     overviewText: {
//         fontSize: 14,
//         color: '#8F8F8F',
//         lineHeight: 25,
//         fontWeight: '400',
//         textTransform: 'capitalize',

//     },
//     debugContainer: {
//         backgroundColor: '#f8f8f8',
//         padding: 8,
//         borderRadius: 4,
//         marginTop: 16,
//     },
//     debugText: {
//         fontSize: 12,
//         color: '#666',
//         textAlign: 'center',
//     },
//     separator: {
//         height: 1,
//         backgroundColor: 'black',
//         opacity: 0.1,
//         marginHorizontal: 10,
//         // marginVertical: 10, // optional — adds vertical spacing
//     },
//     // backdrop: {
//     //     width: '100%',
//     //     height: 220,
//     //     borderRadius: 10,
//     //     backgroundColor: '#E0E0E0', // fallback color
//     //   },
      
//       backdropPlaceholder: {
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
      
//       backdropPlaceholderText: {
//         color: '#555',
//         fontSize: 16,
//         fontWeight: '500',
//         textAlign: 'center',
//       },
      

// });

// export default MovieDetail;

// MovieDetail.tsx - Refactored with proper TypeScript and no inline styles

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';
import { getMovieDetails, getMovieVideos } from '../api/tmdb';
import { MovieDetails, Video } from '../types/movie';
import VideoPlayer from '../components/VideoPlayer';
import Separator from '../components/Separator';
import { backButtonWhite } from '../assets/svg';
import { getHeight, getWidth } from '../utils/resizeUtils';

type RootStackParamList = {
    MovieDetail: { movieId: number };
    MovieBooking: {
        title: string;
        releaseDate: string;
        poster?: string;
        backdrop?: string;
        genre?: string;
        duration?: string;
        rating?: number;
        overview?: string;
    };
};

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;
type MovieDetailNavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;

const { width, height } = Dimensions.get('window');

const GENRE_COLORS = ['#15D2BC', '#E26CA5', '#564CA3', '#CD9D0F'] as const;

const MovieDetail: React.FC = () => {
    const route = useRoute<MovieDetailRouteProp>();
    const navigation = useNavigation<MovieDetailNavigationProp>();
    const { movieId } = route.params;

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        fetchMovieData();
    }, [movieId]);

    const fetchMovieData = async (): Promise<void> => {
        try {
            const [movieDetails, movieVideos] = await Promise.all([
                getMovieDetails(movieId),
                getMovieVideos(movieId),
            ]);

            setMovie(movieDetails);
            setVideos(Array.isArray(movieVideos) ? movieVideos : []);
        } catch (error) {
            setVideos([]);
        } finally {
            setLoading(false);
        }
    };

    const getTrailer = (): Video | null => {
        if (!Array.isArray(videos) || videos.length === 0) {
            return null;
        }

        const youtubeTrailers = videos.filter(
            (video) =>
                video.site === 'YouTube' &&
                video.type === 'Trailer' &&
                video.key &&
                video.key.length > 5
        );

        if (youtubeTrailers.length > 0) {
            const officialTrailer = youtubeTrailers.find((v) => v.official);
            return officialTrailer || youtubeTrailers[0];
        }

        return null;
    };

    const hasTrailer = (): boolean => {
        return getTrailer() !== null;
    };

    const formatReleaseDate = (releaseDate: string): string => {
        return new Date(releaseDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleWatchTrailer = (): void => {
        const trailer = getTrailer();

        if (!trailer) {
            Alert.alert('No Trailer', 'No trailer available for this movie');
            return;
        }

        setSelectedVideo(trailer);
        setShowVideoPlayer(true);
    };

    const handleGetTickets = (): void => {
        if (!movie) return;

        const releaseYear = movie.release_date ? formatReleaseDate(movie.release_date) : '';
        const formattedReleaseDate = `In Theaters ${releaseYear}`;

        const movieParams = {
            title: movie.title,
            releaseDate: formattedReleaseDate,
            poster: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : undefined,
            backdrop: movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
                : undefined,
            genre: movie.genres?.map((genre) => genre.name).join(', '),
            rating: movie.vote_average,
            overview: movie.overview,
        };

        navigation.navigate('MovieBooking', movieParams);
    };

    const handleBackPress = (): void => {
        navigation.goBack();
    };

    const handleCloseVideoPlayer = (): void => {
        setShowVideoPlayer(false);
    };

    const getGenreColor = (index: number): string => {
        return GENRE_COLORS[index % GENRE_COLORS.length];
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!movie) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Movie not found</Text>
            </View>
        );
    }

    const releaseYear = movie.release_date ? formatReleaseDate(movie.release_date) : '';

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.backdropContainer}>
                    {movie.backdrop_path ? (
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
                            }}
                            style={styles.backdrop}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.backdrop, styles.backdropPlaceholder]}>
                            <Text style={styles.backdropPlaceholderText}>No Image Found</Text>
                        </View>
                    )}

                    <View style={styles.gradientOverlay} />

                    <View style={styles.header}>
                        <SvgXml
                            xml={backButtonWhite}
                            width={30}
                            height={30}
                            onPress={handleBackPress}
                        />
                        <Text style={styles.headerTitle}>Watch</Text>
                    </View>

                    <View style={styles.overlayContent}>
                        <Text style={styles.movieTitle}>In Theaters {releaseYear}</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.ticketButton}
                                onPress={handleGetTickets}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.ticketButtonText}>Get Tickets</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.trailerButton,
                                    !hasTrailer() && styles.disabledButton,
                                ]}
                                onPress={handleWatchTrailer}
                                disabled={!hasTrailer()}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.trailerButtonText,
                                        !hasTrailer() && styles.disabledButtonText,
                                    ]}
                                >
                                    ▶ Watch Trailer
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.contentSection}>
                    <View style={styles.genresContainer}>
                        <Text style={styles.sectionLabel}>Genres</Text>
                        <View style={styles.genresList}>
                            {movie.genres?.map((genre, index) => (
                                <View
                                    key={genre.id}
                                    style={[
                                        styles.genreTag,
                                        { backgroundColor: getGenreColor(index) },
                                    ]}
                                >
                                    <Text style={styles.genreText}>{genre.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Separator />

                    <View style={styles.overviewContainer}>
                        <Text style={styles.sectionLabel}>Overview</Text>
                        <Text style={styles.overviewText}>{movie.overview}</Text>
                    </View>
                </View>
            </ScrollView>

            <VideoPlayer
                video={selectedVideo}
                visible={showVideoPlayer}
                onClose={handleCloseVideoPlayer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    backdropContainer: {
        position: 'relative',
        height: height * 0.67,
        width: '100%',
    },
    backdrop: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    backdropPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
    },
    backdropPlaceholderText: {
        color: '#555',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    header: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        flex: 1,
        marginLeft: 10,
    },
    overlayContent: {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    movieTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticketButton: {
        backgroundColor: '#61C3F2',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: getWidth(70),
        height: getHeight(7),
    },
    trailerButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#61C3F2',
        alignItems: 'center',
        justifyContent: 'center',
        width: getWidth(70),
        height: getHeight(7),
    },
    disabledButton: {
        borderColor: 'rgba(255, 255, 255, 0.5)',
        opacity: 0.5,
    },
    ticketButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    trailerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    disabledButtonText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    contentSection: {
        backgroundColor: '#fff',
        marginTop: -60,
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    genresContainer: {
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '800',
        color: '#202C43',
        marginBottom: 16,
    },
    genresList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    genreTag: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 16,
    },
    genreText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '700',
    },
    overviewContainer: {
        marginBottom: 24,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    overviewText: {
        fontSize: 14,
        color: '#8F8F8F',
        lineHeight: 25,
        fontWeight: '400',
        textTransform: 'capitalize',
    },
});

export default MovieDetail;