import { TClientShema } from "./type";

export const clientsUpate =async (client:TClientShema)=>{
    
    const baseUrl = process.env.APPS_URL
    const token   = process.env.APPS_TOKEN    
    const id       = client.nit

    const response = await fetch(baseUrl+`/clients/${id}`,{
        method:"POST",
        body:JSON.stringify(client),
        headers :{
           "Content-Type":"application/json",
           "x-access-token":`${token}`
        }
    })       
        
    const responseData = await response.json()

    return responseData

}

export const getCityById = async (id:string)=>{
         
    const response = await fetch(process.env.APPS_URL+`/city/${id}`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "x-access-token":`${process.env.APPS_TOKEN}`
        }
    })       
        
    const responsedata = await response.json()
    
    return responsedata.data

}