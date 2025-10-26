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
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => handleMoviePress(item)}
            >
              <Image
                source={{
                  uri: item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image',
                }}
                style={styles.poster}
              />
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No movies found for {genreName}</Text>
          }
        />
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
});

export default GenreMovies;
