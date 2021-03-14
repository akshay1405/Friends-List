import React,{useState,useEffect} from 'react';
import Search from './search';
import Pagination from './pagination';
import logo from './delete.png';
import unselectedfav from './unselectedfavorite.png';
import selectedfav from './selectedfavourite.png';

const tableStyle = {
    fontfamily: 'arial, sans-serif',
    bordercollapse: 'collapse',
    width: '50%',
    marginLeft:'1em',
    marginTop: '2%',
   
}
const rows = {
     border: '1px solid #dddddd',
     textAlign: 'left',
     padding: '8px'
  }


const FriendList = (props) =>{
    const [filterData,setData] = useState(props.currentItems);
    const [totalItems,settotalItems] = useState(props.totalItems);

    useEffect(()=>{
      setData(props.currentItems);
      settotalItems(props.totalItems);
    },[props.currentItems,props.fullData,props.totalItems]);
  
    let timeOut = null;
  function onSearch(ev){
      //debouncing of event
      clearTimeout(timeOut);
      timeOut = setTimeout(()=>{     
                var filterdata =  props.fullData.filter((val,ind)=>{
                return (val.name.toUpperCase()).indexOf(ev.target.value.toUpperCase()) !== -1;
            })
            if(filterdata.length <= props.currentItems.length) setData(filterdata);
            else{setData(props.currentItems)}
            console.log(filterdata);
    },300);

  }
    return(<div style={tableStyle}>
       
        <table >
         <tbody>
             <tr><td style={{textAlign: 'left',paddingLeft: '7px',backgroundColor: '#D3D3D3'}}>Friends List</td></tr>
            <tr style={rows}><Search change={(ev) =>onSearch(ev)}></Search></tr>
        {filterData.map((val,index)=>{
            return <tr style={rows} key={val.id}>{val.name}  <a  style={{float:'right','marginRight': '3%'}} key={val.name} onClick ={()=>props.delete(val.name)}> <img src={logo} /> </a> <a  style={{float:'right','marginRight': '7%'}} key={val.id} onClick={()=>props.favourite(val.name)}> {val.favourite ? <img src={selectedfav} /> : <img src={unselectedfav} />} </a></tr>
        })}
         </tbody>
        </table>

      { (totalItems >4) ? <Pagination itemsPerPage={props.itemsPerPage} totalItems={totalItems} paginate={props.changePage}></Pagination> : '' }
        </div>
      )
};

export default FriendList;