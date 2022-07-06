import { Spinner } from "reactstrap";
const LoadingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <Spinner color="danger" size="" type="grow">
        Loading...
      </Spinner>
    </div>
  );
};
export default LoadingPage;
