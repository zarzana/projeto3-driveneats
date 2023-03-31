document.addEventListener('DOMContentLoaded', init);

var purchaseMessage = ''

function init() {

    singleAlternatingSelectionById('dishes', 'product-box', 'product-box-selected')
    singleAlternatingSelectionById('drinks', 'product-box', 'product-box-selected')
    singleAlternatingSelectionById('desserts', 'product-box', 'product-box-selected')
    confirmationButtonListener()
    confirmCancelListener(purchaseMessage)

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
            confirmationButtonActivation();
        })
    })
}

function confirmationButtonActivation() {

    if (document.querySelectorAll('.product-box-selected').length == 3) {
        document.querySelector('.confirmation-button-inactive').classList.add('confirmation-button-active');
        document.getElementById('confirmation-button-text').innerHTML = 'Fechar pedido';
        document.querySelector('.confirmation-button-inactive').removeAttribute('disabled');
    }

    else if (document.querySelector('.confirmation-button-inactive').classList.contains('confirmation-button-active')) {
        document.querySelector('.confirmation-button-inactive').classList.remove('confirmation-button-active');
        document.getElementById('confirmation-button-text').innerHTML = 'Selecione os 3 itens<br>para fechar o pedido';
        document.querySelector('.confirmation-button-inactive').setAttribute('disabled', '');
    }
}


function confirmationButtonListener() {

    confirmationButton = document.getElementsByClassName('confirmation-button-inactive')[0];
    confirmationButton.addEventListener('click', () => {
        purchaseBoxAndMessage();
        document.getElementsByClassName('confirmation-menu')[0].classList.remove('hidden');
    })

}

function purchaseBoxAndMessage() {

    var selectedProducts = document.querySelectorAll('.product-box-selected');
    var confirmationLines = document.querySelectorAll('.confirmation-line');
    var totalSum = 0;
    var confirmationNames = ['- Prato: ', '- Bebida: ', '- Sobremesa: ', 'Total: ']
    var currentPurchaseMessage = 'Olá, gostaria de fazer o pedido:\n';

    for (let i = 0; i < 4; i++) {

        if (i < 3) {
            let productName = selectedProducts[i].getElementsByClassName('product-name')[0].innerHTML;
            let productPrice = selectedProducts[i].getElementsByClassName('product-price')[0].innerHTML.substring(3);
            totalSum += parseFloat(productPrice.replace(',', '.'));
            let productInformation = [productName, productPrice];
            for (let j = 0; j < 2; j++) {
                confirmationLines[i].children[j].innerHTML = productInformation[j];
            }
            // writing message
            currentPurchaseMessage += confirmationNames[i] + productName + '\n'
        }

        else {
            totalSumString = 'R$ ' + totalSum.toFixed(2).replace('.', ',')
            confirmationLines[i].children[1].innerHTML = '<strong>' + totalSumString + '</strong>';
            // writing message
            currentPurchaseMessage += confirmationNames[i] + totalSumString
        }

    }

    purchaseMessage = currentPurchaseMessage

}

function confirmCancelListener(message) {

    var confirmButton = document.getElementById('confirmButton');
    var cancelButton = document.getElementById('cancelButton');

    confirmButton.addEventListener('click', () => {

        let clientName = prompt('Qual o nome?')
        let clientAddress = prompt('Qual o endereço?')

        // writing message
        purchaseMessage += `\n\nNome: ${clientName}\nEndereço: ${clientAddress}`

        window.open(`https://wa.me/5599999999999?text=${encodeURIComponent(purchaseMessage)}`, '_self')
    })

    cancelButton.addEventListener('click', () => {
        document.getElementsByClassName('confirmation-menu')[0].classList.add('hidden');
    })

}
