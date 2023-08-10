const btnCamera = document.querySelector('[data-video-botao]');
const video = document.querySelector('[data-video]');
const camera = document.querySelector('data-camera');
const mensagem = document.querySelector('[data-mensagem]');
const canvas = document.querySelector('[data-video-canvas]');
const btnTirarFoto = document.querySelector('[data-tirar-foto]');
const btnEnviarFoto = document.querySelector('[data-enviar]');

let imagemURL = '';


btnCamera.addEventListener('click', async function () {
    const cameraLigada = await navigator.mediaDevices // FAZ COM QUE A CAMERA SEJA LIGADA , A FUNCAO ASYNC RETORNA UMA PROMISE, POIS AGUARDAMOS A APROVAÇÃO DO USUARIO PARA ACESSAR A CAMERA
    .getUserMedia({video: true, audio : false});

    btnCamera.style.display = 'none';
    camera.style.display = 'block';

    video.srcObject = cameraLigada;
    
})

//OBS : NÃO FUNCIONOU NO MEU COMPUTADOR , POIS NÃO TINHA ACESSO A CAMERA

btnTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);// COLOCA A IMAGEM CAPTURADA NA VARIAVEL CANVAS

    imagemURL = canvas.toDataURL('image/jpeg'); // CONVERTE A IMAGEM CAPTURADA PARA URL , PARA SALVARMOS DEPOIS

    camera.style.display = "none";
    mensagem.style.display = "block";
});

btnEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = imagemURL;// INSERIMOS A IMAGEM CAPTURADA NO OBJETO QUE ESTAVA DENTRO DO LOCALSTORANGE

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))// INSERE O OBJETO NO LOCALSTORANGE COM A IMAGEM

    window.location.href = './pages/abrir-conta-form-3.html';
})
