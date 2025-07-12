export function validateOrder(order: string) {
  if (order !== 'ASC' && order !== 'DESC') {
    return 'Order must be either ASC or DESC';
  }

  return null;
}

export function validatePage(page: number) {
  if (isNaN(page) || page < 1) {
    return 'Page must be a positive integer';
  }

  return null;
}

export function validateLimit(limit: number) {
  if (isNaN(limit) || limit < 1 || limit > 50) {
    return 'Limit must be between 1 and 50';
  }

  return null;
}

export function validateName(name: string){
  return !name || name.trim().length < 2
    ? 'Name must be at least 2 characters'
    : null;
}

export function validateCity(city: string) {
  return city && city.trim().length < 2
    ? 'City must be at least 2 characters'
    : null;
}

export function validateImageFile(file?: Express.Multer.File) {
  if (!file) {
    return 'Image file is required';
  }

  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.mimetype)) {
    return 'Only JPG and PNG images are allowed';
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'File size must not exceed 5MB';
  }

  return null;
}
