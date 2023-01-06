export default function Main(props){
    return(


   
    <div className="h-full font-Monserrat container mx-auto">
        <div className='flex flex-col mt-48'>

        <div className="flex justify-center">
            <img src='/SimpleStatus.png' className='h-48 w-48'/>


        </div>

        <form onSubmit={props.handleSubmit} className='container mx-auto w-1/2 h-full '>

            <div className=' rounded-xl p-6 flex flex-col space-y-3'>
                <p className='text-center text-3xl text-slate-200'>{props.title}</p>
                <input 
                className='bg-slate-200 rounded-xl p-2 text-slate-700'
                type='email' 
                required 
                placeholder="email@example.com"
                onChange={(e)=>props.setEmail(e.target.value)}/>

                <input 
                className='bg-slate-200 rounded-xl p-2'
                type='password' 
                required 
                placeholder="password"
                onChange={(e)=>props.setPassword(e.target.value)}/>


            
                <button 
                type='submit'
                className='bg-sky-800 rounded-xl p-3 text-white'>
                    {props.buttonText}
                </button>
            </div>
            </form>
            </div>

    </div>   
     )   
}