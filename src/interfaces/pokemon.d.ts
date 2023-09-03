import { BaseKey } from '@pankod/refine-core';
import LinearProgress, {
    LinearProgressProps,
  } from '@mui/material/LinearProgress';
  

export interface PokemonCardProps {
    id?: BaseKey | undefined;
    name: string;
    url: string;
    atk: number;
    def: number;
    types: string[];
    sprite: string;
}

export interface PokemonStatProps {
    id?: BaseKey | undefined;
    hp: LinearProgressProps & { value: number; name: string };
    atk: LinearProgressProps & { value: number; name: string };
    def: LinearProgressProps & { value: number; name: string };
    satk: LinearProgressProps & { value: number; name: string };
    sdef: LinearProgressProps & { value: number; name: string };
    spd: LinearProgressProps & { value: number; name: string };
}

export interface PokemonProps extends PokemonStatProps {
    id?: BaseKey | undefined;
    name: string;
    sprite: string;
    types: string[];
    weight: number;
    height: number;
    moves: string[];
}
