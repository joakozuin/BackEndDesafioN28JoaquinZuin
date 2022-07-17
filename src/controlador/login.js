import {productosDao as api}   from "../daos/index.js"

import {funcUtil} from '../util/util.js'

  const{calcFechaHora}=funcUtil

  const getNombreSession=(req)=>{
    const fecha=calcFechaHora
    return(req.session.nombre ? req.session.nombre:'invitado')
  
  }

  export const funcLogin = {

    postLogin:async(req,res)=>{

      console.log('Post Llegando al servidor')

      console.log('Nombre:'+req.body.nombre)

      if(req.session.contador){
        req.session.contador++
        //res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces`)
        res.json({Nombre:getNombreSession(req),
                  Contador:req.session.contador
                 })
      }else{
        console.log(req.session.nombre)
        req.session.nombre=req.body.nombre
        req.session.contador=1
        //res.send(`Te damos la bienvenida ${getNombreSession(req)}`)
        res.json({Nombre:getNombreSession(req)})
      }

    },


    getLogin:async(req,res)=>{
      
      console.log('Get Llegando al servidor')

      console.log('Nombre:'+req.query.nombre)

      if(req.session.contador){
        req.session.contador++
       //res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces`)
       res.json({Nombre:getNombreSession(req),
        Contador:req.session.contador
       })
      }else{
        console.log(req.session.nombre)
        req.session.nombre=req.query.nombre
        req.session.contador=1
         //res.send(`Te damos la bienvenida ${getNombreSession(req)}`)
         res.json({Nombre:getNombreSession(req)})

      }

    },

    getLogout:async(req,res)=>{
     const nombre=getNombreSession(req)
      req.session.destroy(err=>{
        if (err){
           res.json({error:'olvidar', body:err})
        }else{
          //res.send(`Hasta Luego ${nombre}`)
          res.json({Nombre:nombre})
        }
      })

    },
  
    //Controla el administardor con una variable de
    //entorno, middleware nivel de aplicación 
    admin:(reg,res,next)=>{
      if (acceso) {
        next();
      } else {
        const error = new Error(`(Su perfil de usuario no tiene acceso a esta ruta`);
        error.httpStatusCode = 400;
        return next(error);
      }
                 
     },


  }  








