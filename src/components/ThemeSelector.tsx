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
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) => theme.palette.primary.main,
          },
        }}
      >
        <MenuItem value="default">Light</MenuItem>
        <MenuItem value="defaultDark">Dark</MenuItem>
        <MenuItem value="ninjaTurtles">Ninja Turtles</MenuItem>
        <MenuItem value="matrix">Matrix</MenuItem>
      </Select>
    </FormControl>
  );
};
