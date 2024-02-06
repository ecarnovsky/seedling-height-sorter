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

} else {
    let btn = document.querySelector('.standard-btn')
    btn.classList.add("active")
    btn.setAttribute("aria-pressed", "true")
}

let plantList = new SortedPlantList()


document.querySelector(".standard-btn").addEventListener('click', changeSystem)
document.querySelector(".metric-btn").addEventListener('click', changeSystem)

document.querySelector(".print-btn").addEventListener('click', function () {window.print()})
document.querySelector(".clear-all-btn").addEventListener('click', function () {document.querySelector(".clear-all-alert").classList.toggle('hidden')})

document.querySelector('#add-btn').addEventListener('click', addPlant)

function changeSystem(){
    if (this.classList.contains("standard-btn")){
        setCookie("isMetric", false)
        location.reload()
    } else if (this.classList.contains("metric-btn")) {
        setCookie("isMetric", true)
        location.reload()
    }
}

function setCookie(name, value){

    document.cookie = name + "=" + value

}

function addPlant(){

    let name = document.querySelector('#name-field').value
    let height = document.querySelector('#height-field').value
    let unit = document.querySelector('#unit-field').value

    let newPlant = new Plant(name, height, unit)
    plantList.add(newPlant)
    refreshListView()
}

function refreshListView(){
    document.querySelector('.plant-div-container > div').innerHTML = ""
    let arrayOfPlants = plantList.getArray()
    
    arrayOfPlants.forEach(plant => {

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

            console.log("test")
            console.log(isMetric)

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
            `<div class="plant-div">
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

function getCookie(name){

    let cookies = document.cookie.split(";")
    
    for(let i = 0 ; i < cookies.length ; i++){
        let currentCookie = cookies[i].split("=")

        if ( currentCookie[0].trim() === name){
            return currentCookie[1].trim()
        }
    }
}
