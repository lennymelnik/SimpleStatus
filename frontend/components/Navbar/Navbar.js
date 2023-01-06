import { useRouter } from "next/router"

export default function Navbar(props){
    const router = useRouter()
    return(
        <>
        <div className="bg-gray-800 font-mono">
            <div className="flex justify-between p-2 border-b">
                <p className='select-none text-lime-600 text-xl'>simplestatus@1-er.dev</p>

                <div className="flex space-x-8 text-xl text-lime-600">
                    {!props.token ? <>  <button onClick={()=>router.push('/auth/login')}>Login</button>
                    <button onClick={()=>router.push('/auth/register')}>Register</button></> :
                    <>
                    <button onClick={()=>router.push('/systems')}>Systems</button>
                    <button onClick={()=>props.logout()}>Logout</button></>}
                  
                </div>
            </div>

        </div>
        
        </>
    )
}