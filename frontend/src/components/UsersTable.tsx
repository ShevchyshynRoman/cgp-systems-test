import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import type { IUserWithImageCount } from '../types/user';
import type { SortOrder } from '../types/sorting.ts';

interface Props {
  users: IUserWithImageCount[];
  imageCountOrderDirection: SortOrder;
  onChangeImageCountOrder: () => void;
}

export const UsersTable = ({ users, imageCountOrderDirection, onChangeImageCountOrder }: Props) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell
            align="right"
            onClick={onChangeImageCountOrder}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Typography variant="body2" fontWeight="bold">
              Images count {imageCountOrderDirection === 'ASC' ? '↑' : '↓'}
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.city}</TableCell>
            <TableCell align="right">{user.imageCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
