import logo from './logo.svg';
import './App.css';
import github from "./github.png"
import axios from 'axios'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux'
import { saveData } from './redux/dataSlice';

function App() {
  const [user,setUser] = useState(true);
  const [change,setChange] = useState("");
  const [data,setData] = useState([]);
  const [currentItems,setCurrentItems] = useState(null);
  const [pageCount,setPageCount] = useState(0);
  const [itemOffset,setItemOffset] = useState(0);
  const itemPerPage = 8;
  const [newData,setNewData] = useState(data);

  const dataRedux = useSelector(function(state){
    return state.data;
  })

  const dispatch = useDispatch();

  useEffect(function(){
    const endOffset = itemOffset + itemPerPage;
    setCurrentItems(data.slice(itemOffset,endOffset));
    if (user){
    setPageCount(Math.ceil(data.filter(function(data){
  if (data.login.includes(change)){
        return data;
      }
    }).length/itemPerPage));
  }
  else {
    setPageCount(Math.ceil(data.filter(function(data){
  if (data.name.includes(change)){
        return data;
      }
    }).length/itemPerPage));
  }
  },[data,itemOffset,itemPerPage]);

  const handlePageClick = function(event){
    const newOffset = (event.selected * itemPerPage) % data.length;
    setItemOffset(newOffset);
  }
  var filters = [];
  if (user){
  if (currentItems){
    var filters = currentItems.filter(function(data){
      if (change == ""){
        return;
      }
      else if (data.login.includes(change)){
        return data;
      }
    })
  }
}
else {
  if (currentItems){
    var filters = currentItems.filter(function(data){
      if (change == ""){
        return;
      }
      else if (data.name.includes(change)){
        return data;
      }
    })
  }
}


  async function fetchUsers(){
    let res = await fetch("https://api.github.com/users",{
      mode: 'cors',
    });
    let json = await res.json();
    console.log(json);
    setData(json);
  }
  async function fetchRepositories(){
    let res = await fetch("https://api.github.com/repositories",{
      mode: 'cors',
    });
    let json = await res.json();
    console.log(json);
    setData(json);
  }
  useEffect(function(){
    if (user){
      fetchUsers();
    }
    else {
      fetchRepositories();
    }
  },[user])
  return (
    <div style={{ display : "flex",justifyContent : "center" }}>
    <div className='origin' style={{width :"80%",marginTop:"50px" }}>
      <div style={{ display : "flex",alignItems:"center" }}>
      <div >
          <img style={{ width : "50px" }} src={github}></img>
      </div>
      <div style={{ marginLeft : "20px" }}>
        <h3>Github Searcher</h3>
        <p style={{ position:"relative",bottom : 10}}>Search users or repositories below</p>
      </div>
      </div>

      <div style={{ display : "flex" }}>
          <input className='input' onChange={function(e){
            setChange(e.target.value);
            dispatch(saveData(e.target.value));
          }} style={{ width : "300px" , height : "30px" }} placeholder='Typing to search users or repositories ...'></input>
          <select onChange={function(e){
            console.log(e.target.value);
            if (e.target.value == 'users'){
              setUser(true);
            }
            else {
              setUser(false);
            }
          }} style={{ marginLeft : "20px" }}>
            <option value="users">Users</option>
            <option value="repository">Repository</option>
          </select>
      </div>
      
      {user && 
      <div className="grid">
      {currentItems && filters.map(function(data){
        return (
          <div style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',marginTop:"14px",width : "250px",border : "1px solid grey",display : "flex",flexDirection:"column",alignItems:"center" }}>
            <img style={{ width :"100px",marginTop:"10px" }} src={data.avatar_url}></img>
            <p>ID : {data.id}</p>
            <p>Node ID : {data.node_id}</p>
            <p>Name : {data.login}</p>
          </div>
        )
      })}
      </div>
}
{!user && 
      <div className="grid">
      {currentItems && filters.map(function(data){
        return (
          <div style={{ boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',marginTop:"14px",width : "250px",border : "1px solid grey",display : "flex",flexDirection:"column",alignItems:"center" }}>
            <img style={{ width :"100px",marginTop:"10px" }} src={data.owner.avatar_url}></img>
            <p>ID : {data.id}</p>
            <p>Name : {data.name}</p>
            <p>Full Name : {data.full_name}</p>
          </div>
        )
      })}
      </div>
} 
{ change != "" && 
      <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
      </div>
}

    </div>
    </div>
  );
}

export default App;
