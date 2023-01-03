import { useState, useEffect } from 'react'

export default function Alert(props){
    useEffect(() => {
        console.log("This prop",props)
        const timeId = setTimeout(() => {

          props.removeAlert(props.id)
        }, 5000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, []);
    return(<>
    <div className={"p-4 m-4 rounded-xl opacity-75 flex justify-between " + (props.color ? props.color : "bg-emerald-400")}>
    
        <div>{props.message ? props.message : " No message, so why does this exist? We dont know"}</div>
        <div onClick={()=>props.removeAlert(props.id)}>X</div>
        
    
       
    </div>
    </>)
}