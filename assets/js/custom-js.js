const billInput = document.getElementById('bill-input')
const peopleInput = document.getElementById('people-input')
const customInput = document.getElementById('custom-tip')
const resetBtn = document.getElementById('reset')
const tipPercentage = document.querySelector('.tip__main-wrapper .tip__card-container')
const tipDisplay = document.querySelector('.summary__total-container .summary__tip-display')
const totalDisplay = document.querySelector('.summary__total-container .summary__total-display')

const calculateTip = (tipPercentage) => {
    let tipAmount = 0
    let totalAmount = 0

    if (billInput.value === '' || peopleInput.value === '') {
        return
    }

    if (tipPercentage === 0) {
        resetDisplay()
        return
    }

    const billAmount = billInput.value
    const numberOfPeople = peopleInput.value

    tipAmount = (((parseFloat(billAmount) * parseFloat(tipPercentage) / parseInt(numberOfPeople)) / 100) * 100).toFixed(2)
    totalAmount = ((parseFloat(billInput.value) + parseFloat(tipAmount) * parseInt(numberOfPeople)) / parseInt(numberOfPeople)).toFixed(2)

    tipDisplay.textContent = tipAmount
    totalDisplay.textContent = totalAmount
}

const resetDisplay = () => {
    tipDisplay.textContent = (0.00).toFixed(2)
    totalDisplay.textContent = (0.00).toFixed(2)
}

const resetInput = () => {
    billInput.value = ''
    peopleInput.value = ''
    customInput.value = ''
}


const resetAll = () => {
    resetDisplay()
    resetInput()

    //reset keyup event tips to 0
    billKey(0)
    peopleKey(0)

}

resetBtn.addEventListener('click', (e) => {
    const buttons = e.target.closest('.content-container').querySelector('.tip__card-container').children
    Array.from(buttons).forEach(buttonEl => {
        buttonEl.classList.remove('active')
    })
    resetAll()
})

const peopleKey = (tipPercentage) => {
    peopleInput.addEventListener('keyup', (e) => {
        const label = document.querySelector('.bill__main-wrapper .bill__label-container >p')

        if (e.target.value === '') {
            resetDisplay()
            label.classList.add('error')
            peopleInput.style.cssText = 'border:1px solid red;'
        } else{
            label.classList.remove('error')
            peopleInput.style.cssText = 'border:none'
        }

        calculateTip(tipPercentage)
    })
}

const billKey = (tipPercentage) => {
    billInput.addEventListener('keyup', (e) => {

        if (e.target.value === '') {
            resetDisplay()
        }

        calculateTip(tipPercentage)
    })
}


tipPercentage.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        const parent = e.target.parentElement
        Array.from(parent.children).forEach(childEl => {
            childEl.classList.remove('active')
        })
    }
    if (e.target.tagName === 'BUTTON') {
        const parent = e.target.parentElement
        parent.querySelectorAll(e.target.tagName).forEach(buttonEl => {
            buttonEl.classList.remove('active')
        })

        e.target.classList.add('active')

        const tipPercentage = e.target.value

        calculateTip(tipPercentage)

        // Pass tip percentage from click event to keyup events
        peopleKey(tipPercentage)
        billKey(tipPercentage)

    }
})

customInput.addEventListener('keyup', (e) => {

    const tipPercentage = parseFloat(e.target.value) * 0.01

    if (e.target.value === '') {
        tipDisplay.textContent = (0.00).toFixed(2)
        totalDisplay.textContent = (0.00).toFixed(2)
    }

    calculateTip(tipPercentage)

    // Pass tip percentage from click event to keyup events
    peopleKey(tipPercentage)
    billKey(tipPercentage)
})










