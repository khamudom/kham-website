import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTheme } from "@/design-system/ThemeProvider";

export const ThemeSelector: React.FC = () => {
  const { themeName, setTheme } = useTheme();

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="theme-select-label">Theme</InputLabel>
      <Select
        labelId="theme-select-label"
        value={themeName}
        label="Theme"
        onChange={(e) => setTheme(e.target.value as any)}
      >
        <MenuItem value="default">Default Light</MenuItem>
        <MenuItem value="defaultDark">Default Dark</MenuItem>
        <MenuItem value="ninjaTurtles">Ninja Turtles</MenuItem>
        <MenuItem value="matrix">Matrix</MenuItem>
      </Select>
    </FormControl>
  );
};
