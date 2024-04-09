"use client"
export const Center = ({children} : {children : React.ReactNode}) => {
    return(
        <div className="flex flex-col justify-center items-center h-full">
            {/* <div className="flex flex-row justify-center"> */}
                {children}
            {/* </div> */}
        </div>
    )
};