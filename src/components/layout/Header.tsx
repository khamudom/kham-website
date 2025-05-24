"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/design-system/ThemeProvider";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Slide,
  useTheme as useMuiTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { Button } from "@/design-system/components/Button";
import { ThemeSelector } from "@/components/ThemeSelector";
import styles from "./styles/Header.module.css";

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 2 : 0}
        sx={{
          background: isScrolled
            ? muiTheme.palette.background.default
            : alpha(muiTheme.palette.background.default, 0.8),
          backdropFilter: "blur(10px)",
          borderBottom: isScrolled ? 1 : 0,
          borderColor: "divider",
          transition: "all 0.3s ease",
          borderRadius: 0,
          "& *": {
            color: muiTheme.palette.text.primary,
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              "&:hover": {
                color: muiTheme.palette.primary.main,
                textShadow: "0 0 8px rgba(0, 102, 204, 0.3)",
              },
            }}
          >
            KU
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  href={item.path}
                  variant="text"
                  sx={{
                    color:
                      pathname === item.path
                        ? muiTheme.palette.primary.main
                        : muiTheme.palette.text.primary,
                    fontWeight: pathname === item.path ? 600 : 400,
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <ThemeSelector />
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeSelector />
              <IconButton
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
                sx={{ ml: 1 }}
              >
                <Menu size={24} />
              </IconButton>
            </Box>
          )}

          <Drawer
            anchor="right"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            PaperProps={{
              sx: {
                width: 250,
                backgroundColor: muiTheme.palette.background.default,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </IconButton>
            </Box>
            <List>
              {navItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    selected={pathname === item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        color: pathname === item.path ? "primary" : "inherit",
                        fontWeight: pathname === item.path ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
