
interface propsType {
    onClick : ()=>void,
    children : React.ReactNode
}

export const Button = ({onClick, children}:propsType)=>{

    return(
        <div className=" text-center">
            <button className="p-3 bg-green-800 rounded-xl text-lg font-medium hover:bg-green-950 hover:text-white" onClick={onClick}>{children}</button>
        </div>
    )
}