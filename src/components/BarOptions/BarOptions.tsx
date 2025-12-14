'use client';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';

interface Props {
  onSearch?: (v: string) => void;
  onAdd?: () => void;
  onFilter?: () => void;
  onExport?: () => void;
}

export default function BarOptions({ onSearch, onAdd, onFilter, onExport }: Props) {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div>
          <Typography sx={{ fontWeight: 'bold' }} variant='h4'>
            Busqueda de Estudiantes
          </Typography>
          <Typography variant='subtitle1'>
            Encuentra y gestiona la información de los estudiantes
          </Typography>
        </div>

        <div className='flex items-center gap-3'>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Añadir Estudiante
          </Button>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex-1'>
          <TextField
            fullWidth
            size='small'
            placeholder='Buscar por Nombre, ID o Curso'
            onChange={e => onSearch?.(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#FAFAFB',
              borderRadius: 1,
            }}
          />
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outlined'
            startIcon={<FilterListIcon />}
            onClick={onFilter}
            sx={{ textTransform: 'none', borderRadius: 1 }}
          >
            Filtros
          </Button>
          <Button
            variant='outlined'
            startIcon={<DownloadIcon />}
            onClick={onExport}
            sx={{ textTransform: 'none', borderRadius: 1 }}
          >
            Exportar
          </Button>
        </div>
      </div>
    </div>
  );
}
