const e = require('express');
const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => 
{
    const extensaoValidas = ['jpg', 'jpeg', 'png'];
    const extensao = path.extname(caminho);
    //Obtem a extensão que foi passdos no caminho do arquivo e verifica se existe
    //uma posição no array de extenções válidas, mas é utilizaedo um substring 
    //para tirar o ponto do da extensão
    const extensaoEhValida = extensaoValidas.indexOf(extensao.substring(1)) !== -1;

    //Validando a extensão obtida e veridicada sua posição no array se for -1 
    //a extensão não é v;alida pois não existe no array
    if(extensaoEhValida){
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${extensao}`;
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        const erro = "Erro! Extensão inválida.";
        console.log('Erro! Extensão inválida.')
        callbackImagemCriada(erro);

    }
};
 