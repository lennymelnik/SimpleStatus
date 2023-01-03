import { useState } from "react"
import Main from '../Main'
import { loginUser } from "../../Tools/Tools"
export default function Login(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function handleSubmit(e){
        e.preventDefault();
        const response = await loginUser({
          email,
          password
        }, props.serverAddress);
        console.log("response status",)
        if(response.status == 200){
            props.setToken(response)
            console.log("Submitted", response)
            props.addAlert(response.message, "bg-emerald-400")
        }else{
            props.addAlert(response.reason, "bg-red-400")

        }

    }
   
   
    
       
    return(
        <>
         <Main
         title={"Login"}
         buttonText = {"Login"}
         setEmail={setEmail}
         setPassword={setPassword}
         handleSubmit = {handleSubmit}
         />

        </>
    )

}