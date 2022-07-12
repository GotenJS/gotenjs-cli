const genericFilterText = () => {
    return `export class GenericFilter {

    public limit: number;
    public offset: number;

    constructor() {
        this.limit = 10;
        this.offset = 0;
    }

    public toQueryString(): string {
        let queryString = '?';
        Object.keys(this).filter(property => this[property] != null).forEach((property, i) => {
            if (i !== 0) {
                queryString += '&';
            }
            queryString += \`\${property}=\${this.valueOf(this[property])}\`;
        });
        return queryString;
    }

    private valueOf(value) {
        const isDate = value instanceof Date;
        if (isDate) {
            return value.toISOString();
        } else {
            return value;
        }
    }
}
`;
};

module.exports = genericFilterText;
