import { Box, IconButton as MuiIconButton, Typography } from '@mui/material';
import { IconButtonProps as MuiIconButtonProps } from '@mui/material';

interface IconButtonProps extends MuiIconButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  hasText?: boolean;
  text?: string;
}

const IconButton = ({ children, hasText, onClick, text, ...props }: IconButtonProps) => {
  return (
    <MuiIconButton
      onClick={onClick}
      size='large'
      aria-label='show content'
      color='inherit'
      {...props}
    >
      {hasText ? (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {text}
          </Typography>
        </Box>
      ) : (
        children
      )}
    </MuiIconButton>
  );
};

export default IconButton;
