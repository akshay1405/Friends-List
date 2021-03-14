import React,{useEffect} from 'react';




const Pagination = (props) =>{
    const pageNumber = [];
     
       for(let i=1; i <= Math.ceil(props.totalItems/props.itemsPerPage);i++){
         pageNumber.push(i);
    }

return(
    <nav>
    <ul className="pg-numbers">
        {pageNumber.map(number=>{
           return <li key={number} >
                <a onClick={()=>{props.paginate(number)}} href='!#' >
                    {number}
                    </a> 
            </li>
        })}
        </ul>
        </nav>
  

)

}

export default Pagination;