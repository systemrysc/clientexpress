import z from "zod"

export const clientShema = z.object({
    nit:       z.string().min(2, {message:"Por favor, diligenciar cédula"}),
    nombre1:   z.string().toUpperCase().min(2, {message:"Por favor, diligenciar nombre"}),
    nombre2:   z.string().toUpperCase(),
    apellido1: z.string().toUpperCase().min(2, {message:"Por favor, diligenciar apellido"}),
    apellido2: z.string().toUpperCase(),
    ciudad:    z.number(),
    direccion: z.string().toUpperCase().min(5, {message:"Por favor, diligenciar la dirección"}),
    telefono:  z.string().toUpperCase().min(10,{message:"Por favor, diligenciar el teléfono"}),
    email:     z.string().toUpperCase().email( {message:"Por favor, diligenciar el email"}),
    rut:       z.string().min(1, {message:"Por favor, diligenciar si tiene rut"}),
    renta:     z.string().min(1, {message:"Por favor, diligenciar si declara renta"}),
    resiva:    z.string().min(1, {message:"Por favor, diligenciar si es responsable de iva"})  
})

export type TClientShema = z.infer<typeof clientShema>


export type TCity = {
   Codciudad: string,
   Ciudad: string
}
