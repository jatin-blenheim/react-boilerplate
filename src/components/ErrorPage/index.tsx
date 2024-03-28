import { Link, useRouteError } from 'react-router-dom';

import './errorPage.scss';

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <p className="error-details">{error.statusText || error.message}</p>
      <Link className="redirect-to" to="/">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
