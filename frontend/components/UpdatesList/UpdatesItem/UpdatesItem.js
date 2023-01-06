import { useRouter } from "next/router"
import { timeSince } from "../../Tools/Tools"


export default function UpdatesItem(props){
    const router = useRouter()

    const color = {
        "In Progress" : "text-yellow-400",
        "Done" : "text-blue-400",
        "Ready" : 'text-green-300',
        Error : 'text-red-400',
    }
    
    return(
        <>
        <tr className='text-white text-xl hover:bg-sky-900'>
        <th className='border border-dashed p-2'>{props.update.info?props.update.info:'N/A'}</th>
        <th className={'border border-dashed p-2 '+color[props.update.status]}>{props.update.status}</th>
        <th className='border border-dashed p-2'>
                {props.update.percent?<div className="bg-green-400 text-black h-8" style={{width : props.update.percent+"%"}}>{props.update.percent+"%"}</div>:'N/A'}
                </th>


            <th className='border border-dashed p-2'>{timeSince(props.update.timestamp)} ago</th>
            
        </tr>
        </>
    )
}