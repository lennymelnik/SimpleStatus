import { useRouter } from "next/router"
import { timeSince } from "../../Tools/Tools"

export default function SystemItem(props){
    const router = useRouter()

    return(
        <>
        <tr className='text-white text-xl hover:bg-sky-900' onClick={()=>router.push('/system/'+props.system._id)}>
            <th className='border border-dashed p-2'>{props.system.name}</th>
            <th className='border border-dashed p-2'>{props.system.lastUpdate?props.system.lastUpdate.status:'N/A'}</th>
            <th className='border border-dashed p-2'>
            {props.system.lastUpdate && props.system.lastUpdate.percent?<div className="bg-green-400 text-black h-8" style={{width : props.system.lastUpdate.percent+"%"}}>{props.system.lastUpdate.percent+"%"}</div>:'N/A'}
                </th>
            <th className='border border-dashed p-2'>{props.system.lastUpdate?props.system.lastUpdate.info:'N/A'}</th>
            <th className='border border-dashed p-2'>{props.system.lastUpdate?timeSince(props.system.lastUpdate.timestamp):'N/A'}</th>

        </tr>
        </>
    )
}