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


document.querySelector(".standard-btn").addEventListener('click', changeSystem)
document.querySelector(".metric-btn").addEventListener('click', changeSystem)

document.querySelector(".clear-all-btn").addEventListener('click', function () {document.querySelector(".clear-all-alert").classList.toggle('hidden')})


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

function getCookie(name){

    let cookies = document.cookie.split(";")
    
    for(let i = 0 ; i < cookies.length ; i++){
        let currentCookie = cookies[i].split("=")

        if ( currentCookie[0].trim() === name){
            return currentCookie[1].trim()
        }
    }
}
