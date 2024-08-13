import {
    BsFillArchiveFill,
    BsFillBellFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
  } from "react-icons/bs";

function StatCards({books,categories,users,reviews}){
      return(
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
      )
}
export default StatCards