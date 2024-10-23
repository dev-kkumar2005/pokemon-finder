'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from '@/components/Breadcrumb';

export default function PokemonDetails({ params }: { params: { pokemon: string } }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`).then((response) => {
      setPokemon(response.data);
    });
  }, [params.pokemon]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Breadcrumb />
      <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {/* Add more Pokémon details as needed */}
    </div>
  );
}
