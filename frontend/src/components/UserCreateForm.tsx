import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { createUserWithImageUpload } from '../api/userApi.ts';
import { validateImageFile } from '../utils/validators.ts';
import { Error } from './Error.tsx';

interface Props {
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  city: string;
  image: FileList;
}

export function UserCreateForm({ onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);

    const file = data.image?.[0];

    const fileError = validateImageFile(file);
    if (fileError) {
      setSubmitError(fileError);
      return;
    }

    try {
      await createUserWithImageUpload({
        name: data.name,
        city: data.city,
        image: file,
      });

      reset();
      setSelectedFileName(null);
      onSuccess();
    } catch (err: any) {
      setSubmitError(err.message || 'Unknown error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ maxWidth: 400 }}>
      <Typography variant="h4" mb={2}>
        Create New User
      </Typography>

      <Stack spacing={2}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          rules={{
            required: 'City is required',
            minLength: {
              value: 2,
              message: 'City must be at least 2 characters',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              autoComplete="address-level2"
              error={!!errors.city}
              helperText={errors.city?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          rules={{
            required: 'Image file is required',
          }}
          render={({ field }) => (
            <>
              <Button variant="outlined" component="label">
                {selectedFileName ? `Selected: ${selectedFileName}` : 'Upload Image'}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/png"
                  onChange={(e) => {
                    const fileList = e.target.files;
                    const file = fileList?.[0];
                    setSelectedFileName(file?.name || null);
                    field.onChange(fileList);
                  }}
                />
              </Button>
              {errors.image && (
                <Typography variant="body2" color="error">
                  {errors.image.message}
                </Typography>
              )}
            </>
          )}
        />

        {submitError && <Error message={submitError} />}

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </Stack>
    </Box>
  );
}
