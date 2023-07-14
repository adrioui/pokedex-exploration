import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import wretch from 'wretch';
import { PokemonCardProps } from '../../interfaces/pokemon';
import { PokemonCard } from '../../components/pokemon';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PokemonList = () => {
  const [pokemonData, setPokemonData] = useState<PokemonCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const response = await wretch(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
        )
          .get()
          .json<{ results: PokemonCardProps[] }>();
        setPokemonData(response.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Grid
      paddingTop={5}
      paddingBottom={5}
      justifyContent="center"
      alignItems="center"
      container
      rowSpacing={{ xs: 3, sm: 4, md: 5 }}
      columnSpacing={{ xs: 3, sm: 4, md: 3 }}
    >
      {pokemonData.map((pokemon, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Grid container justifyContent="center">
            <Grid item>
              <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Stack paddingTop={2} spacing={2}>
        <Pagination
          count={10}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color="primary"
        />
      </Stack>
    </Grid>
  );
};

export default PokemonList;
