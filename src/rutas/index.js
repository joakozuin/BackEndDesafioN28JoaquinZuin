  import express from 'express';
  const router = express.Router();

  import { fork } from 'child_process';
  import {join} from 'path';
  import {fileURLToPath} from 'url';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename,'../../'); 
    

  function admin(reg,res,next){
    if(acceso){
      next()
    }else{
      //const error = new Error(`(Su perfil de usuario no tiene acceso a esta ruta`);

      const error = new Error(`Su perfil de usuario no tiene acceso a las rutas Post/Put/Delete`);

      error.httpStatusCode = 400;
      return next(error);
    }
  
  };


  router.get('/',admin, function (req, res) {
    
      res.status(200).json({ message: 'Perfil autorizado  conectado a la API' })
    
  })


  router.get('/randoms', (req, res) => {

    const cant=Number(req.query.cant)
   
    //console.log(__dirname)
    //console.log(join(__dirname,'./util/calculo.js'))

    const computo = fork(join(__dirname,'./util/calculo.js'));
  
    if (!cant){
       cant=0
    }

    computo.send(cant);

    computo.on('message', (sum) => {
      res.json({
       resultado: sum,
      });
    });

    console.log('Llegue primero---->')

  });

  //module.exports = router
  export default router