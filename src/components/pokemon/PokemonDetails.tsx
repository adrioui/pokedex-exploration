import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';

import { PokemonProps } from '../../interfaces/pokemon';
import LinearWithValueLabel from '../pokemon/PokemonBaseStat';

type InfoItem = {
  name: string;
  value: string | any;
};

function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const BasicCard: React.FC<{ info: InfoItem[] }> = ({ info }) => {
  return (
    <Card
      sx={{
        minWidth: '150px',
        minHeight: '111px',
      }}
    >
      <CardContent>
        {info.map((item, index) => (
          <div key={index}>
            {Array.isArray(item.value) && item.value.length > 1 ? (
              <>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.value[0]}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ textAlign: 'center' }}
                >
                  {item.value[1]}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: 'center' }}
              >
                {item.value}{' '}
                {item.name === 'Weight'
                  ? 'kg'
                  : item.name === 'Height'
                  ? 'm'
                  : ''}
              </Typography>
            )}
          </div>
        ))}
      </CardContent>
      <div>
        {info.map((item, index) => (
          <Typography key={index} component="div" sx={{ textAlign: 'center' }}>
            {item.name}
          </Typography>
        ))}
      </div>
    </Card>
  );
};

const PokemonDetails: React.FC<PokemonProps> = ({
  id,
  name,
  types,
  weight,
  height,
  moves,
  hp,
  atk,
  def,
  satk,
  sdef,
  spd,
}) => {
  const formattedId = `#${String(id).padStart(3, '0')}`;
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const formattedTypes = types.map(
    (type) => type.charAt(0).toUpperCase() + type.slice(1)
  );
  const formattedMoves = moves.map(
    (move) => move.charAt(0).toUpperCase() + move.slice(1)
  );

  const pathName = `/src/assets/illustrations/${formattedName}.svg`;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '80%', md: '80%' },
          borderRadius: '16px',
          boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.20)',
        }}
      >
        <Box sx={{ padding: '20px', backgroundColor: '#BEBEBE' }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: '133.333%',
            }}
          >
            {formattedName}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: 'Poppins',
              fontSize: '24px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '133.333%',
              marginTop: '8px',
            }}
          >
            {formattedId}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              src={
                checkImage(pathName)
                  ? pathName
                  : '/src/assets/illustrations/Silhouette.svg'
              }
              alt="silhouette"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 'auto',
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              {formattedTypes.map((type, index) => (
                <Chip
                  key={index}
                  label={type}
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '15px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '160%',
                  }}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  style={{ height: '100%' }}
                >
                  <Grid item>
                    <Typography variant="h6" component="div">
                      About
                    </Typography>
                  </Grid>
                  <Grid item style={{ flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <BasicCard info={[{ name: 'Weight', value: weight }]} />
                      <BasicCard info={[{ name: 'Height', value: height }]} />
                      <BasicCard
                        info={[{ name: 'Moves', value: formattedMoves }]}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} paddingLeft={2}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                component="div"
                sx={{ textAlign: 'center', paddingTop: '20px' }}
              >
                Base Stats
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <LinearWithValueLabel
                hp={hp}
                atk={atk}
                def={def}
                satk={satk}
                sdef={sdef}
                spd={spd}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default PokemonDetails;
