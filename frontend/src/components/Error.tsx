import { Alert } from '@mui/material';

interface Props {
  message: string;
}

export const Error = ({ message }: Props) => {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};
