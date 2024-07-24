
interface propsType {
    onClick : ()=>void,
    children : React.ReactNode
}

export const Button = ({onClick, children}:propsType)=>{

    return(
        <div>
            <button className="p-3" onClick={onClick}>{children}</button>
        </div>
    )
}