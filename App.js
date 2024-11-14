import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchPokemonData } from './src/api/pokeapi';
import PokemonCard from './src/components/PokemonCard';
import { styles } from './src/styles/styles';

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
      setLoading(false);
    };

    getPokemonData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <FlatList
        data={pokemonData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
}