import useToken from '../components/Auth/useEffect'
import {useState} from 'react'
import '../styles/globals.css'
import Head from "next/head";
import Alert from '../components/Alert/Alert';
import uniqid from 'uniqid'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
    const { token, setToken } = useToken();
    const router = useRouter()
    const [serverAddress, setServerAddress] = useState(false?'https://backend.threatrecord.io':'http://localhost:3010')

    

    async function logout() {
  
      setToken({token : undefined})
      router.push('/')
      
     }
     const [alerts,setAlerts] = useState([])
  
     async function addAlert(message, color){
       var alertObj = {
         message,
         color,
         id : uniqid()
       }
       setAlerts([...alerts, alertObj])
     }
     async function removeAlert(alertId){

       var tempAlerts = alerts
       var newAlerts = []
       for(var i=0;i<tempAlerts.length;i++){
         if(alerts[i].id != alertId){
           newAlerts.push(tempAlerts[i])
         }
       }
   
       setAlerts(newAlerts)
     }    
  return(
    <>
     
      <Head>
        <title>SimpleStatus</title>
        <link rel="icon" type="image/svg" href="/favicon.svg" />
      </Head>
      <div className='p-4 bg-gray-800 font-mono container2 min-h-screen'>


        {alerts.map((alert)=><Alert {...alert} key={alert.id} removeAlert={removeAlert}/>)}
              
        <Component {...pageProps} serverAddress={serverAddress} token={token} setToken={setToken}  logout={logout} addAlert={addAlert}/>
    


   
      </div>
      </>)

  }


export default MyApp
 