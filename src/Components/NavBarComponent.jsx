import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import CopyMyUidComponent from "./CopyMyUidComponent";
import { useStoreState } from "easy-peasy";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";

export default function NavBarComponent() {
  let navigate = useNavigate();
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
  const userInfo = useStoreState((state) => state.auth.userInfo);
  const [showLogin, setShowLogin] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChats = () => {
    handleClose();
    navigate("/");
  };

  const handleAbout = () => {
    handleClose();
    navigate("/landing");
  };

  const handleShare = async () => {
    const shareData = {
      title: "P2P Chat",
      text: `Found this cool app, come lets chat together!\n\n Use this User Id : ${userInfo.uid} to add me as a friend.`,
      url: "https://maanilverma-chat-app-p2p.netlify.app/",
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setShowLogin(isLoggedIn);
    return () => {
      handleClose();
    };
  }, [isLoggedIn]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <ChatIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            P2P Chat
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {showLogin ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={`${userInfo?.name}'s Profile Photo`}
                  src={userInfo.photoURL}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box sx={{ mx: 1, mt: 1 }}>
                  <CopyMyUidComponent />
                </Box>
                <Divider sx={{ mt: 2, mb: 1 }} />
                <MenuItem onClick={handleChats}>Chats</MenuItem>
                <MenuItem onClick={handleAbout}>About</MenuItem>
                <MenuItem onClick={handleShare}>Share</MenuItem>
                <Login />
              </Menu>
            </div>
          ) : (
            <Login />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
