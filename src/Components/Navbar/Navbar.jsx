import { KeyboardArrowDown, Tune } from '@mui/icons-material'
import React, { useState } from 'react'
import "./Navbar.css"
import { useDispatch, useSelector } from 'react-redux';
import { getData, sortData } from '../../Utilities/Api/fetch';
const Navbar = () => {
const [order, setOrder] = useState(localStorage.getItem("getOrder")||"Priority");
const [Group, setGroup] = useState(localStorage.getItem("getGroup")||"Status");
const Dis =useDispatch()
const {data}=useSelector(state=>state.assignmentData);

const groupController=e=>{
  setGroup(e.target.value);
  localStorage.setItem("getGroup",e.target.value);
  changeGroup(e.target.value);
}
const changeGroup=(type)=>{
  getData(Dis,type)
}
const orderController=e=>{
    setOrder(e.target.value);
  localStorage.setItem("getOrder",e.target.value);

    sortData(Dis,e.target.value,data.dataType,data[data.dataType])

}
  return <>
  <nav className="navbar">
  
  <div className="options-container">
    <div className="option-header">
      {/* Icon for display options */}
      <Tune style={{color:"#83858a"}} className='icon' />
      {/* Display options dropdown */}
      <div className="options-name">Display
        <KeyboardArrowDown className='icon'/>
      </div>
    </div>
    
    {/* List of options */}
    <div className="option-list">
      {/* Option for Grouping */}
      <div className="option">
        <div className="option-name">Grouping</div>
        <select onChange={groupController
            } value={Group} className="selectOption">
            <option  value="byStatus">Status
            <KeyboardArrowDown className='icon'/></option>
            <option  value="byUser">User
            <KeyboardArrowDown className='icon'/></option>
            <option value="byPriority">Priority
            <KeyboardArrowDown className='icon'/></option>
        </select>
         </div>
      
      {/* Option for Ordering */}
      <div className="option">
        <div className="option-name">Ordering</div>
        <select onChange={orderController} value={order} className="selectOption">
            <option value="Priority">Priority
            <KeyboardArrowDown className='icon'/></option>
            <option value="Title">Title
            <KeyboardArrowDown className='icon'/></option>
        </select>
      </div>
    </div>
  </div>
</nav>

  </>
}

export default Navbar