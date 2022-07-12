const engines = require("../engines");

const genericAssemblerText = (options) => {
    const id = engines.getIdKey(options.database.engine);
    return `class GenericAssembler{
    static convertIn(input, output){
        for(let key of Object.keys(output)){
            if(input[key]){
                output[key] = input[key]
            }
        }
	}

	static convertList(models, convertMethod) {
		return models.map(model => convertMethod(model))
	}

	static toDTO(model, ClassDTO) {
		const dto = new ClassDTO()
		if (model.${id}) {
			dto.id = model.${id}
		}
		return dto
	}

	static fromDTO(dto, ClassModel) {
		const model = new ClassModel()
		if (dto.id) {
			model.${id} = dto.id
		}
		return model
	}

}

module.exports = GenericAssembler`;
};

module.exports = genericAssemblerText;