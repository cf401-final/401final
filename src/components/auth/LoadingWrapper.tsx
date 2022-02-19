import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingButton from '@mui/lab/LoadingButton';

interface LoadingWrapperProps {
  children: React.ReactNode
}

function LoadingWrapper({ children }: LoadingWrapperProps): JSX.Element {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return (
      <div>
        <LoadingButton loading variant="contained" color="error" />
      </div>
    );
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return <>{children}</>;
}

export default LoadingWrapper;
