/**
 *  A logica usada para o projeto foi simples
 *  Primeiro inicio o script salvando em variaveis cada elemento html que é importante para atualizacao
    e faco a requisição no servidor usando uma função asincrona para controle de error
 
    Para validação do formulario ultilizei um script a parte, imprimindo na tela do usuario
    cada validação: Se está vazio ou se o numero é maior ou menor que o maximo permitido

    Quando o usuario da o seu paplpite eu verifico se é maior, menor ou igual ao valor correto já armazenado em memoria e imprimo a resposta para o usuario


    Vale resaltar que por algumas questões pessoas, não tive tempo para me dedicar a construção da fonte display e por isso, ultilizei uma pronta.

    Por padrão, deixei o meu projeto todo em ingles.

    No codigo foram deixados consoles para que facilite para os avaliadors, podendo ver o resultado obtivo na requisicão 
    mais rapido.
 * 
 */


let numberCorrect
let guess = document.getElementById('guess')
let newGameContainer = document.getElementById('new-game-container')
let resultNumber = document.getElementById('reult-number')
let resultDescription = document.getElementById('result-description')
let btnSubmit = document.getElementById('btn-submit-form')

async function getData(){

    try {
        const response = await fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300');
    
        console.log('status code: ', response.status); // 👉️ 200
    
        if (!response.ok) {
          ErrorGuess( response.status)
          throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.json();
        numberCorrect = Number(result.value)
        console.log(numberCorrect)
        return result;
        
      } catch (err) {
      }
}



function HandleSubmitGuess(){
    if(guess.value === ''){
        ValidateForm('empty')
        return
    }
    if(guess.value > 300){
        ValidateForm('maxvalue')
        return
    }
    if(guess.value < 1){
        ValidateForm('minvalue')
        return
    }

    let errorText = document.getElementById('error-text')
    errorText.classList.add('none')

    ValidateGuess()

}

function ValidateGuess(){

    let gussUser = guess.value

    resultNumber.textContent = guess.value

    if(gussUser > numberCorrect){
        resultDescription.textContent = 'É maior'
    }

    if(gussUser < numberCorrect){
        resultDescription.textContent = 'É menor'
    }

    if(gussUser == numberCorrect){
        RightGuess()
    }
}

function RightGuess(){

    resultDescription.textContent = 'Você acertou!!!'

    resultDescription.classList.add('color-right')
    resultNumber.classList.add('color-right')

    Finalized()
}

function ErrorGuess(code){
    resultNumber.textContent = code;

    resultNumber.classList.add('color-error')

    resultDescription.textContent = 'ERRO'

    resultDescription.classList.add('color-error')


    Finalized()
}

function Finalized(){
    newGameContainer.classList.remove('none')

    guess.setAttribute("disabled", "disabled");
    btnSubmit.setAttribute("disabled", "disabled");

    guess.classList.add('disabled')
    btnSubmit.classList.add('disabled')
}

function NewGame(){
    location.reload()
}

getData()