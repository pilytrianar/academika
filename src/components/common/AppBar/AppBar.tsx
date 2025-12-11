"use client";

import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "../Avatar";
import Notifications from "../Notifications";
import { AppBarProps, Notification } from "./AppBar.types";
import { useRouter } from "next/navigation";

const AVATAR_MENU_DATA = [
  { id: 1, text: 'Perfil' },
  { id: 2, text: 'Ajustes' },
  { id: 3, text: 'Cerrar Sesión' },
];

const NOTIFICATIONS_MENU_DATA: Notification[] = [
  {
    id: '1',
    title: 'New Course Available',
    description: 'Advanced React Patterns has been added to your library.',
    time: '2 mins ago',
    type: 'info',
    read: false,
  },
  {
    id: '2',
    title: 'Assignment Graded',
    description: 'Your submission for "Agentic AI" has been graded. Score: 98/100',
    time: '1 hour ago',
    type: 'success',
    read: false,
  },
  /* {
    id: '3',
    title: 'System Maintenance',
    description: 'Scheduled maintenance tonight at 2:00 AM EST.',
    time: '5 hours ago',
    type: 'warning',
    read: true,
  },
  {
    id: '4',
    title: 'Payment Failed',
    description: 'We could not process your subscription renewal.',
    time: '1 day ago',
    type: 'error',
    read: true,
  }, */
];

const CURRENT_USER = "Andrés Bohórquez";

const AppBar = ({ width, onClick, ...props }: AppBarProps) => {
  const router = useRouter();

  const AVATAR_MENU_DATA = [
    {
      id: 1,
      text: "Perfil",
      onClick: () => router.push("/studentinfo"),
    },
    {
      id: 2,
      text: "Ajustes",
      onClick: () => console.log("Ajustes"),
    },
    {
      id: 3,
      text: "Cerrar Sesión",
      onClick: () => router.push("/login"),
    },
  ];

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: 1,
        width: { xs: "100%", sm: `calc(100% - ${width})` },
        ml: { sm: width },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <Notifications data={NOTIFICATIONS_MENU_DATA} />
          <Avatar data={AVATAR_MENU_DATA} user={CURRENT_USER} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;