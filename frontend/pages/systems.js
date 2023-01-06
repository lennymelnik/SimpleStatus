import { useEffect, useState } from "react"
import SystemsList from "../components/SystemsList/SystemsList"
import { getAllSystems } from "../components/Tools/Tools"

export default function SystemsPage(props){
    const [systems, setSystems] = useState([])
    async function fetchSystems(){
        const response = await getAllSystems(props.token, props.serverAddress)
        if(response.status == 200){
            setSystems(response.data)
        }
    }
    useEffect(()=>{
        fetchSystems()
    },
    [])
    return(
        <>
        <p className="text-white text-xl">Your systems</p>

        <SystemsList systems={systems} fetchSystems={fetchSystems} {...props} />

        </>
    )
}