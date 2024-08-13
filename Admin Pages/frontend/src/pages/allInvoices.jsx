import Sidebar from "../component/sidear"
import Header from "../component/header"
import { useEffect, useState } from "react"
import { getAllInvoices } from "../service/order"

function AllInvoices(){
  const [props , setprops ] = useState([])

    useEffect(()=>{
        loadOnStartup()
    },[]) 


    const loadOnStartup = async ()=>{
         const tableResult = await getAllInvoices();
         if(tableResult.status===200){
            setprops(tableResult.data)
         }
    }

     return(
    <div className="container-fluid">
      <div className="row" style={{height:"100%"}}>
        
        <div className="col-lg-2 ">
          <Sidebar />
        </div>

        <div className="col ms-0">
          <Header />

          <main className="main-container">

            <div className="main-title">
              <h3>ALL INVOICES</h3>
            </div>
           
            <div className="table table-responsive container-fluid" style={{ maxHeight: "1000px", overflowY: "auto" }}>
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
     </div>

          </main>
        </div>
      </div>
    </div>
     )
}

export default AllInvoices