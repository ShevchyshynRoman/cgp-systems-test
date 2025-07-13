import { Pagination, Stack } from '@mui/material';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const PaginationControls = ({ page, totalPages, onChange }: Props) => (
  <Stack mt={3} alignItems="center">
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, newPage) => onChange(newPage)}
      color="primary"
    />
  </Stack>
);
