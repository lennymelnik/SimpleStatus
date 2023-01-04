export default function SystemItem(props){
    return(
        <>
        <tr className='text-white text-xl hover:bg-sky-900'>
            <th className='border border-dashed p-2'>{props.system.name}</th>
            <th className='border border-dashed p-2'>{props.system.lastUpdate?props.system.lastUpdate.status:'N/A'}</th>
            <th className='border border-dashed p-2'>{props.system.lastUpdate?props.system.lastUpdate.progress:'N/A'}</th>
            <th className='border border-dashed p-2'>{props.system.lastUpdate?props.system.lastUpdate.info:'N/A'}</th>
        </tr>
        </>
    )
}