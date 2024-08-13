import { Link } from "react-router-dom";

function LatestInvoices({ props }) {
  return (
    <div className="table table-responsive container-fluid" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <table className="table-hover" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th scope="col">invoice_id</th>
            <th scope="col">customer_id</th>
            <th scope="col">invoice_date</th>
            <th scope="col">due_date</th>
            <th scope="col">total_amount</th>
            <th scope="col">paid_amount</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody>
          {props.length > 0 ? (
            props.map((item) => (
              <tr key={item.id}>
                <td>Inv-{item.id}</td>
                <td>Cust-{item.customerId}</td>
                <td>{item.invoiceDate}</td>
                <td>{item.dueDate}</td>
                <td>{item.totalAmount}</td>
                <td>{item.paidAmount}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <h4>There are no Invoices to Show</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {props.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Link to="/invoices" className="btn btn-primary">
            Load More Invoices...
          </Link>
        </div>
      )}
    </div>
  );
}

export default LatestInvoices;
