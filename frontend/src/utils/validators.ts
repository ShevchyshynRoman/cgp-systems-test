export function validateImageFile(file?: File): string | null {
  if (!file) return 'Image file is required';

  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPG and PNG images are allowed';
  }

  const maxSizeInBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return 'File size must not exceed 5MB';
  }

  return null;
}
