import { useState } from "react"
import Main from '../Main'
import { registerUser } from "../../Tools/Tools"
import { useRouter } from "next/router"

export default function Register(props){
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inviteCode, setInviteCode] = useState('')

    async function handleSubmit(e){
        e.preventDefault();
        const response = await registerUser({
          email,
          password,
          inviteCode
        }, props.serverAddress);
        if(response.status == 201){
            props.setToken(response)
            props.addAlert(response.message, "bg-emerald-400")
            router.push('/')
        }else{
            props.addAlert(response.reason, "bg-red-400")

        }

    }
   
    return(
        <>
         <Main
         title={"Register"}
         buttonText = {"Register"}
         setEmail={setEmail}
         setPassword={setPassword}
         setInviteCode ={setInviteCode}
         inviteCode = {inviteCode}
         handleSubmit = {handleSubmit}
         />

        </>
    )

}