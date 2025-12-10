import type { Meta, StoryObj } from '@storybook/react';
import DropDownMenu from './DropDownMenu';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import Button from '../Button';
import IconButton from '../Button/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';

const meta: Meta<typeof DropDownMenu> = {
  title: 'Components/Common/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    trigger: {
      description: 'Función que renderiza el elemento que abre el menú',
    },
    children: {
      description: 'Contenido del menú (MenuItems)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropDownMenu>;

// Historia con botón de texto
export const WithTextButton: Story = {
  args: {
    trigger: handleOpen => <Button text='Abrir Menú' onClick={handleOpen} />,
    children: (
      <>
        <MenuItem onClick={() => console.log('Editar')}>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log('Compartir')}>
          <ListItemIcon>
            <ShareIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Compartir</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log('Descargar')}>
          <ListItemIcon>
            <DownloadIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Descargar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log('Eliminar')}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' color='error' />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Eliminar</ListItemText>
        </MenuItem>
      </>
    ),
  },
};

// Historia con botón de icono
export const WithIconButton: Story = {
  args: {
    trigger: handleOpen => (
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
    ),
    children: (
      <>
        <MenuItem onClick={() => console.log('Editar')}>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log('Compartir')}>
          <ListItemIcon>
            <ShareIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Compartir</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => console.log('Eliminar')}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' color='error' />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Eliminar</ListItemText>
        </MenuItem>
      </>
    ),
  },
};

// Historia con menú simple
export const SimpleMenu: Story = {
  args: {
    trigger: handleOpen => <Button text='Opciones' variant='outlined' onClick={handleOpen} />,
    children: (
      <>
        <MenuItem onClick={() => console.log('Opción 1')}>Opción 1</MenuItem>
        <MenuItem onClick={() => console.log('Opción 2')}>Opción 2</MenuItem>
        <MenuItem onClick={() => console.log('Opción 3')}>Opción 3</MenuItem>
      </>
    ),
  },
};
