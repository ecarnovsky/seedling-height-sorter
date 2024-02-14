"use strict"
// set up cookies if there are none 
if (getCookie("isMetric") === undefined){
    setCookie("isMetric", false)
}

// get the cookie data
let isMetric = getCookie("isMetric")


// set the metric/standard btn
if (isMetric==="true"){
    let btn = document.querySelector('.metric-btn')
    btn.classList.add("active")
    btn.setAttribute("aria-pressed", "true")

    document.querySelector('#unit-field').value= "cm"


} else {
    let btn = document.querySelector('.standard-btn')
    btn.classList.add("active")
    btn.setAttribute("aria-pressed", "true")
}

let plantList = new SortedPlantList()

listOfPlantSuggestions.forEach(plant => {
    document.getElementById("plant-suggestions").innerHTML += `<option value="${plant.name}"></option>`
})


document.querySelector(".standard-btn").addEventListener('click', changeSystem)
document.querySelector(".metric-btn").addEventListener('click', changeSystem)

document.querySelector(".print-btn").addEventListener('click', function () {window.print()})
document.querySelector(".clear-all-btn").addEventListener('click', toogleClearAllAlertVisibility)
document.querySelector(".no-clear-all-btn").addEventListener('click', toogleClearAllAlertVisibility)
document.querySelector(".yes-clear-all-btn").addEventListener('click', deletePlantList)

document.querySelector('#name-field').addEventListener('keydown', testIfMoveFocusToHeightField)
document.querySelector('#height-field').addEventListener('keydown', testIfAddPlant)

document.querySelector('#add-btn').addEventListener('click', addPlant)

addEventListenersToPlantIcons()

function addEventListenersToPlantIcons(){
    let trashCans = document.querySelectorAll('.delete-plant-btn')
    for (let i = 0; i < trashCans.length; i++){
        trashCans[i].addEventListener('click', deletePlant)
    }
}

function deletePlant(){
    if(confirm(`Are you sure you want to delete ${this.parentElement.parentElement.querySelector('.plant-name-div').innerText}?`)){
        // plant indices are stored as ids in the format "plant-#"
        let plantIndex = parseInt(this.parentElement.parentElement.id.split("-")[1])
        plantList.deletePlant(plantIndex)
        refreshListView()
        addEventListenersToPlantIcons()
    }

}

function testIfMoveFocusToHeightField(event){
    if (event.keyCode == 13){
        focusOnHeightField()
    }
}
function focusOnHeightField(){
    document.getElementById('height-field').focus()
}
function focusOnNameField(){
    document.getElementById('name-field').focus()
}

function testIfAddPlant(event){
    if (event.keyCode == 13){
        focusOnNameField()
        addPlant()
    }
}

function changeSystem(){

    let metricBtn = document.querySelector('.metric-btn')
    let standardBtn = document.querySelector('.standard-btn')

    let pressedBtn
    let unPressedBtn
    
    if (this.classList.contains("standard-btn")){
        setCookie("isMetric", false)
        pressedBtn = standardBtn
        unPressedBtn = metricBtn
        document.querySelector('#unit-field').value= "in"
    } else if (this.classList.contains("metric-btn")) {
        setCookie("isMetric", true)
        pressedBtn = metricBtn
        unPressedBtn = standardBtn
        document.querySelector('#unit-field').value= "cm"
    }

    pressedBtn.classList.add("active")
    pressedBtn.setAttribute("aria-pressed", "true")

    unPressedBtn.classList.remove("active")
    unPressedBtn.setAttribute("aria-pressed", "false")


    isMetric = getCookie("isMetric")
    refreshListView()

}

function addPlant(){

    let name = document.querySelector('#name-field').value
    name = name.charAt(0).toUpperCase() + name.slice(1)

    let height = document.querySelector('#height-field').value
    let unit = document.querySelector('#unit-field').value

    if(name === ""){
        focusOnNameField()
        return 
    }
    if(!height){
        focusOnHeightField()
        return 
    }

    let newPlant = new Plant(name, height, unit)
    plantList.add(newPlant)
    refreshListView()
    document.querySelector('#name-field').value = ""
    document.querySelector('#height-field').value = ""
    focusOnNameField()
    addEventListenersToPlantIcons()


}

function refreshListView(){

    document.querySelector('.plant-div-container > div').innerHTML = ""
    let arrayOfPlants = plantList.getArray()
    
    arrayOfPlants.forEach( (plant, idx) => {


        let firstDisplayHeight 
        let firstDisplayHeightUnit

        let heightInFt
        let secondDisplayHeightPlusUnit = ""


        if(isMetric === "false"){

            firstDisplayHeightUnit = 'in'

            switch (plant.unit) {
                case 'in':
                    firstDisplayHeight = plant.height
                    break;
                case 'ft':
                    firstDisplayHeight = plant.height * 12
                    heightInFt = plant.height
                    break;
                case 'cm':
                    firstDisplayHeight = (plant.height * 0.3937).toFixed(1)
                    break;
            }
        } else if(isMetric === "true"){

            firstDisplayHeightUnit = 'cm'

            switch (plant.unit) {
                case 'cm':
                    firstDisplayHeight = plant.height
                    break;
                case 'in':
                    firstDisplayHeight = (plant.height * 2.54).toFixed(1)
                    break;
                case 'ft':
                    firstDisplayHeight = (plant.height * 12 * 2.54).toFixed(1)
                    break;
            }
        }

        if (heightInFt){
            secondDisplayHeightPlusUnit = `(${heightInFt} ft)`
        }

        document.querySelector('.plant-div-container > div').innerHTML += 
            `<div id="plant-${idx}" class="plant-div">
                <div class="plant-name-div">
                    <span>${plant.name}</span>
                </div>
                <div class="plant-height-div">
                    <div>
                        <span>${firstDisplayHeight} ${firstDisplayHeightUnit}</span>
                    </div>
                    <div>
                        <span>${secondDisplayHeightPlusUnit}</span>
                    </div>
                </div>
                <div class="plant-controls-div">
                    <i class="fa-solid fa-pen-to-square clickable edit-plant-btn"></i>
                    <i class="fa-solid fa-trash clickable delete-plant-btn"></i>
                </div>
            </div>`
    })
}

function deletePlantList(){
    plantList = new SortedPlantList()
    refreshListView()
    toogleClearAllAlertVisibility()
    focusOnNameField()
}

function toogleClearAllAlertVisibility(){
    document.querySelector(".clear-all-alert").classList.toggle('hidden')
}

function setCookie(name, value){

    document.cookie = name + "=" + value

}

function getCookie(name){

    let cookies = document.cookie.split(";")
    
    for(let i = 0 ; i < cookies.length ; i++){
        let currentCookie = cookies[i].split("=")

        if ( currentCookie[0].trim() === name){
            return currentCookie[1].trim()
        }
    }
}
