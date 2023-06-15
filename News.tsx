import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NewsItem {
  urlToImage: string;
  title: string;
  description: string;
}

const News = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    const apiKey = '6e8bbe33b0c04603b6664ceda354fb38';
    const textToSearch = searchText || 'example';
    const url = `https://newsapi.org/v2/everything?q=${textToSearch}&from=2023-05-20&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setNewsData(jsonData.articles);
    } catch (error) {
      console.log('Errore durante il recupero dei dati delle notizie:', error);
    }
  };

  const handleNewsItemPress = (item: NewsItem) => {
    navigation.navigate('SingleNews', { newsItem: item });
  };

  const renderNewsItem = ({ item }: { item: NewsItem }) => {
    return (
      <TouchableOpacity onPress={() => handleNewsItemPress(item)}>
        <View style={styles.card}>
          <Image source={{ uri: item.urlToImage }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleFavoritesPress = () => {
    navigation.navigate('FavoritesNews');
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cerca notizie"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={fetchNewsData}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchNewsData}>
          <Text style={styles.searchButtonText}>Cerca</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={newsData}
        keyExtractor={(item, index) => item.urlToImage + index}
        renderItem={renderNewsItem}
      />

      <TouchableOpacity style={styles.favoritesButton} onPress={handleFavoritesPress}>
        <Text style={styles.favoritesButtonText}>Preferiti</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 260,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    paddingBottom: 10,
  },
  favoritesButton: {
    alignItems: 'center',
    margin: 10,
  },
  favoritesButtonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default News;







// 6e8bbe33b0c04603b6664ceda354fb38



