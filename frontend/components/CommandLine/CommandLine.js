import uniqid from 'uniqid'
import { useEffect, useState } from "react"
import { createSystem, getAllSystems, loginUser, registerUser } from '../Tools/Tools'

export default function CommandLine(props){
    const commands = ['clear','login','register','ls', 'set','logout','token']

    const [count, setCount] = useState([{id : uniqid(), command : ''}]) 
    useEffect(()=>{

        console.log(count)
    },[count ])
    return(
        <>

        { count.map((item, i)=><Full {...props} commands={commands} key={item.id} setCount={setCount} count={count} id={item.id}/>)}

      
        </>
    )
}



function Pre(){
    return(
        <p className='select-none text-lime-600 text-xl'>SimpleStatus@1-er.dev<a className='text-white'>:</a><a className='text-blue-600'>~</a><a className='text-white'>$</a></p>

    )
}

function Full(props){
    const [command, setCommand] = useState('')
    const [response, setResponse] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [func, setFunc] = useState('')
    
    useEffect(()=>{
        if(document && document.getElementById(props.id)){
            document.getElementById(props.id).focus()
        }
    }, [])

    useEffect(()=>{
        if(command.trim()!=''){
            var tempCount = props.count
            for(var i =0;i< tempCount.length;i++){
                if(tempCount[i].id == props.id){
                    tempCount[i].command = command
                    break;
                }

            }
            props.setCount(tempCount)

        }
    }, [ command])

  

    

    function finished(){
        setDisabled(true)
        var newId = uniqid()
        props.setCount([...props.count,{id : newId}])
    }
    function handleCommand(e){
        e.preventDefault()
        setFunc(command.split(' ')[0])

    }

    return(
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-2">
            
           


                <Pre/>
                <form onSubmit={handleCommand}>
                    <input
                    id={props.id}
                    value={command}
                    disabled={disabled}
                    onChange={(e)=>setCommand(e.target.value)}
                    className="outline-none select-none text-xl w-fit bg-transparent text-white"/>
            
            
                </form>
                
            </div>
            <CommandRouter finished={finished} func={func} command={command} {...props } />
            <div className="text-white text-xl select-none">
                {response}
            </div>

        </div>
       


    )

}


function CommandRouter(props){
    switch (props.func){
        case 'login' : return(<Login {...props}/>)
        case 'register' : return(<Register {...props}/>)
        case 'token' : return(<Token {...props}/>)
        case 'logout' : return(<Logout {...props} />)
        case 'clear': return(<Clear {...props}/>)
        case 'create': return(<CreateSystem {...props}/>)
        case 'systems': return(<Systems {...props}/>)

        default : return(<NotFound {...props}/>)


    }
}

function Logout(props){
    const [wasToken,setWasToken] = useState(false)
    useEffect(()=>{
        if(props.token){
            setWasToken(true)

        }
        props.logout()
        props.finished()
        
    },[])
    if(wasToken){
        return( <p className='text-white text-xl'>
            Successfully logged out
        </p>)

    }
    return(
        <p className='text-white text-xl'>
            No one was logged in
        </p>
    )
    
    
}
function Clear(props){
    useEffect(()=>{
        props.setCount([{id:uniqid()}])
        
    },[])
   
    return(null)
    
}
function NotFound(props){
    useEffect(()=>{
        if(props.func.trim() != ''){
            props.finished()
        }
        
    },[props.func])
    if(props.func.trim() != ''){
        return(
            <p className='text-white text-xl'>
                {props.func}: command not found
            </p>
        )
    }
    return(null)
    
}
function Token(props){
    useEffect(()=>{
        props.finished()
    },[])
    return(
        <p className='text-white text-xl'>{props.token}</p>
    )
}
function CreateSystem(props){
    const [created, setCreated] = useState(false)
    const [first, setFirst] = useState(true)
    
    useEffect(()=>{
        if(first){
            handleCreateSystem()
            setFirst(false)

        }
    }, [])
 
    async function handleCreateSystem(){
        if(props.command.split(' ')[1].trim() != ''){
            const response = await createSystem(props.command.split(' ')[1],props.token,props.serverAddress)
            console.log(response)
            if(response.status == 201){
                setCreated(true)

    
                
               
            }
            props.finished()

        }
      
    }

    
    if(props.token){
        return( created ?
            <p className='text-white text-xl'>System Created</p>:
        <p className='text-white text-xl'>You already have a system with the name: {props.command.split(' ')[1]}</p>)

    }
    return(
        <p className='text-white text-xl'>You are not logged in</p>
    )
     
   
}
function Systems(props){
    const [systems, setSystems] = useState([])
    
    useEffect(()=>{
        handleSystems()
    },[])
    async function handleSystems(){
        const response = await getAllSystems(props.token,props.serverAddress)
        if(response.status == 200){
            setSystems(response.data)
            props.finished()
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
                {systems.map((system)=><SystemItem {...props} {...system} />)}
                </tbody>

            </table>

       

        
        </>
    )
}
function SystemItem(props){
    return(
        <>
        <tr className='text-white text-xl hover:bg-sky-700'>
            <th className='border border-dashed p-2'>{props.name}</th>
            <th className='border border-dashed p-2'>{props.lastUpdate?props.lastUpdate.status:'N/A'}</th>
            <th className='border border-dashed p-2'>{props.lastUpdate?props.lastUpdate.progress:'N/A'}</th>
            <th className='border border-dashed p-2'>{props.lastUpdate?props.lastUpdate.info:'N/A'}</th>
        </tr>
        </>

    )
}
function Login(props){
    const [password, setPassword] = useState('')
    const [disabled, setDisabled]= useState(false)
    const [text, setText] = useState('')
    const id = uniqid()
    useEffect(()=>{
        if(document){
            document.getElementById(id).focus()
        }
    }
    ,[])
    async function handleLogin(e){
        e.preventDefault()
        const response = await loginUser({email : props.command.split(' ')[1], password : password}, props.serverAddress)
        console.log(response)
        if(response.status == 200){
            
            setText(props.command.split(' ')[1]+" authenticated")
            props.finished()
            setDisabled(true)
            props.setToken(response)
        }else{
            setText("Incorrect password or email try again")
            props.finished()
            setDisabled(true)

        }

    }
    return(
        <>
        <div>
            <form onSubmit={handleLogin} className='flex space-x-2 text-xl'>

            <p className='text-white'>password: </p>
            <input 
            id={id}
            disabled={disabled}
            type='password' onChange={(e)=>setPassword(e.target.value)} 
            className="outline-none select-none text-xl w-fit bg-transparent text-white"/>
            </form>
            <p className='text-white text-xl'>{text}</p>

        </div>
       

        
        </>
    )
}
function Register(props){
    const [password, setPassword] = useState('')
    const [disabled, setDisabled]= useState(false)
    const [text, setText] = useState('')
    async function handleLogin(e){
        e.preventDefault()
        const response = await registerUser({email : props.email, password : password}, props.serverAddress)

        if(response.status == 201){
            setText(props.email+" registered and authenticated")
            props.finished()
            setDisabled(true)
            props.setToken(response)
        }else{
            setText("Email is already in use")
            props.finished()
            setDisabled(true)

        }

    }
    return(
        <>
        <div>
            <form onSubmit={handleLogin} className='flex space-x-2 text-xl'>

            <p className='text-white'>password: </p>
            <input 
            disabled={disabled}
            type='password' onChange={(e)=>setPassword(e.target.value)} 
            className="select-none text-xl w-fit bg-transparent text-white"/>
            </form>
            <p className='text-white text-xl'>{text}</p>

        </div>
       

        
        </>
    )
}