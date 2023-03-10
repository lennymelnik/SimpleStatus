
import UpdatesItem from "./UpdatesItem/UpdatesItem"
export default function UpdatesList(props){
    return(
        <>
        <table className='table-auto w-full select-none'>
                <thead>
                    <tr className='text-white text-xl'>
                        <th>Info</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Time</th>

                    </tr>
                </thead>
                <tbody>
                {props.updates.map((update)=><UpdatesItem key={update._id} update={update} {...props} />)}


               
               </tbody>

            </table>
        </>
    )
}