interface AvatarMenuProps {
  id: number;
  text: string;
  onClick?: () => void;
}

export interface AvatarProps {
  data: AvatarMenuProps[];
  user?: string;
}
