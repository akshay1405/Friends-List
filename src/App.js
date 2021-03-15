import React,{useState,useEffect} from 'react';
import './App.css';
import FriendList from './friendsList';
import {data} from './data';
import AddFriend from './AddFriend';



const App = (props) => {
  //logic for showing items per page and making pagination
  const [currentPage,setcurrentPage] = useState(1);
  const itemsPerPage= 4;
  const [mainData,setmainData] = useState(props.data);
  const indexofLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;
  const [totalItems,settotalItems] = useState(props.data.length);
  const [currentItems,setCurr] = useState([]);
 
  

//calling component on update of mainData and on paginate
  useEffect(() => {
    setmainData(mainData);  
    setCurr(mainData.slice(indexOfFirstItem,indexofLastItem));
    settotalItems(mainData.length);
   
 },[mainData,currentPage,totalItems]);

  //on Change of page
  const changePage = (PageNumber)=>{
    setcurrentPage(PageNumber);
  }
  //Check if friend is already in List
  const search = (nameKey, myArray)=>{
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}
  const addfrnd = (input)=>{
      if(input !== ""){
      let exist = search(input,mainData);
      if(exist) {alert("Friend is already in list")
      document.getElementById("addfrnd").value = "";
    }
      else{
        let addNewfrnd = {'name':input,'id':mainData[mainData.length-1]["id"]+1};
       setmainData(mainData,mainData.splice(mainData.length,0,addNewfrnd));
       settotalItems(mainData.length);
        document.getElementById("addfrnd").value = "";
        alert("New friend is added to list");
      }
  }
}

  const deleteItem = (index)=>{
    if(window.confirm("Are you sure you want to delete this friend")) { 
  
         var  newArr = currentItems.filter((obj)=>{

          return obj.name !== index;
        
     });
     //corner case if we delete all items from current page move it to previous page
     if(currentPage !== 1){
      if(newArr.length === 0){
        setcurrentPage(currentPage-1);
      } 
    }
     var newMainArr = mainData.filter((obj)=>{

      return obj.name !== index;
    
 });
     setCurr(newArr); 
     setmainData(newMainArr);
     settotalItems(newMainArr.length);

        }
    else return '';
    
  }

  const favourite = (name)=>{
     var mainArr = mainData.filter((obj)=>{
           
         if(obj.name == name) {
            obj.favourite != undefined ? obj.favourite = !(obj.favourite) : obj.favourite = true;
         }
         return obj;
     })
   
     let newArr = mainArr.sort(value => {
      return value.favourite ? -1 : 1 // `true` values first
    })
     setmainData(newArr);
  }

  return (
    <div className="App">
      <div>
   <AddFriend addfrnd={addfrnd}></AddFriend>
   <FriendList currentItems={currentItems} fullData={mainData} totalItems={totalItems} itemsPerPage={itemsPerPage} changePage={changePage} delete={deleteItem} favourite={favourite}></FriendList>
   </div>
    </div>
  );
}

export default App;
