'use client'
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientShema, TClientShema, TCity } from "@/lib/type";
import { clientsUpate, getCityById } from "@/lib/data"
import { useState } from "react";
import { SearchSelect, SearchSelectItem} from "@tremor/react";

 

export default function App(){

 
  
  const [citys, setCitys] = useState([])
  const [city, setCity] = useState("")

  const onsubmit = async (data: TClientShema)=>{
    data.ciudad = parseInt(city)
    

    const response     = await clientsUpate(data)   
    if (!response.success){
       alert("Novedad para actualizar cliente!!!")
    }
    reset()
    alert("Cliente registrado con éxito!!!")
    window.location.href = "https://imporsa.com.co/";
  } 
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TClientShema>({
    resolver : zodResolver(clientShema)
  });

  
  const onCitys = async (e:string)=>{
      const data = await getCityById(e)      
      setCitys(data)
  }

  return (
    <div className="flex min-h-screen px-3 py-3 flex-1 flex-col justify-center ">
            
      <div className="mx-auto">
      
        <form onSubmit={handleSubmit(onsubmit)}>
          <div>  
          <Image    
            unoptimized
            src="/images/imporsas.JPG"
            alt="logo"
            width={1000}
            height={300}
          />         
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Datos Personales
            </h2>            
          </div>

          <div className="mt-5 grid grid-cols-6 gap-x-3 gap-y-4">
            <div className="col-span-3">
              <label 
               htmlFor="nombre1" 
               className="block text-sm font-medium leading-6 text-gray-900">Primer Nombre</label>
              <div className="mt-2">
                <input 
                  {...register("nombre1")}                  
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  {errors.nombre1 && 
                  (
                  <p className="text-red-500 text-medium">
                     {`${errors.nombre1.message}`}
                  </p>
                  )}  
              </div>
            </div>

            <div className="col-span-3">
              <label 
               htmlFor="nombre2" 
               className="block text-sm font-medium leading-6 text-gray-900">Segundo Nombre</label>
              <div className="mt-2">
                <input 
                 {...register("nombre2")}
                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />                 
              </div>
            </div>

            <div className="col-span-3">
              <label 
               htmlFor="apellido1" 
               className="block text-sm font-medium leading-6 text-gray-900">Primer Apellido</label>
              <div className="mt-2">
                <input 
                 {...register("apellido1")}
                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                 {
                  errors.apellido1 && (
                    <p className="text-red-500 text-medium">
                      {`${errors.apellido1.message}`}
                    </p> 
                  )
                 }
                
              </div>
            </div>

            <div className="col-span-3">
              <label 
               htmlFor="apellido2" 
               className="block text-sm font-medium leading-6 text-gray-900">Segundo Apellido</label>
              <div className="mt-2">
                <input 
                 {...register("apellido2")}
                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div className="col-span-6">
              <label 
               htmlFor="nit" 
               className="block text-sm font-medium leading-6 text-gray-900">Nit/identificación</label>
              <div className="mt-2">
                <input type="number"
                 {...register("nit")}

                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                 {
                  errors.nit && (
                    <p className="text-red-500 text-medium">
                       {`${errors.nit.message}`}
                    </p>
                  )
                 }                   
              </div>
            </div>
            <div className="col-span-full">
              <label 
               htmlFor="ciudad" 
               className="block text-sm font-medium leading-6 text-gray-900">Ciudad</label>
              <div className="mt-2">                                
                <SearchSelect  
                    placeholder="Selecciona la Ciudad"                                        
                    onValueChange={(value)=>{setCity(value)}}
                    onSearchValueChange={(value:string)=>{onCitys(value)}}     
                  >
                  {
                    citys.map((city:TCity)=>(
                      <SearchSelectItem
                          className="bg-gray-100"
                          key={city.Codciudad} 
                          value={city.Codciudad}
                          {...register("ciudad")}>
                          {city.Ciudad}
                      </SearchSelectItem> 

                    ))
                  }                  
                </SearchSelect>
                   
                 {
                  errors.ciudad && (
                    <p className="text-red-500 text-medium">
                      {`${errors.ciudad.message}`}
                    </p>
                  )
                 }
                 
                 
              </div>
            </div>
            <div className="col-span-full">
              <label 
               htmlFor="direccion" 
               className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
              <div className="mt-2">
                <input 
                 {...register("direccion")}
                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                 {
                  errors.direccion && (
                    <p className="text-red-500 text-medium">
                      {`${errors.direccion.message}`}
                    </p>
                  )
                 }
              </div>
            </div>
            <div className="col-span-full">
              <label 
               htmlFor="telefono" 
               className="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
              <div className="mt-2">
                <input 
                 {...register("telefono")}
                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                 {
                  errors.telefono && (
                    <p className="text-red-500 text-medium">
                      {`${errors.telefono.message}`}
                    </p>
                  )
                 }
              </div>
            </div>
           
            <div className="col-span-full">
              <label 
               htmlFor="email" 
               className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <input 
                 {...register("email")}
                 className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                 {
                  errors.email && (
                    <p className="text-red-500 text-medium">
                      {`${errors.email.message}`}
                    </p>
                  )
                 }
              </div>
            </div>
            <div className="col-span-2">
              <label 
               htmlFor="rut" 
               className="block text-sm font-medium leading-6 text-gray-900">Tiene Rut</label>
              <div className="mt-2">
                <select 
                  {...register("rut")}
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value=""></option>
                  <option value="1">SI</option>
                  <option value="0">NO</option>
                </select>
                {
                  errors.rut && (
                    <p className="text-red-500 text-medium">
                      {`${errors.rut.message}`}
                    </p>
                  )
                }
              </div>
            </div>
            <div className="col-span-2">
              <label 
               htmlFor="renta" 
               className="block text-sm font-medium leading-6 text-gray-900">Declara renta</label>
              <div className="mt-2">
                <select 
                  {...register("renta")}
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value=""></option>
                  <option value="1">SI</option>
                  <option value="0">NO</option>
                </select>
                {
                  errors.renta && (
                    <p className="text-red-500 text-medium">
                      {`${errors.renta.message}`}
                    </p>
                  )
                }

              </div>
            </div>
            <div className="col-span-2">
              <label 
               htmlFor="resiva" 
               className="block text-sm font-medium leading-6 text-gray-900">Responsable iva</label>
              <div className="mt-2">
                <select 
                  {...register("resiva")}
                  className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value=""></option>
                  <option value="1">SI</option>
                  <option value="0">NO</option>
                </select>
                {
                  errors.resiva && (
                    <p className="text-red-500 text-medium">
                      {`${errors.resiva.message}`}
                    </p>
                  )
                }
              </div>
            </div>
            <div className="col-span-full">
              <p className="text-sm leading-6 text-gray-600">
                Al brindar sus datos personales a Imporsa SAS,usted otorga autorización para la realización del
                tratamiento de información.
              </p>
              <p className="text-sm leading-6 text-gray-600">
                Para más información acerca del tratamiento de sus datos puede consultar la política de
                tratamiento de datos en <a href="http://www.imporsa.com.co" className="text-blue-600">www.imporsa.com.co</a>
              </p>
            </div>
            <div className="col-span-full">
              <button       
                disabled={isSubmitting}        
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Registrarme
              </button>
            </div>
            <div>
            </div>
          </div>
        </form>
      </div >
    </div >    

  )
}

/*
export default function Home(){

   const [citys, setCitys] = useState([]) 
  
   const onCitys = async ()=>{
     
     const response = await getCityById("BOGO")     
     setCitys(response)
   }
  
  

  return (
    <main>
      <div>
       <h3> URL {process.env.APPS_URL}</h3> 
       <h3>ciudades {JSON.stringify(citys)}</h3>
       <button onClick={()=>{onCitys()}}>click me</button>
      </div> 
    </main>
  )
}


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
*/