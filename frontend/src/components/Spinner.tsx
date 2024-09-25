/**
 * Spinner component that displays a loading spinner centered on the screen.
 * 
 * @returns A JSX element containing a Bootstrap spinner.
 */
const Spinner: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
