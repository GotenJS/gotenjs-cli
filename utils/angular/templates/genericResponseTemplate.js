const genericResponseText = () => {
    return `export class GenericResponse<Data, Error = any> {
    public data: Data;
    public error: Error;
}

export class IdResponse extends GenericResponse<IdResponseBody> {}

class IdResponseBody {
    public id: any;
}

class ListResponse<ListData> {
    public list: Array<ListData>;
    public total: number;
    public offset: number;
    public limit: number;
}

export class GenericListResponse<ListData> extends GenericResponse<ListResponse<ListData>> {}

`;
};

module.exports = genericResponseText;