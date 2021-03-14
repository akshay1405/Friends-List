import React,{useEffect} from 'react';

const addFriend = (props) =>{

return <div className="mb-2 float-left ml-3">Add your Friend Name:  <input type="text" id="addfrnd"></input> <input onClick={()=>props.addfrnd(document.getElementById("addfrnd").value)} type="button" value="Add"/></div>
}

export default addFriend;