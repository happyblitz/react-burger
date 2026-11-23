import { CenteredBlock } from '@/components/centered-block/centered-block';
import { useRouteError } from 'react-router-dom';

import { NotFoundPage } from '../not-found-page/not-found-page';

export const ErrorPage = (): React.JSX.Element => {
  const routeError = useRouteError();

  if (
    routeError &&
    typeof routeError === 'object' &&
    'status' in routeError &&
    routeError.status === 404
  ) {
    return <NotFoundPage />;
  }

  return (
    <CenteredBlock>
      <h2>На сайте произошла непредвиденная ошибка</h2>
    </CenteredBlock>
  );
};
