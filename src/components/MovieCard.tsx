import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onPress }) => {
  const imageUrl =
    movie.backdrop_path || movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`
      : undefined;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden', 
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MovieCard;
