"use strict"
class Plant {

    constructor(name, height, unit){
        this.name = name
        this.height = height
        this.unit = unit

        if(this.unit === "in"){
            this.preciseHeight = this.height * 2.54
        } else if (this.unit === "ft"){
            this.preciseHeight = this.height * 12 * 2.54
        } else {
            this.preciseHeight = this.height
        }
    }
}