export const getRtkError = (error: unknown): string => {
  if (typeof error !== 'object' || error === null) {
    return '';
  }

  if (
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data &&
    typeof error.data.message === 'string'
  ) {
    return error.data.message;
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  if ('error' in error && typeof error.error === 'string') {
    return error.error;
  }

  if ('status' in error && typeof error.status === 'number') {
    return error.status.toString();
  }

  return '';
};
