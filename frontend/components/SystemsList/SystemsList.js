import { useState } from "react"
import { createSystem } from "../Tools/Tools"
import SystemItem from "./SystemItem/SystemItem"
export default function SystemsList(props){
    const [name, setName] = useState('')

    async function postSystem(){
        if(name.trim() != ''){
            const response = await createSystem(name, props.token,props.serverAddress)
            response.status == 201 ? props.fetchSystems() : null
            setName('')

        }
        
    }
    return(
        <>
        <table className='table-fixed w-fit'>
                <thead>
                    <tr className='text-white text-xl'>
                        <th>Name</th>
                        <th>Last Status</th>
                        <th>Progress</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                {props.systems.map((system)=><SystemItem system={system} {...props} />)}


                <tr className='text-white text-xl hover:bg-sky-900'>
                    <th className='border border-dashed p-2 flex'>
                        <input value={name} onChange={(e)=> setName(e.target.value)} className="bg-transparent outline-none basis-3/4" placeholder="System Name..."/>
                        <button className="basis-1/4 bg-sky-900 rounded-md p-2" onClick={postSystem}>Create</button>
                    </th>
                    <th className='border border-dashed p-2'></th>
                    <th className='border border-dashed p-2'></th>
                    <th className='border border-dashed p-2'></th>
                </tr>
               </tbody>

            </table>
        </>
    )
}