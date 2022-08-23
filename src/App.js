import axios from "axios"
import "./App.css"
import { useEffect, useState } from "react";
import Reactpaginate from "react-paginate";
const App = ()=>{
  const [users,setUsers] = useState([])
  const [desc,setDesc] = useState([])
  const [show,setShow] = useState(false)
  const [hover,Sethover] = useState("");
  const [pageNo,setPageNumber] = useState(0)
  useEffect(()=>{
    axios({
      url:"https://fakestoreapi.com/products",
      method:"GET",
    }).then((data)=>{
      setUsers(data.data)
      setDesc(data.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  let id = null;
  const onHover = (e)=>{
    setShow(true)
    let no = parseInt(e.target.name)
    desc.slice(no-1,no).map((items)=>{
      Sethover(items.description)
      return(
      <p>{items.description}</p>
      )
    })
  }
  const onHoverOver = ()=>{
    console.log(hover,show)
    setShow(false)
    Sethover("");
  }
  const usersPerPage = 10;
   const pageVisited = pageNo * usersPerPage;
   const displayUsers = users
   .slice(pageVisited, pageVisited + usersPerPage)
   .map((user) => {
     return (
         <img src={user.image} width="60px" height="60px" name = {user.id}onMouseEnter={(e) => onHover(e)}
         onMouseLeave={(e) => onHoverOver(e)}  >

          
         </img>
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
     {setShow && <h3>{hover}</h3>}
    <Reactpaginate
    previousLabel={"previous"}    
    nextLabel={"next"}
    pageCount={pageCount}
    onPageChange={changePage}
    
    ></Reactpaginate>
  </div>)

  

  }


export default App;
