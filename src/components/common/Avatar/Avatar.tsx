import { MenuItem, Typography, useTheme } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import DropDownMenu from '../DropDownMenu';
import IconButton from '../Button/IconButton';
import { parseCaseText } from '@/utils/helpers.common';

interface AvatarMenuProps {
  id: number;
  text: string;
  onClick?: () => void;
}

interface AvatarProps {
  data: AvatarMenuProps[];
  user?: string;
}

const Avatar = ({ data, user }: AvatarProps) => {
  const theme = useTheme();

  return (
    <>
      <DropDownMenu
        id='menu-appbar-avatar'
        trigger={handleOpen =>
          !user ? (
            <IconButton
              onClick={handleOpen}
              sx={{ transition: 'all 0.2s', '&:hover': { bgcolor: 'action.hover' } }}
            >
              <AccountCircle fontSize='large' color='action' />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleOpen}
              hasText
              text={parseCaseText(user || '')}
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            />
          )
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.palette.divider}`,
            },
          },
        }}
      >
        {data.map((item, index) => (
          <MenuItem
            dense
            divider
            key={item.id}
            onClick={item.onClick}
            sx={{
              width: '200px',
              justifyContent: 'center',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Typography
              textAlign='center'
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                color: index === data.length - 1 ? 'error.main' : 'textPrimary',
              }}
            >
              {item.text}
            </Typography>
          </MenuItem>
        ))}
      </DropDownMenu>
    </>
  );
};

export default Avatar;
