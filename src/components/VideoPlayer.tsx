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
  SafeAreaView,
  Platform,
} from 'react-native';
import WebView from 'react-native-webview';
import { Video } from '../types/movie';

interface VideoPlayerProps {
  video: Video | null;
  visible: boolean;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, visible, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // Reset states when modal opens
  useEffect(() => {
    if (visible && video) {
      setLoading(true);
      setHasError(false);
      console.log('Opening trailer with key:', video.key);
    }
  }, [visible, video]);

  // Handle Android back button
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

  // Mobile YouTube URL - works better than embed for autoplay
  const youtubeUrl = `https://m.youtube.com/watch?v=${video.key}&autoplay=1`;

  const handleLoadStart = () => {
    setLoading(true);
    setHasError(false);
  };

//   const handleLoadEnd = () => {
//     setLoading(false);
    
//     // Inject script to detect video end with multiple approaches
//     setTimeout(() => {
//       if (webViewRef.current) {
//         webViewRef.current.injectJavaScript(`
//           (function() {
//             if (window.__videoEndListenerAdded) return;
//             window.__videoEndListenerAdded = true;
            
//             let videoFound = false;
//             let checkCount = 0;
            
//             function setupVideoEndListener() {
//               const video = document.querySelector('video');
//               if (video) {
//                 videoFound = true;
//                 console.log('Video element found');
                
//                 // Add ended event listener
//                 video.addEventListener('ended', function() {
//                   console.log('Video ended - event listener');
//                   window.ReactNativeWebView.postMessage('VIDEO_ENDED');
//                 });
                
//                 // Also poll as backup (check every 2 seconds)
//                 setInterval(function() {
//                   if (video.ended) {
//                     console.log('Video ended - polling detected');
//                     window.ReactNativeWebView.postMessage('VIDEO_ENDED');
//                   }
//                 }, 2000);
                
//                 return true;
//               }
//               return false;
//             }
            
//             // Try immediately
//             if (!setupVideoEndListener()) {
//               // Keep trying every 500ms for up to 15 seconds
//               const findVideoInterval = setInterval(function() {
//                 checkCount++;
//                 console.log('Looking for video... attempt', checkCount);
                
//                 if (setupVideoEndListener() || checkCount > 30) {
//                   clearInterval(findVideoInterval);
//                   if (!videoFound) {
//                     console.log('Video element not found after 30 attempts');
//                   }
//                 }
//               }, 500);
//             }
//           })();
//           true;
//         `);
//       }
//     }, 1500);
//   };




  const handleLoadEnd = () => {
    console.log('WebView load ended');
    setLoading(false);
    
    // Inject JavaScript with multiple attempts
    const injectScript = (attempt = 0) => {
      if (attempt > 3 || !webViewRef.current) return;
      
      setTimeout(() => {
        if (webViewRef.current) {
          console.log(`Injecting script, attempt ${attempt + 1}`);
          webViewRef.current.injectJavaScript(`
            (function() {
              try {
                console.log('Script injection started');
                
                // Find video element with retries
                var findVideo = function(attempts) {
                  if (attempts > 10) {
                    console.log('Video element not found after 10 attempts');
                    return;
                  }
                  
                  var video = document.querySelector('video');
                  if (!video) {
                    console.log('Video not found, retry ' + attempts);
                    setTimeout(function() { findVideo(attempts + 1); }, 500);
                    return;
                  }
                  
                  console.log('Video element found!');
                  
                  // Unmute
                  video.muted = false;
                  video.volume = 1.0;
                  
                  // Try to enter fullscreen with multiple methods
                  var enterFullscreen = function() {
                    try {
                      if (video.webkitEnterFullscreen) {
                        video.webkitEnterFullscreen();
                        console.log('Entered fullscreen (webkit)');
                      } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                        console.log('Entered fullscreen (webkitRequest)');
                      } else if (video.requestFullscreen) {
                        video.requestFullscreen();
                        console.log('Entered fullscreen (standard)');
                      } else if (video.mozRequestFullScreen) {
                        video.mozRequestFullScreen();
                        console.log('Entered fullscreen (moz)');
                      } else if (video.msRequestFullscreen) {
                        video.msRequestFullscreen();
                        console.log('Entered fullscreen (ms)');
                      } else {
                        console.log('No fullscreen method available');
                      }
                    } catch(e) {
                      console.log('Fullscreen error:', e);
                    }
                  };
                  
                  // Try fullscreen after video starts playing
                  video.addEventListener('playing', function() {
                    console.log('Video is playing');
                    setTimeout(enterFullscreen, 300);
                  });
                  
                  // Also try immediately
                  setTimeout(enterFullscreen, 1000);
                  
                  // Try clicking play if paused
                  if (video.paused) {
                    setTimeout(function() {
                      video.play().then(function() {
                        console.log('Video play started');
                      }).catch(function(e) {
                        console.log('Play error:', e);
                      });
                    }, 500);
                  }
                  
                  // Listen for video end - send message to close player
                  video.addEventListener('ended', function() {
                    console.log('Video ended - sending close message');
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'VIDEO_ENDED'
                    }));
                  });
                  
                  // Periodic check for video end
                  var checkCount = 0;
                  var checkInterval = setInterval(function() {
                    checkCount++;
                    if (video.ended) {
                      console.log('Video ended detected in interval check');
                      clearInterval(checkInterval);
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'VIDEO_ENDED'
                      }));
                    }
                    // Stop checking after 2 hours
                    if (checkCount > 3600) {
                      clearInterval(checkInterval);
                    }
                  }, 2000);
                };
                
                findVideo(0);
                
              } catch(e) {
                console.log('Error in script:', e);
              }
            })();
            true;
          `);
        }
      }, attempt * 1000 + 1500);
    };
    
    // Try injection multiple times
    injectScript(0);
    injectScript(1);
    injectScript(2);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.log('WebView error:', nativeEvent);
    setHasError(true);
    setLoading(false);
  };

  const handleNavigationStateChange = (navState: any) => {
    console.log('Navigation URL:', navState.url);
    
    // Don't interfere with YouTube
    if (!navState.loading && navState.url.includes('youtube.com')) {
      setLoading(false);
    }
  };

//   const handleMessage = (event: any) => {
//     const message = event.nativeEvent.data;
//     console.log('Received message:', message);
    
//     if (message === 'VIDEO_ENDED') {
//       console.log('Video ended, closing player');
//       onClose();
//     }
//   };

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

      // Try to open YouTube app first
      const canOpenApp = await Linking.canOpenURL(youtubeAppUrl);
      if (canOpenApp) {
        await Linking.openURL(youtubeAppUrl);
        onClose();
      } else {
        // Fallback to browser
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
        {/* Header */}
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