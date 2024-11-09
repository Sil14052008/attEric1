const express = require('express');


const app = express();


const PORT = 3000;


app.use(express.json());


let publicacoes = [];
let idAtual = 1;


app.post('/publicacao', (req, res) => {
    
    const publicacao = {
        id: idAtual++,          
        ...req.body              
    };

    publicacoes.push(publicacao);
    
    res.status(201).json(publicacao);
});


app.delete('/publicacao/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    
    const index = publicacoes.findIndex((pub) => pub.id === id);

    
    if (index !== -1) {
    
        const publicacaoRemovida = publicacoes.splice(index, 1);
        
        res.json(publicacaoRemovida);
    } else {
        
        res.status(404).json({ error: 'Publicação não encontrada' });
    }
});


app.get('/publicacao/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    
    const publicacao = publicacoes.find((pub) => pub.id === id);

    
    if (publicacao) {
        
        res.json(publicacao);
    } else {
        
        res.status(404).json({ error: 'Publicação não encontrada' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
