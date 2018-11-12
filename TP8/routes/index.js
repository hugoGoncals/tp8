var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var formidable = require('formidable') 
var fs = require('fs')
var path = require('path')

var myBD = __dirname+'/ficheiros.json'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/para', (req, res)=>{
  jsonfile.readFile(myBD, (erro, paras)=>{
    if(!erro) res.render('lista', {lista:paras})
    else res.render('error', {e:erro})
  })
})

router.get('/ficheiro/apaga', (req, res)=>{
  
  var index = req.query.id 
  jsonfile.readFile(myBD, (erro, paras)=>{
    if(!erro){
      var newTasks = []
      paras.forEach(function(entry, i) {
      if(i==index){
          entry.estado = 0; 
      }
      newTasks.push(entry) 
  });
  jsonfile.writeFile(myBD, newTasks, erro =>{
      if(erro){
          console.log("Erro na escrita da BD "+ erro)
      }else{
          console.log("Registo apagado com sucesso")
      }
  })
    }
    else res.render('error', {e:erro})
  })
})

router.post('/ficheiro/guarda', (req,res)=>{  
  var form = new formidable.IncomingForm()
    form.parse(req, (erro, fields, files) => {
      console.log(fields.desc)

        var fenviado = files.ficheiro.path
        var fnovo = './public/uploaded/' + files.ficheiro.name
        fs.rename(fenviado, fnovo, erro => {
            if (!erro) {
                var resultado = {descricao:fields.desc, path:fnovo, estado:1}
                    jsonfile.readFile(myBD, (erro, ficheiros)=>{
                        if(!erro){ 
                            ficheiros.push(resultado)
                            console.dir(resultado)
                            jsonfile.writeFile(myBD, ficheiros, erro =>{
                                if(erro){
                                    console.log("Erro na escrita da BD "+ erro)
                                }else{
                                    console.log("Registo gravado com sucesso")
                                }
                            })
                        }
                })
            }else{ 
              res.render('error', {e:erro})
            }
        })
    }) 
  /*
  var p = req.body.para
  jsonfile.readFile(myBD, (erro, paras)=>{
    if(!erro){
      paras.push(p)
      console.dir(paras)
      jsonfile.writeFile(myBD, paras, erro2 =>{
        if(!erro2){
          console.log("Paragrafo gravado com sucesso")
        } 
        else console.log("Erro: "+erro2)
      })
    }else{
      console.log("Erro: "+e)
    }
  })
  res.json(p)
*/
})

module.exports = router;
