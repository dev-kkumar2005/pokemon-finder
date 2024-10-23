'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchForm from '@/components/SearchForm';
import PokemonCard from '@/components/PokemonCard';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    // Fetch Pokémon data
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              image: res.data.sprites.front_default, // Get image URL from sprites
              types: res.data.types.map((t) => t.type.name), // Get types
            };
          })
        );
        setPokemons(pokemonDetails);
        setFilteredPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (type: string, searchTerm: string) => {
    let filtered = pokemons;

    // Filter by type if a type is selected
    if (type) {
      filtered = filtered.filter((pokemon) => pokemon.types.includes(type));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPokemons(filtered);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pokémon Search</h1>
      <SearchForm types={['fire', 'water', 'grass', 'electric']} onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
        {filteredPokemons.length === 0 && 
          <h2 className='container text-center'>No Pokemon here!!!!!</h2>
        }
      </div>
    </div>
  );
};

export default HomePage;
