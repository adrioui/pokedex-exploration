import * as React from 'react';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import { PokemonCardProps } from '../../interfaces/pokemon';
import { Silhouette } from '../../assets/illustrations';

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  const pokemonId = url.split('/').filter(Boolean).pop();
  const formattedId = `#${String(Number(pokemonId)).padStart(3, '0')}`;
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
  }

  return (
    <CardActionArea component={Link} to={`show/${name}`}>
      <Card
        style={{
          maxWidth: 250,
          borderRadius: '16px',
          boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.20)',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          align="right"
          sx={{ marginRight: '15px', marginTop: '15px' }}
        >
          {formattedId}
        </Typography>
        <CardContent></CardContent>
        <CardMedia
          component="img"
          image={Silhouette}
          alt="sillhouette"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Typography gutterBottom variant="h5" component="div" align="center">
          {formattedName}
        </Typography>
      </Card>
    </CardActionArea>
  );
};

export default PokemonCard;
