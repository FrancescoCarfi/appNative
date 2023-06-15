import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface NewsItem {
  urlToImage: string;
  title: string;
  description: string;
}

type SingleNewsNavigationProp = StackNavigationProp<RootStackParamList, 'SingleNews'>;
type SingleNewsRouteProp = RouteProp<RootStackParamList, 'SingleNews'>;

type Props = {
  route: SingleNewsRouteProp;
  navigation: SingleNewsNavigationProp;
};

const SingleNews: React.FC<Props> = ({ route, navigation }) => {
  const { newsItem } = route.params;
  const { urlToImage, title, description } = newsItem;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteNews();
  }, []);

  const checkFavoriteNews = async () => {
    try {
      const favoriteNewsItemsJSON = await AsyncStorage.getItem('favoriteNewsItems');
      if (favoriteNewsItemsJSON) {
        const favoriteNewsItems = JSON.parse(favoriteNewsItemsJSON);
        const isFavorite = favoriteNewsItems.some((item: NewsItem) => item.title === title);
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const favoriteNewsItemsJSON = await AsyncStorage.getItem('favoriteNewsItems');
      let favoriteNewsItems: NewsItem[] = [];
      if (favoriteNewsItemsJSON) {
        favoriteNewsItems = JSON.parse(favoriteNewsItemsJSON);
      }

      const isAlreadyFavorite = favoriteNewsItems.some(item => item.title === title);
      if (isAlreadyFavorite) {
        return;
      } else {
        favoriteNewsItems.push(newsItem);
        await AsyncStorage.setItem('favoriteNewsItems', JSON.stringify(favoriteNewsItems));
        setIsFavorite(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const favoriteNewsItemsJSON = await AsyncStorage.getItem('favoriteNewsItems');
      let favoriteNewsItems: NewsItem[] = [];
      if (favoriteNewsItemsJSON) {
        favoriteNewsItems = JSON.parse(favoriteNewsItemsJSON);
      }

      const newsIndex = favoriteNewsItems.findIndex(item => item.title === title);
      if (newsIndex !== -1) {
        favoriteNewsItems.splice(newsIndex, 1);
        await AsyncStorage.setItem('favoriteNewsItems', JSON.stringify(favoriteNewsItems));
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewFavorites = () => {
    navigation.navigate('FavoritesNews');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: urlToImage }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {isFavorite ? (
            <TouchableOpacity onPress={handleRemoveFromFavorites}>
              <Text style={styles.favoritesText}>Rimuovi dai preferiti</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleAddToFavorites}>
              <Text style={styles.favoritesText}>Aggiungi ai preferiti</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.favoritesButton} onPress={handleViewFavorites}>
        <Text style={styles.favoritesButtonText}>Preferiti</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10
  },
  description: {
    fontSize: 18,
    paddingBottom:10,
  },
  favoritesButton: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 10,
  },
  favoritesButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'normal',
  },
  favoritesText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 50,
    textAlign:'center'
  },
});

export default SingleNews;


















