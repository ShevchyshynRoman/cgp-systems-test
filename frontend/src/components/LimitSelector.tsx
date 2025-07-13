import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface Props {
  limit: number;
  onChange: (limit: number) => void;
}

export const LimitSelector = ({ limit, onChange }: Props) => {
  return (
    <FormControl size="small" sx={{ mb: 2, minWidth: 120 }}>
      <InputLabel id="limit-label">Users per page</InputLabel>
      <Select
        labelId="limit-label"
        value={limit}
        label="Users per page"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </FormControl>
  );
};
