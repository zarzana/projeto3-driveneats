document.addEventListener('DOMContentLoaded', init);

function init() {

    singleAlternatingSelectionById('dishes', 'product-box', 'product-box-selected')
    singleAlternatingSelectionById('drinks', 'product-box', 'product-box-selected')
    singleAlternatingSelectionById('desserts', 'product-box', 'product-box-selected')

}

function singleAlternatingSelectionById(id, inactiveClassName, activeClassName) {

    var elements = document.getElementById(id).querySelectorAll('.' + inactiveClassName);
    
    elements.forEach(element => {
        element.addEventListener('click', () => {
            if (element.classList.contains(activeClassName)) {
                element.classList.remove(activeClassName)
            }
            else {
                document.getElementById(id).querySelector('.' + activeClassName)?.classList.remove(activeClassName);
                element.classList.add(activeClassName);
            }
            confirmationButtonActivation()
        })
    })
}

function confirmationButtonActivation() {
    if (document.querySelectorAll('.product-box-selected').length == 3) {
        document.querySelector('.confirmation-button-inactive').classList.add('confirmation-button-active');
        document.getElementById('confirmation-button-text').innerHTML = 'Fechar pedido';
    }
    else if (document.querySelector('.confirmation-button-inactive').classList.contains('confirmation-button-active')) {
        document.querySelector('.confirmation-button-inactive').classList.remove('confirmation-button-active');
        document.getElementById('confirmation-button-text').innerHTML = 'Selecione os 3 itens<br>para fechar o pedido';
    }
}



