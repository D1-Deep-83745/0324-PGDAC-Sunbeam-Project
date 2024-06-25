import Sidebar from "../component/sidear";
import Header from "../component/header";
function Books() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 ">
          <Sidebar />
        </div>
        <div className="col ms-0">
          <Header />
        </div>
      </div>
    </div>
  );
}
export default Books;
