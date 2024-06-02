import base_url from "./server_url";
import { commonApi } from "./commonApi";

export const userRegister = async (data) => {

   return await commonApi("POST", `${base_url}/register`, data, "")

}

export const userLogin = async (data) => {
   return await commonApi("POST", `${base_url}/login`, data, "")
}

export const addEvent = async (data, header) => {
   return await commonApi("POST", `${base_url}/addevent`, data, header)
}


export const addCompany = async (data, header) => {
   return await commonApi("POST", `${base_url}/addcompany`, data, header)
}

export const allEvents = async (header) => {

   return await commonApi("GET",`${base_url}/allEvents`,"",header)

}
export const allCompanies = async (header) => {

   return await commonApi("GET",`${base_url}/allCompanies`,"",header)

}
export const dashEvents = async (header) => {

   return await commonApi("GET",`${base_url}/dashEvents`,"",header)

}

export const dashCompanies = async (header) => {

   return await commonApi("GET",`${base_url}/dashCompanies`,"",header)

}
export const dashAllEvents = async (header,search) => {

   return await commonApi("GET",`${base_url}/dashAllEvents?search=${search}`,"",header)

}
export const dashAllCompanies = async (header,search) => {

   return await commonApi("GET",`${base_url}/dashAllCompanies?search=${search}`,"",header)

}

export const editEvents=async(id,data,header)=>{
   return await commonApi("PUT",`${base_url}/EditEvents/${id}`,data,header)
 }

 export const deleteEvent=async(id,header)=>{
   return await commonApi("DELETE",`${base_url}/removeEvents/${id}`,{},header)
 }


 export const deleteCompany=async(id,header)=>{
   return await commonApi("DELETE",`${base_url}/removeCompanies/${id}`,{},header)
 }
 
 export const bookTickets = async (data,header) => {
   return await commonApi("POST", `${base_url}/eventTicket`, data, header)
}

export const BookingCompany = async (data,header) => {
   return await commonApi("POST", `${base_url}/bookCompany`, data, header)
}

