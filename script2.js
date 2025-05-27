//validar nombre, debe contener solo letras y no ser vacio
//validar edad: Debe ser mayor o igual a 18 y menor a 100
let persons = []

const nameError = document.getElementById("errorNombre")
const ageError = document.getElementById("errorEdad")
const errors = [nameError, ageError]

const clearErrors = () => {
    errors.forEach(error => {
        error.innerText = ""
    })
}

const showError = (errorMessage, errorElement) => {
    errorElement.innerText = errorMessage
    errorElement.style.color = 'red'
}

function validateName(name, errorElement) {
    if (name.trim().length === 0) {
        showError("El campo nombre no puede estar vacío.", errorElement)
        return false
    }

    const pattern = /[0-9]/g

    if (name.match(pattern)) {
        showError("El campo no puede contener números.", errorElement)
        return false
    }

    clearErrors()
    return true
}

function validateAge(age, errorElement) {
    const personAge = Number(age)

    if (age.trim().length === 0) {
        showError("La edad no puede estar vacía", errorElement)
        return false
    }

    if (personAge < 18 || personAge >= 100) {
        showError("La edad debe estar entre los 18 y 99 años.", errorElement)
        return false
    }

    clearErrors()

    return true
}

function validar() {
    const nameInput = document.getElementById("nombre")
    const ageInput = document.getElementById("edad")

    const person = {
        name: nameInput.value,
        age: ageInput.value
    }

    if (!validateName(nameInput.value, nameError)) return;
    if (!validateAge(ageInput.value, ageError)) return;

    persons.push(person)

    nameInput.value = ''
    ageInput.value = ''
    return updateTable()
}


function updatePerson(personIndex) {
    const buttonUpdate = document.getElementById("btnActualizar")
    const updateNameInput = document.getElementById("editarNombre")
    const updateAgeInput = document.getElementById("editarEdad")
    const person = persons[personIndex]

    buttonUpdate.value = personIndex
    updateNameInput.value = person.name
    updateAgeInput.value = person.age
    return;
}


function updateTable() {
    const tableBody = document.getElementById("cuerpoTabla")
    const personsRows = persons.map((person, index) =>
        `
    <tr>
    <td>${person.name}</td>
    <td>${person.age}</td>
    <td>
    <button onclick='updatePerson(${index})'>
    Modificar
    </button>
    <button onclick='deletePerson(${index})'>
    Eliminar
    </button>
    </td>
    </tr>
    `
    )
    tableBody.innerHTML = personsRows.join('')
    return;
}

function confirmDeletePerson(personIndex) {
    const confirmDeleteElement = document.getElementById("confirmarEliminacion")
    confirmDeleteElement.innerHTML = ''
    persons = persons.filter((_, index) => index !== personIndex)
    return updateTable()
}

function deletePerson(personIndex) {
    const person = persons[personIndex]
    const confirmDeleteElement = document.getElementById("confirmarEliminacion")
    confirmDeleteElement.innerHTML = `
  <p>¿Estás seguro que deseas eliminar a: ${person.name}?</p>
  <button onclick='confirmDeletePerson(${personIndex})'>Confirmar</button>
  `
    return;
}

function actualizar() {
    const newName = document.getElementById("editarNombre")
    const newAge = document.getElementById("editarEdad")
    const buttonUpdate = document.getElementById("btnActualizar")

    const updatedPerson = {
        name: newName.value,
        age: newAge.value
    }

    persons[buttonUpdate.value] = updatedPerson

    newName.value = ''
    newAge.value = ''
    buttonUpdate.value = ''
    return updateTable();
}