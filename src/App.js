import axios from "axios"
import "./App.css"
import { useEffect, useState } from "react";
import Reactpaginate from "react-paginate";
const App = ()=>{
  const [users,setUsers] = useState([])
  const [pageNo,setPageNumber] = useState(0)
  useEffect(()=>{
    axios({
      url:"https://fakestoreapi.com/products",
      method:"GET",
    }).then((data)=>{
      setUsers(data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  console.log(users)
  const usersPerPage = 10;
   const pageVisited = pageNo * usersPerPage;
   const displayUsers = users
   .slice(pageVisited, pageVisited + usersPerPage)
   .map((user) => {
    console.log(user)
     return (
         <img src={user.image} width="60px" height="60px"></img>
     );
   });



const changePage = ({selected})=>{
  setPageNumber(selected)
}


const pageCount = Math.ceil(users.length / usersPerPage)

  return (
   
  <div className="margin">
    
     <h1>Available Product</h1>
     {displayUsers}
    <Reactpaginate
    previousLabel={"previous"}    
    nextLabel={"next"}
    pageCount={pageCount}
    onPageChange={changePage}
    
    ></Reactpaginate>
  </div>)

  

  }


export default App;
