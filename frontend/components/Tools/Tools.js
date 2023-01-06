
export async function createSystem(name, token, serverAddress){
    
    return await fetch(serverAddress+'/system',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
         
        },
        body : JSON.stringify({name:name})})
          .then(data => data.json())
    
}


export async function getAllSystems(token, serverAddress){
    
    return await  fetch(serverAddress+'/system',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        })
          .then(data => data.json())
    
}

export async function getSystem(systemId,token, serverAddress){
    
    return await  fetch(serverAddress+'/system/'+systemId,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        })
          .then(data => data.json())
    
}
export async function loginUser(credentials, serverAddress) {
    return fetch(serverAddress+'/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

   export async function registerUser(credentials, serverAddress) {
    return fetch(serverAddress+'/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


   export function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }