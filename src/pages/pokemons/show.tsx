import { useState, useEffect } from 'react';
import wretch from 'wretch';
import { PokemonProps } from '../../interfaces/pokemon';
import { PokemonDetails } from '../../components/pokemon';

const PokemonShow = () => {
  const url = window.location.href;
  const name = url.split('/').pop();

  // const { data, isLoading, isError } = queryResult;
  const [pokemonDetails, setPokemonDetails] = useState<PokemonProps | null>(
    null
  );

  useEffect(() => {
    wretch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .get()
      .json((response) => {
        const updatedPokemonDetails: PokemonProps = {
          id: response.id,
          name: response.name,
          types: response.types.map(
            (type: { type: { name: string } }) => type.type.name
          ),
          weight: response.weight,
          height: response.height,
          moves: response.abilities.map(
            (ability: { ability: { name: string } }) => ability.ability.name
          ),
          hp: response.stats[0].base_stat,
          atk: response.stats[1].base_stat,
          def: response.stats[2].base_stat,
          satk: response.stats[3].base_stat,
          sdef: response.stats[4].base_stat,
          spd: response.stats[5].base_stat,
        };

        setPokemonDetails(updatedPokemonDetails);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PokemonDetails
        key={pokemonDetails.id}
        id={pokemonDetails.id}
        name={pokemonDetails.name}
        types={pokemonDetails.types}
        weight={pokemonDetails.weight}
        height={pokemonDetails.height}
        moves={pokemonDetails.moves}
        hp={pokemonDetails.hp}
        atk={pokemonDetails.atk}
        def={pokemonDetails.def}
        satk={pokemonDetails.satk}
        sdef={pokemonDetails.sdef}
        spd={pokemonDetails.spd}
      />
    </div>
  );
};

export default PokemonShow;
