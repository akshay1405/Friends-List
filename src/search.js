import React from 'react';

const search = (props)=>{
 return  <input onKeyUp={props.change} style={{width:"43em"}} placeholder ="Enter your friends name" type="text"></input>
}

export default search;