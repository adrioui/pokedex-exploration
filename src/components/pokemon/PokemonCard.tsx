import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import { PokemonCardProps } from '../../interfaces/pokemon';

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  atk,
  def,
  sprite,
  types,
}) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const formattedTypes = types.map(
    (type) => type.charAt(0).toUpperCase() + type.slice(1)
  );

  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const handleCardClick = () => {
    setModalOpen(true); // Open the modal when the card is clicked
  };
  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal when needed
  };

  return (
    <>
      <CardActionArea
        component={Link}
        to={`show/${name}`}
        onClick={handleCardClick}
      >
        <Card
          sx={{
            width: 450,
            height: 220,
            borderRadius: '16px',
            boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.20)',
          }}
        >
          <Grid container>
            <Grid item xs={5}>
              <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <Box sx={{ paddingTop: 1, paddingLeft: 3 }}>
                    <Typography variant="h4">{formattedName}</Typography>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid
                      xs={6}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Chip
                        label={atk}
                        variant="outlined"
                        sx={{
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          fontWeight: 'bold',
                          borderWidth: '4px',
                        }}
                      />
                    </Grid>
                    <Grid xs={6}>
                      <Chip
                        label={def}
                        variant="outlined"
                        sx={{
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          fontWeight: 'bold',
                          borderWidth: '4px',
                        }}
                      />
                    </Grid>
                    <Grid container pl={1}>
                      <Grid xs={5}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          Attack
                        </Typography>
                      </Grid>
                      <Grid xs={7} pr={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          Defense
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} mb={4}>
                    {formattedTypes.map((type) => (
                      <Grid item xs={6}>
                        <Chip
                          label={type}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Box>
            </Grid>
            <Grid
              item
              xs={7}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardMedia
                component="img"
                src={sprite}
                alt="silhouette"
                sx={{
                  width: 235,
                  height: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </CardActionArea>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div>
          {/* Content for the modal */}
          <Typography variant="h4">{formattedName}</Typography>
          {/* Add any additional content you want to display in the modal */}
        </div>
      </Modal>
    </>
  );
};

export default PokemonCard;
