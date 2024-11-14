import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles, typeColors } from '../styles/styles';

const PokemonCard = ({ pokemon }) => {
  const primaryType = pokemon.types[0];
  const backgroundColor = typeColors[primaryType] || '#f8f8f8';

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.number}>#{pokemon.id}</Text>
      <Text style={styles.types}>{pokemon.types.join(', ')}</Text>
    </View>
  );
};

export default PokemonCard;