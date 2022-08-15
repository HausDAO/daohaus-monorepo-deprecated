type HasMessage = { message: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasMessage = (value: any): value is HasMessage =>
  value.message !== undefined;

export const handleErrorMessage = ({
  error,
  fallback,
}: {
  error: unknown;
  fallback: string;
}) => {
  if (hasMessage(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return fallback;
};
