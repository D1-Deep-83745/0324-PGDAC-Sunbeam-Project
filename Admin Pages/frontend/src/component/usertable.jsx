function UserTable({ props, onBlock }) {
  const handleBlockClick = (userId) => {
      if (onBlock) {
          onBlock(userId);
      }
  };

  return (
      <div className="book-list table table-responsive container-fluid" style={{ maxHeight: "800px", overflowY: "auto" }}>
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>DOB</th>
                      <th>Gender</th>
                      <th>Phone Number</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {props.length > 0 ? (
                      props.map((user) => (
                          <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>{user.firstName}</td>
                              <td>{user.lastName}</td>
                              <td>{user.email}</td>
                              <td>{user.dob}</td>
                              <td>{user.gender}</td>
                              <td>{user.phoneNo}</td>
                              <td>
                                  {((user.userRole === "CUSTOMER") ||
                                    (user.userRole === "SALES" && sessionStorage.getItem('role') === "ADMIN")) &&
                                    sessionStorage.getItem('id') !== user.id && (
                                      <button 
                                          className="delete-button" 
                                          onClick={() => handleBlockClick(user.id)}
                                      >
                                          Block
                                      </button>
                                  )}
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan={8}><h4>No Data to Show</h4></td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>
  );
}

export default UserTable