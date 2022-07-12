const genericDTOText = () =>{
    return `class GenericModelDTO{
    constructor() {	}

    hydrate(data){
        for(let key of Object.keys(this)){
			if(data[key] != null && data[key] != undefined){
                this[key] = data[key];
            }
        }
    }

    getData(){
        let validData = {};
        for(let key of Object.keys(this.data)){
            if (this[key] != null && this[key] != undefined){
                validData[key] = this[key];
            }
        }
        return validData;
    }
};

module.exports = GenericModelDTO;`;
};

module.exports = genericDTOText;