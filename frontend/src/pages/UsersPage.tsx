import { useEffect, useState } from 'react';
import { getUsersPaginated } from '../api/userApi.ts';
import type { IUserWithImageCountPaginated } from '../types/user.ts';
import type { SortOrder } from '../types/sorting.ts';
import { UsersHeader } from '../components/UsersHeader.tsx';
import { Loader } from '../components/Loader.tsx';
import { Error } from '../components/Error.tsx';
import { LimitSelector } from '../components/LimitSelector.tsx';
import { UsersTable } from '../components/UsersTable.tsx';
import { PaginationControls } from '../components/PaginationControls.tsx';

export function UsersPage() {
  const [data, setData] = useState<IUserWithImageCountPaginated>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [imageCountOrderDirection, setImageCountOrderDirection] = useState<SortOrder>('ASC');
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getUsersPaginated({ page, imageCountOrderDirection, limit })
      .then(setData)
      .catch((err) => {
        setError(err.message || 'Unknown error');
      })
      .finally(() => setIsLoading(false));
  }, [page, imageCountOrderDirection, limit]);

  const changeImageCountOrder = () => {
    setImageCountOrderDirection((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  return (
    <>
      <UsersHeader />

      {isLoading && <Loader />}

      {error && <Error message={error} />}

      {data && !isLoading && !error && (
        <>
          <LimitSelector limit={limit} onChange={setLimit} />

          <UsersTable
            users={data.users}
            imageCountOrderDirection={imageCountOrderDirection}
            onChangeImageCountOrder={changeImageCountOrder}
          />

          <PaginationControls page={page} totalPages={data.totalPages} onChange={setPage} />
        </>
      )}
    </>
  );
}
