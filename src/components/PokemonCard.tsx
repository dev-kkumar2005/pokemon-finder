import React from 'react';

interface PokemonCardProps {
  pokemon: {
    name: string;
    image: string;
    types: string[];
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="border rounded p-4 text-center">
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto mb-2" />
      <h2 className="text-lg font-bold">{pokemon.name}</h2>
      <p className="text-sm">Types: {pokemon.types.join(', ')}</p>
    </div>
  );
};

export default PokemonCard;
