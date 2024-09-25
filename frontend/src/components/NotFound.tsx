/**
 * NotFoundComponent is a functional React component that displays a 404 error message.
 * It informs the user that the requested page does not exist.
 *
 * @returns {JSX.Element} A JSX element containing the 404 error message.
 */
const NotFoundComponent: React.FC = () => (
    <div className="container">
    <h1 className='display-4'>404 Page Not Found</h1>

    <p className='lead'>Sorry, that page does not exist.</p>
  </div>
);

export default NotFoundComponent;
