const genericFilterText = () =>{
    return `class GenericFilter{
    constructor(){
        this.data = {
        }
        this.pagination = {
            offset: 0,
            limit: 10,
        }
    }

    fillData(data){
        for(let key of Object.keys(this.data)){
            if(data[key]){
                this.data[key] = data[key];
            }
        }
        for(let key of Object.keys(this.pagination)){
            if(data[key]){
                this.pagination[key] = parseInt(data[key]);
            }
        }
    }

    filterData(){
        let filterData = {};
        for(let key of Object.keys(this.data)){
            if (this.data[key]){
                filterData[key] = this.data[key];
            }
        }
        return filterData;
    }

};

module.exports = GenericFilter;`;
};

module.exports = genericFilterText;