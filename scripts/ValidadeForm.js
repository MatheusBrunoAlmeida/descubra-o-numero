function ValidateForm(error){

    let errorText = document.getElementById('error-text')

    if(errorText.className === 'none'){
        errorText.classList.remove('none')
    }

    if(error === 'empty'){
        errorText.textContent = 'Você precisa digitar um palpite'
    }

    if(error === 'maxvalue'){
        errorText.textContent = 'O valor do maximo para palpite é de 300'
    }

    if(error === 'minvalue'){
        errorText.textContent = 'O valor do minimo para palpite é de 1'
    }
}