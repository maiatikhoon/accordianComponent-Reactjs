
import React, { useState } from 'react' 
import data from "./data.js" ;
import "./styles.css" ;

export default function Accordian() { 

    const [selected , setSelected ] = useState(null) ;  
    const [enableMultiSelection, setEnableMultiSelection ] = useState(false) ; 
    
    const [multiple , setMultiple ] = useState([]) ; 

    const handleSingleSelection = (getCurrentId)=>  {

            console.log(getCurrentId) ; 

            setSelected(getCurrentId) ; 

            if(selected==getCurrentId) { 
                setSelected(null);
            }
    } 

    function handleMultipleSelection(getCurrentId) {

        const copyMultiple = [...multiple] ; 

        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId) ; 

        console.log(findIndexOfCurrentId) ;  

        if(findIndexOfCurrentId == -1) { 
             copyMultiple.push(getCurrentId) ;
        }else { 
            copyMultiple.splice(findIndexOfCurrentId,1) ;
        } 

        setMultiple(copyMultiple) ; 
    }

    console.log(selected , multiple) ;
  return (
    <div className='wrapper'> 

            <button onClick={ () => setEnableMultiSelection( !enableMultiSelection )}> Enable Multi Selection </button>

            <div className='accordian'>

                   {data && data.length > 0 ? ( 
                      data.map( (data) => (
                          <div key={data.id} className='item'> 

                                <div onClick={ 
                                enableMultiSelection  
                                ? ()=> handleMultipleSelection(data.id) 
                                : () => handleSingleSelection(data.id)} 
                                className='title'> 

                                   <h3> {data.question} </h3> 
                                   <span className='icon'> + </span>
                                </div>

                                { 
                                    enableMultiSelection ? 
                                    multiple.indexOf(data.id) !== -1 && (<div className='content'> {data.answer} </div>) :  
                                    selected === data.id && <div className='content'> {data.answer} </div>
                                }
                          </div>
                      )) 
                   ) : (<div> No data found!</div>) }
            </div>
    </div>
  )
}
