import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useNavigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";


const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userMenuOptions = [<ProfilePage/>, "Logout"];
    // React Router's navigation hook ----------------------------------------
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

// Logout function------------------------------------
  const handleLogout = () => {
    navigate("/")
  };

  return (
    <>
      <section>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Container maxWidth="xl">
            {/* Updated Toolbar with justifyContent property */}
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AssignmentIcon sx={{ display: "flex", mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Task Planner
                </Typography>
              </Box>
      
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenuOptions.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={
                        option === "Logout" ? handleLogout : handleCloseUserMenu
                      }
                    >
                      <Typography textAlign="center">{option}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </section>
    </>
  );
};

export default Navbar;
