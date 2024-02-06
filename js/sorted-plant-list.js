class SortedPlantList{
    constructor(){
        this.plantsArr = []
    }

    add(newPlant){
        this.plantsArr.push(newPlant)
    }

    getArray(){
        return this.plantsArr
    }
}