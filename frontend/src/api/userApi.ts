import { fetchClient } from '../utils/fetchClient';
import type { ICreateUser, IUserWithImageCountPaginated, IUserWithImageUrl } from '../types/user';
import type { SortOrder } from '../types/sorting';

export async function getUsersPaginated(params: {
  page: number;
  limit: number;
  imageCountOrderDirection: SortOrder;
}): Promise<IUserWithImageCountPaginated> {
  const { page, limit, imageCountOrderDirection } = params;

  return fetchClient(
    `/users?page=${page}&imageCountOrderDirection=${imageCountOrderDirection}&limit=${limit}`
  );
}

export async function createUserWithImageUpload({
  name,
  city,
  image,
}: ICreateUser): Promise<IUserWithImageUrl> {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('city', city);
  formData.append('image', image);

  return await fetchClient('/users', {
    method: 'POST',
    body: formData,
  });
}
