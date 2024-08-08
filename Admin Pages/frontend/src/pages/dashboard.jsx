import { useEffect, useState } from "react";
import Header from "../component/header";
import Sidebar from "../component/sidear";
import { Link } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsFillBellFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { tallyBookChartData, tallyBooks, tallyCategories, tallyDayWiseSale, tallyReviews, tallyUsers } from "../service/tally";
import { getLatestInvoices } from "../service/order";

function Dashboard() {
   
  const[books,setbooks] = useState('');
  const[categories,setcategories] = useState('');
  const[users,setUsers] = useState('');
  const[reviews,setReviews] = useState('');
  const[data,setData] = useState([]);
  const[sale,setSale] = useState([]);

  const [tableData,setTableData] = useState([]);

  
  useEffect(()=>{
    tally()
    },[])

 
  const tally = async ()=>{
    const bookResult = await tallyBooks()
    if(bookResult.status=== 200){
      setbooks(bookResult.data)
    }

    const categoryResult = await tallyCategories()
    if(categoryResult.status=== 200){
      setcategories(categoryResult.data)
    }

    const userResult = await tallyUsers()
    if(userResult.status=== 200){
      setUsers(userResult.data)
    }
    
    const reviewResult = await tallyReviews()
    if(reviewResult.status=== 200){
      setReviews(reviewResult.data)
    }

    const chartDataResult = await tallyBookChartData()
    if(chartDataResult.status=== 200){
     // Transform the data to the required format
     const transformedData = chartDataResult.data.map((book, index) => ({
      name:`ID : ${book.id}`, 
      sale: book.quantitySold, 
      stock: book.remainingInventory,
      amt: book.quantitySold 
    }));
    setData(transformedData);
  } else {
    console.error('Failed to fetch data:', chartDataResult.status);
  }

  const dayWiseSaleResult = await tallyDayWiseSale()
  if(dayWiseSaleResult.status=== 200){
    console.log(dayWiseSaleResult)
    const transformedSale = dayWiseSaleResult.data.map((book, index) => ({
     name:`Day: ${index +1}`, 
     sale: book.totalQuantity, 
     amt: book.totalQuantity 
   }));
   setSale(transformedSale);
 }



   const tableDataResponse =await getLatestInvoices()
   if(tableDataResponse.status===200){
      setTableData(tableDataResponse.data)      
   }

}

   



  return (
    <div className="container-fluid">
      <div className="row" style={{height:"100%"}}>
        <div className="col-lg-2 ">
          <Sidebar />
        </div>
        <div className="col ms-0">
          <Header />
          <main className="main-container">
            <div className="main-title">
              <h3>DASHBOARD</h3>
            </div>
            <div className="main-cards">
              <div className="card">
                <div className="card-inner">
                  <h3>BOOKS</h3>
                  <BsFillArchiveFill className="card_icon" />
                </div>
                <h1>{books}</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>CATEGORIES</h3>
                  <BsFillGrid3X3GapFill className="card_icon" />
                </div>
                <h1>{categories}</h1>
              </div>

              <div className="card">
                <div className="card-inner">
                  <h3>USERS</h3>
                  <BsPeopleFill className="card_icon" />
                </div>
                <h1>{users}</h1>
              </div>

              <div className="card">
                <div className="card-inner">
                  <h3>REVIEWS</h3>
                  <BsFillBellFill className="card_icon" />
                </div>
                <h1>{reviews}</h1>
              </div>
            </div>

            {/* charts */}

            <div className="charts">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="sale"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="stock"
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={sale}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sale"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                 
                </LineChart>
              </ResponsiveContainer>
            </div>


            
            <div className="container-fluid mt-4" id="table-invoice">
              <h3>OPEN INVOICES</h3>
              <div className="table table-responsive container-fluid" style={{maxHeight:"400px", overflowY:"auto"}}>
                <table className="table-hover" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th scope="col">invoice_id</th>
                      <th scope="col">customer_id:</th>
                      <th scope="col">invoice_date</th>
                      <th scope="col">due_date</th>
                      <th scope="col">total_amount</th>
                      <th scope="col">paid_amount</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>

                  <tbody>
                   {tableData.length > 0 &&
                    tableData.map((item) => {
                       return <tr>
                             <td>"Inv-"+{item.id}</td>
                             <td>"Cust-"{item.customerId}</td>
                             <td>{item.invoiceDate}</td>
                             <td>{item.dueDate}</td>
                             <td>{item.totalAmount}</td>
                             <td>{item.paidAmount}</td>
                             <td>{item.status}</td>
                       </tr>
                    })}

                    {tableData.length === 0 && (
                    <h4>There are no Invoices to Show</h4>
                    )}
                    
                    <tr>
                      <td colSpan={6}> <Link to="/orders"></Link>load More...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
