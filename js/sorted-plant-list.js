"use strict"
class SortedPlantList{
    constructor(){
        this.plantsArr = []
    }

    add(newPlant){

        let indexOfNewPlant

        // adds the new plant to the list if it's empty
        if (this.plantsArr.length === 0){
            this.plantsArr.push(newPlant)
            return
        } else {
            // looks for the index the new plant should go
            for(let i = 0; i < this.plantsArr.length; i++){
                if(newPlant.preciseHeight < this.plantsArr[i].preciseHeight){
                    indexOfNewPlant = i
                    break
                }
            }
        }
        // adds the new plant to the list if the index wasn't found(it's the tallest plant)
        if (indexOfNewPlant === undefined) {
            this.plantsArr.push(newPlant)
        } else {
            // move other plants forward
            for (let i = this.plantsArr.length - 1; i >= 0; i--){
                this.plantsArr[i + 1] =  this.plantsArr[i]
                // puts the new plant in the correct spot
                if(i === indexOfNewPlant){
                    this.plantsArr[i] = newPlant
                    break
                }
            }
        }

    }

    getArray(){
        return this.plantsArr
    }
}