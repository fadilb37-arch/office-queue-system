'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    "Home",
    "Matches",
    "Table",
    "Statistics",
    "Fantasy",
    "Games",
    "Transfers",
    "Injuries",
    "News",
    "Video & Audio"
  ]

  return (
    <>
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight="bold">
              MiniFootball
            </Typography>
          </Box>

          <Button variant="outlined">Sign In</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box width={280} p={2}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}