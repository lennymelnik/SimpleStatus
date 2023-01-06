import { useRouter } from "next/router"
import { getSystem } from "../../components/Tools/Tools"
import Back from "../../components/Back/Back"
import { useEffect, useState } from "react"
import UpdatesList from "../../components/UpdatesList/UpdatesList"
export default function SystemPage(props){
    const router = useRouter()
    const [system, setSystem] = useState({})
    const [loading, setLoading] = useState(false)


    async function fetchSystem(id){
        setLoading(true)
        const response = await getSystem(id, props.token, props.serverAddress)
        console.log(response)
        if(response.status == 200){
            response.data.updates ? response.data.updates.reverse() : null
            setSystem(response.data)
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(router.query.system_id){

            fetchSystem(router.query.system_id)


        }

    },[router.query])
    return(
        <>
        <Back />

       
        {loading?<SystemSkeleton/>:<SystemLoaded system={system} {...props}/>}

  


        <p className="text-5xl text-white mt-8 text-center">History</p>

        {system.updates ?<UpdatesList updates = {system.updates} /> : null }
        
        
        {router.query.system_id}
        </>
    )
}

function SystemLoaded(props){
    return(
        <div className="flex space-x-8 items-center">
            <p className="text-white text-4xl">{props.system.name}</p>
            <StatusBadge status = {props.system.lastUpdate ? props.system.lastUpdate.status: null} system={props.system}/>
        </div>
    )

}
function StatusBadge(props){
    console.log(props)
    switch (props.status){
        case "In Progress" : return (
            <a className="rounded-md p-2 text-2xl bg-yellow-400">{props.system.lastUpdate.status}</a>
        )
        case "Done" : return (
            <a className="rounded-md p-2 text-2xl bg-green-400">{props.system.lastUpdate.status}</a>
        )
        case "Error" : return (
            <a className="rounded-md p-2 text-2xl bg-red-400">{props.system.lastUpdate.status}</a>


        )
        default : return(
            <a className="rounded-md p-2 text-2xl bg-sky-400">N/A</a>

        )

    }
}

function SystemSkeleton(){
    return(
        <>
         <div className="flex space-x-8 items-center animate-pulse">
            <div className="text-white rounded-lg w-48 h-10 text-4xl bg-slate-500"></div>

            <div className="rounded-lg p-2 text-2xl bg-slate-500 w-20 h-10"></div>

        </div>
        </>
    )
}