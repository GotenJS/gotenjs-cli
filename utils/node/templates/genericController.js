const genericControllerText = () =>{
    return `class GenericController{
    static resolve(next, promisse, thenFunc, errorStatusCode = 400){
        promisse
            .then(thenFunc)
            .catch(err => {
                var error = new Error(err.message);
                error.status = errorStatusCode;
                next(error);
            });
    }

};

module.exports = GenericController;`;
};

module.exports = genericControllerText;