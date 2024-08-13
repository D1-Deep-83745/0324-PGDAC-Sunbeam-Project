import { useEffect, useState } from "react";
import Header from "../component/header";
import Sidebar from "../component/sidear";
import LatestInvoices from "../component/latestInvoices";
import BarChatTemp from "../component/barChartTemp";
import LineChartTemp from "../component/lineChartTemp";
import { tallyBookChartData, tallyBooks, tallyCategories, tallyDayWiseSale, tallyReviews, tallyUsers } from "../service/tally";
import { getLatestInvoices } from "../service/order";
import StatCards from "../component/statCards";

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
            
            <StatCards books={books} categories={categories} users={users} reviews={reviews}/>     

            <div className="charts">
            <BarChatTemp props={data}/>
            <LineChartTemp props={sale}/>
            </div>
  
            <div className="container-fluid mt-4" id="table-invoice">
            <LatestInvoices props={tableData}/>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
