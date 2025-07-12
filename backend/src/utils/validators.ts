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
