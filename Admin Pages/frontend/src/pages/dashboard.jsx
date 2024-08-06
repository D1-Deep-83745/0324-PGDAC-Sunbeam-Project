import Header from "../component/header";
import Sidebar from "../component/sidear";
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

function Dashboard() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
                <h1>300</h1>
              </div>
              <div className="card">
                <div className="card-inner">
                  <h3>CATEGORIES</h3>
                  <BsFillGrid3X3GapFill className="card_icon" />
                </div>
                <h1>12</h1>
              </div>

              <div className="card">
                <div className="card-inner">
                  <h3>USERS</h3>
                  <BsPeopleFill className="card_icon" />
                </div>
                <h1>300</h1>
              </div>

              <div className="card">
                <div className="card-inner">
                  <h3>ALERTS</h3>
                  <BsFillBellFill className="card_icon" />
                </div>
                <h1>42</h1>
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
                    dataKey="pv"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
                    <tr>
                      <th scope="row">INV-001</th>
                      <td>Customer A</td>
                      <td>2024-06-01</td>
                      <td>2024-06-15</td>
                      <td>$500.00</td>
                      <td>$00.00</td>
                      <td>PENDING</td>
                    </tr>
                    <tr>
                      <th scope="row">INV-002</th>
                      <td>Customer B</td>
                      <td>2024-06-03</td>
                      <td>2024-06-18</td>
                      <td>$700.00</td>
                      <td>$700.00</td>
                      <td>PAID</td>
                    </tr>
                    <tr>
                      <th scope="row">INV-003</th>
                      <td>Customer C</td>
                      <td>2024-06-05</td>
                      <td>2024-06-20</td>
                      <td>$550.00</td>
                      <td>$300.00</td>
                      <td>PARTIAL</td>
                    </tr>
                    <tr>
                      <th scope="row">INV-004</th>
                      <td>Customer D</td>
                      <td>2024-06-09</td>
                      <td>2024-06-25</td>
                      <td>$300.00</td>
                      <td>$00.00</td>
                      <td>OVER DUE</td>
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
