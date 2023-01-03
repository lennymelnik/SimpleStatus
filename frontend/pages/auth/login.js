import Router from 'next/router'
import Login from '../../components/Auth/Login/Login'
export default function login(props){
    if(props.token){
        Router.push('/')
    }
    return(
        <Login {...props}/>
    )
}