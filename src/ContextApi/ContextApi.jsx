import React, { createContext, useState } from 'react'



export const editEventResponseContext = createContext()
export const editCompanyResponseContext = createContext()

function ContextApi({ children }) {

    const [eventResponse, setEventResponse] = useState("")
    const [companyResponse, setCompanyResponse] = useState("")


    return (
        <>

            <editEventResponseContext.Provider value={{ eventResponse, setEventResponse }}>
                <editCompanyResponseContext.Provider value={{ companyResponse, setCompanyResponse }}>
                    {children}
                </editCompanyResponseContext.Provider>

            </editEventResponseContext.Provider>



        </>
    )
}

export default ContextApi