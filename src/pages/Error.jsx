import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
    const {status, statusText, error} = useRouteError();
    
    return (
        <div className='bg-black text-white min-h-screen flex items-center justify-center flex-col gap-2'>
            <h2 className='text-3xl sm:text-6xl font-GrotBlack text-red-600'><span>{status}</span> {statusText} !!!</h2>
            <p className='text-2xl sm:text-3xl font-GrotMed'>{error?.message}</p>
            <Link to="/" className='mt-3 text-base font-GrotMed bg-white text-black w-24 h-10 rounded-md flex items-center justify-center'>Go Back</Link>
        </div>
    )
}

export default Error