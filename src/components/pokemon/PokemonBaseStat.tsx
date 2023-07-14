import * as React from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { PokemonStatProps } from '../../interfaces/pokemon';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const PokemonBaseStat: React.FC<PokemonStatProps> = ({
  hp,
  atk,
  def,
  satk,
  sdef,
  spd,
}) => {
  const stats = [hp, atk, def, satk, sdef, spd];

  console.log(hp.name);

  return (
    <Grid container>
      {stats.map((stat, index) => (
        <Grid item xs={12} key={index}>
          <Grid container>
            <Grid item xs={10}>
              <BorderLinearProgress variant="determinate" value={stat.value} />
            </Grid>
            <Grid item xs={2} paddingLeft={2}>
              <Typography variant="body2" color="text.secondary">
                {stat.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(stat.value)}%`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

function LinearWithValueLabel({
  hp,
  atk,
  def,
  satk,
  sdef,
  spd,
}: {
  hp: LinearProgressProps & { value: number; name: string };
  atk: LinearProgressProps & { value: number; name: string };
  def: LinearProgressProps & { value: number; name: string };
  satk: LinearProgressProps & { value: number; name: string };
  sdef: LinearProgressProps & { value: number; name: string };
  spd: LinearProgressProps & { value: number; name: string };
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <PokemonBaseStat
        hp={hp}
        atk={atk}
        def={def}
        satk={satk}
        sdef={sdef}
        spd={spd}
      />
    </Box>
  );
}

export default LinearWithValueLabel;
