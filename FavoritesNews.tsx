import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface NewsItem {
  urlToImage: string;
  title: string;
  description: string;
}

const FavoritesNews: React.FC = () => {
  const [favoriteNewsItems, setFavoriteNewsItems] = useState<NewsItem[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    getFavoriteNewsItems();
  }, []);

  const getFavoriteNewsItems = async () => {
    try {
      const favoriteNewsItemJSON = await AsyncStorage.getItem('favoriteNewsItems');
      if (favoriteNewsItemJSON) {
        const favoriteNewsItems = JSON.parse(favoriteNewsItemJSON);
        setFavoriteNewsItems(favoriteNewsItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNewsItem = async (index: number) => {
    try {
      const updatedFavoriteNewsItems = [...favoriteNewsItems];
      updatedFavoriteNewsItems.splice(index, 1);
      setFavoriteNewsItems(updatedFavoriteNewsItems);
      await AsyncStorage.setItem('favoriteNewsItems', JSON.stringify(updatedFavoriteNewsItems));
    } catch (error) {
      console.log(error);
    }
  };

  const renderNewsItem = ({ item, index }: { item: NewsItem; index: number }) => {
    const { urlToImage, title, description } = item;
    return (
      <View style={styles.cardContainer}>
        <Image source={{ uri: urlToImage }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity onPress={() => removeNewsItem(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Rimuovi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {favoriteNewsItems.length > 0 ? (
        <FlatList
          data={favoriteNewsItems}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Nessuna news tra i preferiti.</Text>
      )}

      <Button title="Home" onPress={() => navigation.navigate('News')} />
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
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 5,
  },
  contentContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FavoritesNews;








