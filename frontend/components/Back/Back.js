import { useRouter } from "next/router"
import {IoArrowBack} from 'react-icons/io5'
export default function Back(props){
    const router = useRouter()
    return(
        <a className='p-5 flex items-center space-x-2' onClick={()=>router.back()}> <img src='/Arrow.svg' className='rotate-90 h-2' /> <p className='text-white'>BACK</p></a>

    )
}