import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const defaultTheme = createTheme();

export function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
