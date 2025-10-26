// //Not playing auto//

// import React, { useState, useRef } from 'react';

// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Modal,
//   ActivityIndicator,
//   Dimensions,
//   StatusBar,
//   Linking,
//   Alert,
// } from 'react-native';
// import WebView from 'react-native-webview';
// import { Video } from '../types/movie';

// const { width, height } = Dimensions.get('window');

// interface VideoPlayerProps {
//   video: Video | null;
//   visible: boolean;
//   onClose: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const webViewRef = useRef<WebView>(null);
//   console.log("videovideovideo",video);


//   // Reset states when modal opens
//   React.useEffect(() => {
//     if (visible && video) {
//       setLoading(true);
//       setHasError(false);
//       console.log('Opening trailer with key:', video.key);
//     }
//   }, [visible, video]);

//   if (!video) return null;

//   // Use the actual YouTube watch page instead of embed
//   const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;

//   const handleLoadStart = () => {
//     setLoading(true);
//     setHasError(false);
//   };

//   const handleLoadEnd = () => {
//     setLoading(false);
//   };

//   const handleError = () => {
//     console.log('WebView error occurred');
//     setHasError(true);
//     setLoading(false);
//   };

//   const handleNavigationStateChange = (navState: any) => {
//     console.log('Navigation state changed:', navState.url);

//     // If YouTube tries to open in app or there's a redirect issue
//     if (navState.url.includes('youtube.com/watch') && !navState.loading) {
//       setLoading(false);
//     }
//   };

//   const handleRetry = () => {
//     setLoading(true);
//     setHasError(false);
//     if (webViewRef.current) {
//       webViewRef.current.reload();
//     }
//   };

//   const handleOpenInYouTube = async () => {
//     try {
//       const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
//       const youtubeAppUrl = `vnd.youtube://watch?v=${video.key}`;

//       // Try to open YouTube app first
//       const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
//       if (canOpenApp) {
//         await Linking.openURL(youtubeAppUrl);
//       } else {
//         // Fallback to browser
//         await Linking.openURL(youtubeUrl);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Could not open YouTube');
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="fullScreen"
//       statusBarTranslucent={true}
//       onRequestClose={onClose}
//     >
//       <StatusBar hidden={false} backgroundColor="#000" barStyle="light-content" />
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.closeButton} 
//             onPress={onClose}
//           >
//             <Text style={styles.closeButtonText}>✕</Text>
//           </TouchableOpacity>
//           <Text style={styles.title} numberOfLines={1}>
//             {/* {video.name || 'Trailer'} */}
//           </Text>
//           <TouchableOpacity 
//             style={styles.youtubeButton}
//             onPress={handleOpenInYouTube}
//           >
//             <Text style={styles.youtubeButtonText}>Open</Text>
//           </TouchableOpacity>
//         </View>

//         {/* WebView */}
//         <WebView
//           ref={webViewRef}
//           source={{ uri: youtubeUrl }}
//           style={styles.webview}
//           onLoadStart={handleLoadStart}
//           onLoadEnd={handleLoadEnd}
//           onError={handleError}
//           onHttpError={handleError}
//           onNavigationStateChange={handleNavigationStateChange}
//           allowsFullscreenVideo={true}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={true}

//           userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
//         />

//         {/* Loading Indicator */}
//         {loading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#FF0000" />
//             <Text style={styles.loadingText}>Loading trailer...</Text>
//           </View>
//         )}

//         {/* Error State */}
//         {hasError && (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorTitle}>Unable to Load Trailer</Text>
//             <Text style={styles.errorText}>
//               There was an issue loading the trailer in the app.
//             </Text>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.openButton} onPress={handleOpenInYouTube}>
//                 <Text style={styles.openButtonText}>Open in YouTube</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#000',
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     paddingTop: 50,
//   },
//   closeButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//     marginHorizontal: 16,
//   },
//   youtubeButton: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   youtubeButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   webview: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   errorContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   errorText: {
//     color: '#ccc',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   retryButton: {
//     backgroundColor: '#333',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   openButton: {
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   openButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default VideoPlayer;














//ui=sing videoplayer//


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Modal,
//   Dimensions,
//   StatusBar,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import Video from 'react-native-video';
// import { Video as VideoType } from '../types/movie';

// const { width, height } = Dimensions.get('window');

// interface VideoPlayerProps {
//   video: VideoType | null;
//   visible: boolean;
//   onClose: () => void;
//   onEnd: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
//   video, 
//   visible, 
//   onClose, 
//   onEnd 
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [paused, setPaused] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const videoRef = useRef<Video>(null);

//   // Reset states when modal opens
//   useEffect(() => {
//     if (visible && video) {
//       setLoading(true);
//       setPaused(false);
//       setError(null);
//       console.log('Opening video player with video key:', video.key);
//     }
//   }, [visible, video]);

//   const handleLoadStart = () => {
//     console.log('Video load started');
//     setLoading(true);
//     setError(null);
//   };

//   const handleLoad = (data: any) => {
//     console.log('Video loaded successfully:', data);
//     setLoading(false);
//     setError(null);
//     // Auto-play is handled by the paused state
//   };

//   const handleError = (error: any) => {
//     console.error('Video error:', error);
//     setError('Failed to load video. The trailer might not be available in this format.');
//     setLoading(false);
//   };

//   const handleEnd = () => {
//     console.log('Video ended, closing player...');
//     onEnd(); // Auto-close when video ends
//   };

//   const handleProgress = (data: any) => {
//     // You can use this for progress tracking if needed
//   };

//   const handleBuffer = (data: any) => {
//     setLoading(data.isBuffering);
//   };

//   const handleClose = () => {
//     console.log('Manual close by user');
//     setPaused(true);
//     onClose();
//   };

//   // Get direct video URL from YouTube key
//   const getVideoUrl = (): string | null => {
//     if (!video || !video.key) return null;

//     // For YouTube videos, we can try different methods to get direct URL
//     // Note: This might not work for all videos due to YouTube restrictions
//     const videoUrl = `https://www.youtube.com/watch?v=${video.key}`;

//     // Alternative: Try to use a service that converts YouTube to direct URL
//     // For demo purposes, we'll use the YouTube URL directly
//     // In production, you might need a backend service to get direct video URLs
//     return videoUrl;
//   };

//   if (!video) return null;

//   const videoUrl = getVideoUrl();

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="fullScreen"
//       statusBarTranslucent={true}
//       onRequestClose={handleClose}
//     >
//       <StatusBar hidden={true} />
//       <View style={styles.container}>
//         {/* Header with Done button */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.closeButton} 
//             onPress={handleClose}
//           >
//             <Text style={styles.closeButtonText}>Done</Text>
//           </TouchableOpacity>
//           <Text style={styles.title} numberOfLines={1}>
//             {video.name || 'Movie Trailer'}
//           </Text>
//           <View style={styles.placeholder} />
//         </View>

//         {/* Video Player */}
//         <View style={styles.videoContainer}>
//           {videoUrl ? (
//             <Video
//               ref={videoRef}
//               source={{ uri: videoUrl }}
//               style={styles.video}
//               paused={paused}
//               onLoadStart={handleLoadStart}
//               onLoad={handleLoad}
//               onError={handleError}
//               onEnd={handleEnd}
//               onProgress={handleProgress}
//               onBuffer={handleBuffer}
//               resizeMode="contain"
//               controls={true}
//               fullscreen={true}
//               fullscreenOrientation="all"
//               ignoreSilentSwitch="ignore"
//               playWhenInactive={false}
//               playInBackground={false}
//             />
//           ) : (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>No video URL available</Text>
//             </View>
//           )}
//         </View>

//         {/* Loading Indicator */}
//         {/* {loading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#FF0000" />
//             <Text style={styles.loadingText}>Loading trailer...</Text>
//           </View>
//         )} */}

//         {/* Error State */}
//         {error && (
//           <View style={styles.errorOverlay}>
//             <Text style={styles.errorTitle}>Playback Error</Text>
//             <Text style={styles.errorText}>{error}</Text>
//             <Text style={styles.errorSubtext}>
//               This trailer might require YouTube app for playback.
//             </Text>
//             <TouchableOpacity style={styles.closeErrorButton} onPress={handleClose}>
//               <Text style={styles.closeErrorButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#000',
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     paddingTop: 50,
//   },
//   closeButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 6,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//     marginHorizontal: 16,
//   },
//   placeholder: {
//     width: 60,
//   },
//   videoContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//   },
//   video: {
//     width: '100%',
//     height: '100%',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   errorOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   errorText: {
//     color: '#ccc',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 8,
//     lineHeight: 22,
//   },
//   errorSubtext: {
//     color: '#888',
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 20,
//   },
//   closeErrorButton: {
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   closeErrorButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default VideoPlayer;
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Modal,
//   ActivityIndicator,
//   Dimensions,
//   StatusBar,
//   Linking,
//   Alert,
// } from 'react-native';
// import WebView from 'react-native-webview';
// import { Video } from '../types/movie';

// const { width, height } = Dimensions.get('window');

// interface VideoPlayerProps {
//   video: Video | null;
//   visible: boolean;
//   onClose: () => void;
//   onEnd: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
//   video, 
//   visible, 
//   onClose, 
//   onEnd 
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [showFallback, setShowFallback] = useState(false);
//   const webViewRef = useRef<WebView>(null);

//   useEffect(() => {
//     if (visible && video) {
//       setLoading(true);
//       setShowFallback(false);
//       console.log('Opening trailer with YouTube key:', video.key);

//       // Auto-close fallback after 2 minutes (typical trailer length)
//       const autoCloseTimer = setTimeout(() => {
//         console.log('Auto-close timer triggered');
//         onEnd();
//       }, 120000);

//       return () => clearTimeout(autoCloseTimer);
//     }
//   }, [visible, video]);

//   if (!video) return null;

//   // Try multiple YouTube embed formats
//   const youtubeUrls = [
//     // Standard embed
//     `https://www.youtube.com/embed/${video.key}?autoplay=1&playsinline=0&rel=0&modestbranding=1&controls=1&fs=1`,
//     // Alternative embed
//     `https://www.youtube-nocookie.com/embed/${video.key}?autoplay=1&playsinline=0`,
//     // Simple embed
//     `https://www.youtube.com/embed/${video.key}?autoplay=1`
//   ];

//   const handleLoadStart = () => {
//     setLoading(true);
//     setShowFallback(false);
//   };

//   const handleLoadEnd = () => {
//     setLoading(false);
//   };

//   const handleError = () => {
//     console.log('WebView error - showing fallback options');
//     setLoading(false);
//     setShowFallback(true);
//   };

//   const handleOpenInYouTube = async () => {
//     try {
//       const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
//       const youtubeAppUrl = `vnd.youtube://watch?v=${video.key}`;

//       // Try to open YouTube app first
//       const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
//       if (canOpenApp) {
//         await Linking.openURL(youtubeAppUrl);
//       } else {
//         // Fallback to browser
//         await Linking.openURL(youtubeUrl);
//       }

//       // Close the modal since we're opening external app
//       onClose();

//       // Simulate auto-close after typical trailer duration
//       setTimeout(() => {
//         onEnd();
//       }, 90000);

//     } catch (error) {
//       Alert.alert('Error', 'Could not open YouTube');
//     }
//   };

//   const handleRetry = () => {
//     setLoading(true);
//     setShowFallback(false);
//     if (webViewRef.current) {
//       webViewRef.current.reload();
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="fullScreen"
//       statusBarTranslucent={true}
//       onRequestClose={onClose}
//     >
//       <StatusBar hidden={true} />
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.closeButton} 
//             onPress={onClose}
//           >
//             <Text style={styles.closeButtonText}>Done</Text>
//           </TouchableOpacity>
//           <Text style={styles.title} numberOfLines={1}>
//             {video.name || 'Movie Trailer'}
//           </Text>
//           <View style={styles.placeholder} />
//         </View>

//         {/* WebView or Fallback Options */}
//         {!showFallback ? (
//           <>
//             <WebView
//               ref={webViewRef}
//               source={{ uri: youtubeUrls[0] }}
//               style={styles.webview}
//               onLoadStart={handleLoadStart}
//               onLoadEnd={handleLoadEnd}
//               onError={handleError}
//               onHttpError={handleError}
//               allowsFullscreenVideo={true}
//               javaScriptEnabled={true}
//               domStorageEnabled={true}
//               startInLoadingState={true}
//             />

//             {/* Loading Indicator */}
//             {loading && (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#FF0000" />
//                 <Text style={styles.loadingText}>Loading trailer...</Text>
//               </View>
//             )}
//           </>
//         ) : (
//           /* Fallback Options */
//           <View style={styles.fallbackContainer}>
//             <Text style={styles.fallbackTitle}>Trailer Playback Restricted</Text>
//             <Text style={styles.fallbackText}>
//               This trailer cannot be played in the app due to YouTube restrictions.{'\n\n'}
//               You can watch it directly in the YouTube app.
//             </Text>

//             <View style={styles.fallbackButtons}>
//               <TouchableOpacity style={styles.youtubeButton} onPress={handleOpenInYouTube}>
//                 <Text style={styles.youtubeButtonText}>Open in YouTube</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.closeFallbackButton} onPress={onClose}>
//                 <Text style={styles.closeFallbackButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#000',
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//     paddingTop: 50,
//   },
//   closeButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 6,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//     marginHorizontal: 16,
//   },
//   placeholder: {
//     width: 60,
//   },
//   webview: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   fallbackContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//     padding: 20,
//   },
//   fallbackTitle: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   fallbackText: {
//     color: '#ccc',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 30,
//     lineHeight: 22,
//   },
//   fallbackButtons: {
//     width: '100%',
//     maxWidth: 300,
//     gap: 12,
//   },
//   youtubeButton: {
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   youtubeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   retryButton: {
//     backgroundColor: '#333',
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   closeFallbackButton: {
//     paddingHorizontal: 24,
//     paddingVertical: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#666',
//     alignItems: 'center',
//   },
//   closeFallbackButtonText: {
//     color: '#ccc',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default VideoPlayer;



// import React, { useRef, useCallback, useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     Modal,
//     StatusBar,
//     ActivityIndicator,
//     Dimensions,
// } from 'react-native';
// import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
// import { Video } from '../types/movie';

// const { width, height } = Dimensions.get('window');

// interface VideoPlayerProps {
//     video: Video | null;
//     visible: boolean;
//     onClose: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
//     const playerRef = useRef<YoutubeIframeRef>(null);
//     const [playing, setPlaying] = useState(true);
//     const [loading, setLoading] = useState(true);

//     console.log("playingplaying", playing);


//     // 🎬 Automatically close player when video ends
//     const onStateChange = useCallback(
//         (state: string) => {
//             if (state === 'ended') {
//                 console.log('Trailer ended');
//                 setPlaying(false);
//                 onClose();
//             }
//         },
//         [onClose]
//     );

//     if (!video) return null;

//     return (
//         <Modal
//             visible={visible}
//             animationType="slide"
//             onRequestClose={onClose}
//             presentationStyle="fullScreen"
//         >
//             <StatusBar hidden={false} backgroundColor="#000" barStyle="light-content" />
//             <View style={styles.container}>
//                 {/* Header */}
//                 <View style={styles.header}>
//                     <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                         <Text style={styles.closeText}>Done</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.title} numberOfLines={1}>
//                         {video.name || 'Trailer'}
//                     </Text>
//                     <View style={{ width: 60 }} />
//                 </View>

//                 {/* YouTube Player */}
//                 <View style={styles.videoContainer}>
//                     {/* <YoutubePlayer
//                         ref={playerRef}
//                         height={height * 0.35}
//                         width={width}
//                         play={true}
//                         videoId={video.key}
//                         onChangeState={onStateChange}
//                         onReady={() => setLoading(false)}
//                         webViewStyle={{ opacity: loading ? 0 : 1 }}

//                     /> */}

//                     <YoutubePlayer
//                         ref={playerRef}
//                         height={height * 0.4}
//                         width={width}
//                         play={true}                // ✅ starts automatically
//                         videoId={video.key}
//                         onChangeState={onStateChange}
//                     />

//                     {loading && (
//                         <View style={styles.loadingContainer}>
//                             <ActivityIndicator size="large" color="#FF0000" />
//                             <Text style={styles.loadingText}>Loading trailer...</Text>
//                         </View>
//                     )}
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#000',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingTop: 50,
//         paddingHorizontal: 16,
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#222',
//     },
//     closeButton: {
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         borderRadius: 8,
//     },
//     closeText: { color: '#fff', fontSize: 16, fontWeight: '600' },
//     title: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//         flex: 1,
//         textAlign: 'center',
//         marginHorizontal: 16,
//     },
//     videoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//     loadingContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#000',
//     },
//     loadingText: { color: '#fff', marginTop: 8, fontSize: 16 },
// });

// export default VideoPlayer;

// import React, { useRef, useCallback, useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     Modal,
//     StatusBar,
//     ActivityIndicator,
//     Dimensions,
//     Alert,
// } from 'react-native';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import { Video } from '../types/movie';

// const { width, height } = Dimensions.get('window');

// interface VideoPlayerProps {
//     video: Video | null;
//     visible: boolean;
//     onClose: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
//     const playerRef = useRef<any>(null);
//     const [playing, setPlaying] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [playerReady, setPlayerReady] = useState(false);
//     const [isFullscreen, setIsFullscreen] = useState(false);

//     // Reset when modal opens
//     useEffect(() => {
//         if (visible && video) {
//             console.log('🎬 Opening trailer:', video.key);
//             setLoading(true);
//             setPlayerReady(false);
//             setPlaying(false);
//             setIsFullscreen(false);
//         } else {
//             setPlaying(false);
//         }
//     }, [visible, video]);

//     // Force auto-play when player is ready
//     useEffect(() => {
//         if (playerReady && visible && !isFullscreen) {
//             console.log('🚀 Player ready - starting auto-play');
//             setPlaying(true);

//             const playAttempt = setTimeout(() => {
//                 console.log('🔄 Auto-play attempt');
//                 setPlaying(true);
//             }, 1000);

//             return () => clearTimeout(playAttempt);
//         }
//     }, [playerReady, visible, isFullscreen]);

//     const onReady = useCallback(() => {
//         console.log('✅ Player ready callback');
//         setLoading(false);
//         setPlayerReady(true);
//     }, []);

//     const onStateChange = useCallback(
//         (state: string) => {
//             console.log('📹 Player state:', state);

//             if (state === 'ended') {
//                 console.log('⏹️ Trailer ended');
//                 setPlaying(false);
//                 setIsFullscreen(false);
//                 onClose();
//             }

//             if (state === 'playing') {
//                 console.log('▶️ Video is playing!');
//                 setLoading(false);
//                 // When video starts playing, force fullscreen
//                 if (!isFullscreen) {
//                     console.log('🔄 Entering fullscreen mode');
//                     setIsFullscreen(true);
//                     // Trigger fullscreen via ref if available
//                     setTimeout(() => {
//                         if (playerRef.current) {
//                             playerRef.current.seekTo(0); // Small hack to ensure fullscreen
//                         }
//                     }, 500);
//                 }
//             }

//             if (state === 'paused') {
//                 console.log('⏸️ Video paused');
//             }

//             if (state === 'buffering') {
//                 console.log('🔄 Buffering');
//             }
//         },
//         [onClose, isFullscreen]
//     );

//     const onError = useCallback((error: string) => {
//         console.log('❌ Player error:', error);
//         setLoading(false);
//     }, []);

//     const handleClose = () => {
//         console.log('👋 Manual close');
//         setPlaying(false);
//         setIsFullscreen(false);
//         onClose();
//     };

//     // Manual play that forces fullscreen
//     const forcePlayAndFullscreen = () => {
//         console.log('💥 Manual play with fullscreen');
//         setPlaying(true);
//         setIsFullscreen(true);

//         // Force fullscreen after a short delay
//         setTimeout(() => {
//             setPlaying(true);
//         }, 100);
//     };

//     // Enter fullscreen manually
//     const enterFullscreen = () => {
//         console.log('🔄 Manually entering fullscreen');
//         setIsFullscreen(true);
//         setPlaying(true);
//     };

//     if (!video) return null;

//     return (
//         <Modal
//             visible={visible}
//             animationType="slide"
//             onRequestClose={handleClose}
//             presentationStyle="fullScreen"
//             statusBarTranslucent={true}
//         >
//             <StatusBar hidden={isFullscreen} />
//             <View style={styles.container}>
//                 {/* Header - Only show when not in fullscreen */}
//                 {!isFullscreen && (
//                     <View style={styles.header}>
//                         <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
//                             <Text style={styles.closeText}>Done</Text>
//                         </TouchableOpacity>
//                         <Text style={styles.title} numberOfLines={1}>
//                             {video.name || 'Trailer'}
//                         </Text>
//                         <TouchableOpacity style={styles.playButton} onPress={forcePlayAndFullscreen}>
//                             <Text style={styles.playText}>Play</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}

//                 {/* YouTube Player - Fullscreen when playing */}
//                 <View style={[
//                     styles.playerContainer,
//                     isFullscreen ? styles.fullscreenContainer : styles.centeredContainer
//                 ]}>
//                     <YoutubePlayer
//                         ref={playerRef}
//                         height={isFullscreen ? height : 300}
//                         width={isFullscreen ? width : width * 0.9}
//                         play={playing}
//                         videoId={video.key}
//                         onChangeState={onStateChange}
//                         onReady={onReady}
//                         onError={onError}
//                         initialPlayerParams={{
//                             controls: 1,
//                             modestbranding: 1,
//                             rel: 0,
//                             iv_load_policy: 3,
//                             autoplay: isFullscreen ? 1 : 0, // Only autoplay in fullscreen
//                             fs: 1, // Enable fullscreen button
//                             playsinline: isFullscreen ? 0 : 1, // Fullscreen when playing, inline when not
//                         }}
//                         webViewProps={{
//                             allowsFullscreenVideo: true,
//                         }}
//                     />

//                     {loading && (
//                         <View style={[
//                             styles.loadingContainer,
//                             isFullscreen && styles.fullscreenLoading
//                         ]}>
//                             <ActivityIndicator size="large" color="#FF0000" />
//                             <Text style={styles.loadingText}>
//                                 {isFullscreen ? 'Loading fullscreen trailer...' : 'Loading trailer...'}
//                             </Text>
//                             {!isFullscreen && (
//                                 <TouchableOpacity style={styles.fullscreenButton} onPress={enterFullscreen}>
//                                     <Text style={styles.fullscreenText}>Open in Fullscreen</Text>
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     )}

//                     {/* Fullscreen close button */}
//                     {isFullscreen && (
//                         <TouchableOpacity style={styles.fullscreenCloseButton} onPress={handleClose}>
//                             <Text style={styles.fullscreenCloseText}>✕</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 {/* Debug Info */}
//                 {!isFullscreen && (
//                     <View style={styles.debugContainer}>
//                         <Text style={styles.debugText}>
//                             Status: {loading ? 'Loading' : playing ? 'Playing' : 'Paused'} | 
//                             Fullscreen: {isFullscreen ? 'Yes' : 'No'}
//                         </Text>
//                     </View>
//                 )}
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#000',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingTop: 50,
//         paddingHorizontal: 16,
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#222',
//         backgroundColor: '#000',
//     },
//     closeButton: {
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         borderRadius: 8,
//     },
//     closeText: { 
//         color: '#fff', 
//         fontSize: 16, 
//         fontWeight: '600' 
//     },
//     playButton: {
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         backgroundColor: '#FF0000',
//         borderRadius: 8,
//     },
//     playText: { 
//         color: '#fff', 
//         fontSize: 16, 
//         fontWeight: '600' 
//     },
//     title: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//         flex: 1,
//         textAlign: 'center',
//         marginHorizontal: 16,
//     },
//     playerContainer: {
//         backgroundColor: '#000',
//     },
//     centeredContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     fullscreenContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     loadingContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.8)',
//     },
//     fullscreenLoading: {
//         backgroundColor: '#000',
//     },
//     loadingText: { 
//         color: '#fff', 
//         marginTop: 8, 
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     fullscreenButton: {
//         marginTop: 16,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         backgroundColor: '#FF0000',
//         borderRadius: 8,
//     },
//     fullscreenText: {
//         color: '#fff',
//         fontSize: 14,
//         fontWeight: '600',
//     },
//     fullscreenCloseButton: {
//         position: 'absolute',
//         top: 50,
//         right: 20,
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     fullscreenCloseText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     debugContainer: {
//         position: 'absolute',
//         bottom: 20,
//         left: 0,
//         right: 0,
//         alignItems: 'center',
//     },
//     debugText: {
//         color: '#666',
//         fontSize: 12,
//         textAlign: 'center',
//     },
// });

// export default VideoPlayer;

//WORKS FINE //

// import React, { useState, useRef, useEffect } from 'react';

// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Modal,
//   ActivityIndicator,
//   StatusBar,
//   Linking,
//   Alert,
//   BackHandler, 
// } from 'react-native';
// import WebView from 'react-native-webview';
// import { Video } from '../types/movie';

// interface VideoPlayerProps {
//   video: Video | null;
//   visible: boolean;
//   onClose: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const webViewRef = useRef<WebView>(null);

//   // Reset states when modal opens
//   useEffect(() => {
//     if (visible && video) {
//       setLoading(true);
//       setHasError(false);
//       console.log('Opening trailer with key:', video.key);
//     }
//   }, [visible, video]);

//   // Handle Android back button
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       if (visible) {
//         onClose();
//         return true;
//       }
//       return false;
//     });

//     return () => backHandler.remove();
//   }, [visible, onClose]);

//   if (!video) return null;

//   // Mobile YouTube URL that works better on mobile devices
//   const youtubeUrl = `https://m.youtube.com/watch?v=${video.key}&autoplay=1`;

//   const handleLoadStart = () => {
//     setLoading(true);
//     setHasError(false);
//   };

//   const handleLoadEnd = () => {
//     setLoading(false);

//     // Inject JavaScript to monitor video end and auto-fullscreen
//     if (webViewRef.current) {
//       webViewRef.current.injectJavaScript(`
//         (function() {
//           let checkInterval;
//           let videoStarted = false;
//           let isInFullscreen = false;

//           function checkVideoState() {
//             try {
//               const video = document.querySelector('video');
//               if (video) {
//                 // Try to enter fullscreen when video starts playing
//                 if (!videoStarted && !video.paused && video.currentTime > 0) {
//                   videoStarted = true;

//                   // Request fullscreen
//                   setTimeout(() => {
//                     if (video.requestFullscreen) {
//                       video.requestFullscreen().catch(() => {});
//                     } else if (video.webkitEnterFullscreen) {
//                       video.webkitEnterFullscreen();
//                     } else if (video.webkitRequestFullscreen) {
//                       video.webkitRequestFullscreen();
//                     }
//                   }, 500);
//                 }

//                 // Check if video ended
//                 if (video.ended) {
//                   window.ReactNativeWebView.postMessage(JSON.stringify({
//                     type: 'VIDEO_ENDED'
//                   }));
//                   if (checkInterval) clearInterval(checkInterval);
//                 }

//                 // Check current time periodically
//                 if (videoStarted && video.duration > 0) {
//                   const timeLeft = video.duration - video.currentTime;
//                   if (timeLeft < 0.5 && timeLeft > 0) {
//                     window.ReactNativeWebView.postMessage(JSON.stringify({
//                       type: 'VIDEO_ENDING'
//                     }));
//                   }
//                 }
//               }
//             } catch (e) {
//               console.log('Error checking video state:', e);
//             }
//           }

//           // Listen for fullscreen changes
//           document.addEventListener('fullscreenchange', () => {
//             if (!document.fullscreenElement && videoStarted) {
//               window.ReactNativeWebView.postMessage(JSON.stringify({
//                 type: 'FULLSCREEN_EXIT'
//               }));
//             }
//           });

//           document.addEventListener('webkitfullscreenchange', () => {
//             if (!document.webkitFullscreenElement && videoStarted) {
//               window.ReactNativeWebView.postMessage(JSON.stringify({
//                 type: 'FULLSCREEN_EXIT'
//               }));
//             }
//           });

//           // Start checking video state
//           checkInterval = setInterval(checkVideoState, 500);

//           // Cleanup after 10 minutes
//           setTimeout(() => {
//             if (checkInterval) clearInterval(checkInterval);
//           }, 600000);

//         })();
//         true;
//       `);
//     }
//   };

//   const handleError = (syntheticEvent: any) => {
//     const { nativeEvent } = syntheticEvent;
//     console.log('WebView error:', nativeEvent);
//     setHasError(true);
//     setLoading(false);
//   };

//   const handleMessage = (event: any) => {
//     try {
//       const data = JSON.parse(event.nativeEvent.data);
//       console.log('Received message:', data);

//       if (data.type === 'VIDEO_ENDED' || data.type === 'FULLSCREEN_EXIT') {
//         // Close after a short delay
//         setTimeout(() => {
//           onClose();
//         }, 500);
//       }
//     } catch (error) {
//       console.log('Error parsing message:', error);
//     }
//   };

//   const handleNavigationStateChange = (navState: any) => {
//     console.log('Navigation URL:', navState.url);

//     // Don't close on redirects within YouTube
//     if (navState.url.includes('consent.youtube.com') || 
//         navState.url.includes('accounts.google.com')) {
//       // Let the consent/login flow happen
//       return;
//     }

//     if (!navState.loading && navState.url.includes('youtube.com/watch')) {
//       setLoading(false);
//     }
//   };

//   const handleRetry = () => {
//     setLoading(true);
//     setHasError(false);
//     if (webViewRef.current) {
//       webViewRef.current.reload();
//     }
//   };

//   const handleOpenInYouTube = async () => {
//     try {
//       const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
//       const youtubeAppUrl = `vnd.youtube://watch?v=${video.key}`;

//       // Try to open YouTube app first
//       const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
//       if (canOpenApp) {
//         await Linking.openURL(youtubeAppUrl);
//         onClose();
//       } else {
//         // Fallback to browser
//         await Linking.openURL(youtubeUrl);
//         onClose();
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Could not open YouTube');
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="fullScreen"
//       statusBarTranslucent={true}
//       onRequestClose={onClose}
//     >
//       <StatusBar hidden={true} backgroundColor="#000" barStyle="light-content" />
//       <View style={styles.container}>
//         {/* Floating Close Button */}
//         <TouchableOpacity 
//           style={styles.floatingCloseButton} 
//           onPress={onClose}
//         >
//           <Text style={styles.closeButtonText}>✕</Text>
//         </TouchableOpacity>

//         {/* WebView */}
//         <WebView
//           ref={webViewRef}
//           source={{ uri: youtubeUrl }}
//           style={styles.webview}
//           onLoadStart={handleLoadStart}
//           onLoadEnd={handleLoadEnd}
//           onError={handleError}
//           onHttpError={handleError}
//           onNavigationStateChange={handleNavigationStateChange}
//           onMessage={handleMessage}
//           allowsFullscreenVideo={true}
//           allowsInlineMediaPlayback={false}
//           mediaPlaybackRequiresUserAction={false}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={true}
//           sharedCookiesEnabled={true}
//           thirdPartyCookiesEnabled={true}
//           userAgent="Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
//         />

//         {/* Loading Indicator */}
//         {loading && !hasError && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#FF0000" />
//             <Text style={styles.loadingText}>Loading trailer...</Text>
//             <TouchableOpacity 
//               style={styles.skipButton}
//               onPress={handleOpenInYouTube}
//             >
//               <Text style={styles.skipButtonText}>Open in YouTube App</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Error State */}
//         {hasError && (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorTitle}>Unable to Load Trailer</Text>
//             <Text style={styles.errorText}>
//               This video cannot be played in the embedded player.
//             </Text>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.openButton} onPress={handleOpenInYouTube}>
//                 <Text style={styles.openButtonText}>Open in YouTube</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   floatingCloseButton: {
//     position: 'absolute',
//     top: 50,
//     right: 16,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 999,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   webview: {
//     flex: 1,
//     backgroundColor: '#000',
//     top:30
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   skipButton: {
//     marginTop: 24,
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   skipButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   errorContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   errorText: {
//     color: '#ccc',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   retryButton: {
//     backgroundColor: '#333',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   openButton: {
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   openButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default VideoPlayer;




//WORKS no 1 minute issue //

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Modal,
//   ActivityIndicator,
//   StatusBar,
//   Linking,
//   Alert,
//   BackHandler,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import WebView from 'react-native-webview';
// import { Video } from '../types/movie';

// interface VideoPlayerProps {
//   video: Video | null;
//   visible: boolean;
//   onClose: () => void;
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [hasError, setHasError] = useState(false);
//   const webViewRef = useRef<WebView>(null);

//   // Reset states when modal opens
//   useEffect(() => {
//     if (visible && video) {
//       setLoading(true);
//       setHasError(false);
//       console.log('Opening trailer with key:', video.key);
//     }
//   }, [visible, video]);

//   // Handle Android back button
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       if (visible) {
//         onClose();
//         return true;
//       }
//       return false;
//     });

//     return () => backHandler.remove();
//   }, [visible, onClose]);

//   if (!video) return null;

//   // Use embed URL with autoplay and mute to bypass restrictions
//   const youtubeUrl = `https://www.youtube.com/embed/${video.key}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;

//   const handleLoadStart = () => {
//     setLoading(true);
//     setHasError(false);
//   };

//   const handleLoadEnd = () => {
//     setLoading(false);
    
//     // Inject a simple script to unmute after autoplay starts
//     setTimeout(() => {
//       if (webViewRef.current) {
//         webViewRef.current.injectJavaScript(`
//           (function() {
//             try {
//               const video = document.querySelector('video');
//               if (video) {
//                 video.muted = false;
//                 video.volume = 1.0;
//               }
//             } catch(e) {}
//           })();
//           true;
//         `);
//       }
//     }, 2000);
//   };

//   const handleError = (syntheticEvent: any) => {
//     const { nativeEvent } = syntheticEvent;
//     console.log('WebView error:', nativeEvent);
//     setHasError(true);
//     setLoading(false);
//   };

//   const handleNavigationStateChange = (navState: any) => {
//     console.log('Navigation URL:', navState.url);
    
//     // Don't interfere with YouTube embed
//     if (!navState.loading) {
//       setLoading(false);
//     }
//   };

//   const handleRetry = () => {
//     setLoading(true);
//     setHasError(false);
//     if (webViewRef.current) {
//       webViewRef.current.reload();
//     }
//   };

//   const handleOpenInYouTube = async () => {
//     try {
//       const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
//       const youtubeAppUrl = `vnd.youtube://watch?v=${video.key}`;

//       // Try to open YouTube app first
//       const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
//       if (canOpenApp) {
//         await Linking.openURL(youtubeAppUrl);
//         onClose();
//       } else {
//         // Fallback to browser
//         await Linking.openURL(youtubeUrl);
//         onClose();
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Could not open YouTube');
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       presentationStyle="fullScreen"
//       statusBarTranslucent={false}
//       onRequestClose={onClose}
//     >
//       <StatusBar backgroundColor="#000" barStyle="light-content" />
//       <SafeAreaView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity 
//             style={styles.doneButton} 
//             onPress={onClose}
//           >
//             <Text style={styles.doneButtonText}>Done</Text>
//           </TouchableOpacity>
//           <Text style={styles.title} numberOfLines={1}>
//             {video.name || 'Trailer'}
//           </Text>
//           <TouchableOpacity 
//             style={styles.youtubeButton}
//             onPress={handleOpenInYouTube}
//           >
//             <Text style={styles.youtubeButtonText}>YouTube</Text>
//           </TouchableOpacity>
//         </View>

//         {/* WebView */}
//         <WebView
//           ref={webViewRef}
//           source={{ uri: youtubeUrl }}
//           style={styles.webview}
//           onLoadStart={handleLoadStart}
//           onLoadEnd={handleLoadEnd}
//           onError={handleError}
//           onHttpError={handleError}
//           onNavigationStateChange={handleNavigationStateChange}
//           allowsFullscreenVideo={true}
//           allowsInlineMediaPlayback={false}
//           mediaPlaybackRequiresUserAction={false}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={false}
//           sharedCookiesEnabled={true}
//           thirdPartyCookiesEnabled={true}
//           cacheEnabled={false}
//           incognito={false}
//           setSupportMultipleWindows={false}
//           userAgent="Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
//         />

//         {/* Loading Indicator */}
//         {loading && !hasError && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#FF0000" />
//             <Text style={styles.loadingText}>Loading trailer...</Text>
//             <TouchableOpacity 
//               style={styles.skipButton}
//               onPress={handleOpenInYouTube}
//             >
//               <Text style={styles.skipButtonText}>Open in YouTube App</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Error State */}
//         {hasError && (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorTitle}>Unable to Load Trailer</Text>
//             <Text style={styles.errorText}>
//               This video cannot be played in the embedded player.
//             </Text>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
//                 <Text style={styles.retryButtonText}>Try Again</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.openButton} onPress={handleOpenInYouTube}>
//                 <Text style={styles.openButtonText}>Open in YouTube</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#000',
//     borderBottomWidth: 1,
//     borderBottomColor: '#333',
//   },
//   doneButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     justifyContent: 'center',
//   },
//   doneButtonText: {
//     color: '#007AFF',
//     fontSize: 17,
//     fontWeight: '600',
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//     marginHorizontal: 12,
//   },
//   youtubeButton: {
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 6,
//   },
//   youtubeButtonText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   webview: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#fff',
//     marginTop: 12,
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   skipButton: {
//     marginTop: 24,
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   skipButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   errorContainer: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   errorText: {
//     color: '#ccc',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 22,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   retryButton: {
//     backgroundColor: '#333',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   openButton: {
//     backgroundColor: '#FF0000',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   openButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default VideoPlayer;







//EVERY THINGS WORKS FINE///

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  StatusBar,
  Linking,
  Alert,
  BackHandler, 
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';
import { Video } from '../types/movie';
import { SafeAreaView } from 'react-native-safe-area-context';

interface VideoPlayerProps {
  video: Video | null;
  visible: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (visible && video) {
      setLoading(true);
      setHasError(false);
      console.log('Opening trailer with key:', video.key);
    }
  }, [visible, video]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible, onClose]);

  if (!video) return null;
  const youtubeUrl = `https://www.youtube.com/embed/${video.key}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;

  const handleLoadStart = () => {
    setLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setTimeout(() => {
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          (function() {
            if (window.__videoEndDetectorInitialized) return;
            window.__videoEndDetectorInitialized = true;
            
            try {
              const video = document.querySelector('video');
              if (video) {
                // Unmute video
                video.muted = false;
                video.volume = 1.0;
                
                // Listen for video end
                video.addEventListener('ended', function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'VIDEO_ENDED'
                  }));
                });
                
                // Also check periodically as backup
                let lastTime = 0;
                setInterval(function() {
                  if (video.ended) {
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'VIDEO_ENDED'
                    }));
                  }
                  lastTime = video.currentTime;
                }, 2000);
              }
            } catch(e) {
              console.log('Error setting up video listener:', e);
            }
          })();
          true;
        `);
      }
    }, 2000);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.log('WebView error:', nativeEvent);
    setHasError(true);
    setLoading(false);
  };

  const handleNavigationStateChange = (navState: any) => {
    console.log('Navigation URL:', navState.url);
    
    if (!navState.loading) {
      setLoading(false);
    }
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('Received message:', data);
      
      if (data.type === 'VIDEO_ENDED') {
        console.log('Video ended, closing player');
        // Close and navigate back to movie detail screen
        onClose();
      }
    } catch (error) {
      console.log('Error parsing message:', error);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setHasError(false);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const handleOpenInYouTube = async () => {
    try {
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
      const youtubeAppUrl = `vnd.youtube://watch?v=${video.key}`;

      const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
      if (canOpenApp) {
        await Linking.openURL(youtubeAppUrl);
        onClose();
      } else {
        await Linking.openURL(youtubeUrl);
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Could not open YouTube');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent={false}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.doneButton} 
            onPress={onClose}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {video.name || 'Trailer'}
          </Text>
          <TouchableOpacity 
            style={styles.youtubeButton}
            onPress={handleOpenInYouTube}
          >
            <Text style={styles.youtubeButtonText}>YouTube</Text>
          </TouchableOpacity>
        </View>

        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{ uri: youtubeUrl }}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onHttpError={handleError}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={handleMessage}
          allowsFullscreenVideo={true}
          allowsInlineMediaPlayback={false}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          cacheEnabled={false}
          incognito={false}
          setSupportMultipleWindows={false}
          userAgent="Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        />

        {/* Loading Indicator */}
        {loading && !hasError && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
            <Text style={styles.loadingText}>Loading trailer...</Text>
          </View>
        )}

        {/* Error State */}
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Unable to Load Trailer</Text>
            <Text style={styles.errorText}>
              This video cannot be played in the embedded player.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.openButton} onPress={handleOpenInYouTube}>
                <Text style={styles.openButtonText}>Open in YouTube</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  doneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  youtubeButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  youtubeButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  skipButton: {
    marginTop: 24,
    backgroundColor: '#FF0000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  openButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  openButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VideoPlayer;