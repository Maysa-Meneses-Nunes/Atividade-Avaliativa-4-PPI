import express from 'express';

import session from 'express-session';

import cookieParser from 'cookie-parser';

const app = express();

app.use(session({
    secret: 'M1nh4Chav3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 1000 * 60 * 30 
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true}));

app.use(express.static('./paginas/publicas'));

const porta = 4000;
const host = 'localhost';

var listaProdutos = [];
function cadastroProdutoView(req, resp) {
    resp.send(`
            <html> 
     <head>       
     <meta charset="utf-8">  
                <title> Cadastro de produto</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>  
    <div class="container text-center">
                        <h1 class="mb-5">Cadastro</h1>
                        <form method="POST" action="/cadastrarProduto" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="codigo" class="form-label">Código de barras</label>
                                <input type="text" class="form-control" id="codigo" name="codigo" >
                             </div>
                             <div class="col-md-4">
                                <label for="descricao" class="form-label">Descrição do produto</label>
                                <input type="text" class="form-control" id="descricao" name="descricao">
    
                             </div>
                             <div class="col-md-4">
                                <label for="precoC" class="form-label">Preço de custo</label>
                                
                                    <span class="input-group-text" id="inputGroupPrepend"></span>
                                    <input type="text" class="form-control" id="precoC" name="precoC">
                        
                            </div>
                            <div class="col-md-6">
                                <label for="precoV" class="form-label">Preço de venda</label>
                                  <input type="text" class="form-control" id="precoV" name="precoV">
                            </div>
                            <div class="col-md-3">
                                <label for="validade" class="form-label">Data de validade</label>
                                <input type="date"  class="form-control" id="validade" name="validade">
                            </div>
                            <div class="col-md-3">
                                <label for="estoque" class="form-label">Quantidade em estoque</label>
                                <input type="number" class="form-control" id="estoque" name="estoque">
                            </div>
                            <div class="col-md-3">
                            <label for="fabricante" class="form-label">Nome do fabricante</label>
                            <input type="text" class="form-control" id="fabricante" name="fabricante">
                        </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                            </div>
                            </form>
                    </div>

    </body>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </html>
    `);
}

function menuView(req, resp){
    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }


    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">HOME</a>
                        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div class="navbar-nav">
                                <a class="nav-link active" aria-current="page" href="/cadastrarProduto">Cadastrar Produto</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
        `);
}

function cadastrarProduto(req, resp){
    const codigo     = req.body.codigo;
    const descricao = req.body.descricao;
    const precoC     = req.body.precoC;
    const precoV    = req.body.precoV;
    const validade   = req.body.validade;
    const estoque      = req.body.estoque;
    const fabricante    = req.body.fabricante;

    const dataHoraUltimoLogin = req.cookies['dataHoraUltimoLogin'];
    if (!dataHoraUltimoLogin){
        dataHoraUltimoLogin='';
    }
 
    if (codigo && descricao && precoC && precoV && validade &&  estoque && fabricante){
       

        const Produtos = {codigo,descricao,precoC, precoV , validade, estoque, fabricante};


        listaProdutos.push(Produtos);
    

    resp.write(`
        <html>
            <head>
                 <meta charset="utf-8">
                <title>Cadastrados</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
              
            </head>
            <body>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">codigo de barras</th>
                        <th scope="col">descrição</th>
                        <th scope="col">preço do custo</th>
                        <th scope="col">preço de venda</th>
                        <th scope="col">Validade</th>
                        <th scope="col">quantidade em estoque</th>
                        <th scope="col">Fabricante</th>     
                    </tr>
                </thead>
                <tbody>`);

                for (var i = 0; i < listaProdutos.length; i++){
                    resp.write(`<tr>
                                    <td>${listaProdutos[i].codigo}</td>
                                    <td>${listaProdutos[i].descricao}</td>
                                    <td>${listaProdutos[i].precoC}</td>
                                    <td>${listaProdutos[i].precoV}</td>
                                    <td>${listaProdutos[i].validade}</td>
                                    <td>${listaProdutos[i].estoque}</td>
                                    <td>${listaProdutos[i].fabricante}</td>
                                </tr>
                        `);
                }

    resp.write(`</tbody> 
            </table>
            <a class="btn btn-primary" href="/cadastrarProduto">Continuar Cadastrando</a>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
            `);

    }
      else
    {

        resp.write(`
            <html>
                <head>
                    <title>Cadastro de produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <meta charset="utf-8">
                </head>
                <body>
                    <div class="container text-center">
                        <h1 class="mb-5">Cadastro</h1>
                        <form method="POST" action="/cadastrarProduto" class="border p-3 row g-3" novalidate>
                            <div class="col-md-4">
                                <label for="codigo" class="form-label">Código de barras</label>
                                <input type="text" class="form-control" id="codigo" name="codigo"  value="${codigo}">
        `);
        if (!codigo){
            resp.write(`
                <div>
                    <span><p class="text-danger">Informar o código de barras</p></span>
                </div>
                `);
        }
        resp.write(`</div>
                        <div class="col-md-4">
                        <label for="descricao" class="form-label">descrição do produto</label>
                        <input type="text" class="form-control" id="descricao" name="descricao" value="${descricao}">`);
        if (!descricao){
            resp.write(`
                <div>
                    <span><p class="text-danger">informe a descrição</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
                <div class="col-md-4">
                    <label for="precoC" class="form-label">Preço de custo</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" class="form-control" id="precoC" name="precoC" value="${precoC}">

            `);
        if (!precoC){
            resp.write(`
                <div>
                    <span><p class="text-danger">informe o preço de custo</p></span>
                </div>
                `);
        }
        resp.write(`
                    </div>
                </div>  
            <div class="col-md-6">
                <label for="precoV" class="form-label">precoV</label>
                <input type="text" class="form-control" id="precoV" name="precoV" value="${precoV}">
            `);

        if (!precoV){
            resp.write(`
                <div>
                    <span><p class="text-danger">Informe o preço da venda</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
            <div class="col-md-3">
                <label for="validade" class="form-label">validade do produto</label>
                <input type="date" class="form-control" id="validade" name="validade" value="${validade}">
                `);
            if (!validade){
                resp.write(`
                <div>
                    <span><p class="text-danger">Informe a validade</p></span>
                </div>
                `);      
        }
        resp.write(`
    
            </div>
            <div class="col-md-3">
                <label for="estoque" class="form-label">Quantidade em estoque</label>
                <input type="number" class="form-control" id="estoque" name="estoque" value="${estoque}">
            `);
        if (!estoque){
            resp.write(`
                <div>
                    <span><p class="text-danger">Informe a quantidade em estoque</p></span>
                </div>
                `);
        }
        resp.write(`
            </div>
            <div class="col-md-3">
                <label for="fabricante" class="form-label">Fabricante</label>
                <input type="text" class="form-control" id="fabricante" name="fabricante" value="${fabricante}">
            `);

        if (!fabricante){
            resp.write(`
                <div>
                    <span><p class="text-danger">Informe o fabricante</p></span>
                </div>
                `);
        }

        resp.write(`
            </div>
        <div class="col-12">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
        </div>
        </form>
    </div>
    <div>
    <p><span>Seu último acesso foi realizado em ${dataHoraUltimoLogin}</span></p>
    </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    </html> `);

    } 
 

    resp.end();
}
function autenticarUsuario(req, resp){
    const usuario = req.body.usuario;
    const senha   = req.body.senha;

    if (usuario === 'admin' && senha === '1234'){
       
        req.session.usuarioLogado = true;
    
        resp.cookie('dataHoraUltimoLogin', new Date().toLocaleString(), {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});
        resp.redirect('/');
    }
    else{
        resp.send(`
                    <html>
                        <head>
                         <meta charset="utf-8">
                         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                               integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                        </head>
                        <body>
                            <div class="container w-25"> 
                                <div class="alert alert-danger" role="alert">
                                    Usuário ou senha inválidos!
                                </div>
                                <div>
                                    <a href="/login.html" class="btn btn-primary">Tentar novamente</a>
                                </div>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                                crossorigin="anonymous">
                        </script>
                    </html>
                  `
        );
    }
}


function verificarAutenticacao(req, resp, next){
    if (req.session.usuarioLogado){
        next(); 
    }
    else
    {
        resp.redirect('/login.html');
    }
}
app.get('/login', (req, resp) =>{
    resp.redirect('/login.html');
});
app.get('/logout', (req, resp) => {
    req.session.destroy(); 
    resp.redirect('/login.html');
});

app.post('/login', autenticarUsuario);
app.get('/',verificarAutenticacao, menuView);
app.get('/cadastrarProduto',  verificarAutenticacao, cadastroProdutoView); 
app.post('/cadastrarProduto',verificarAutenticacao,cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}/`);
});