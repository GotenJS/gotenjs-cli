const serviceText = (name) => {
    const lowerName = name.toLowerCase();
    const upperName = name.toUpperCase();
    return `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ${name}DTO } from '../dtos/${lowerName}.dto';
import { IdResponse } from '../dtos/responses/generic.response';
import { ${name}sResponse, ${name}Response } from '../dtos/responses/${lowerName}.response';
import { ${name}Filter } from '../dtos/filters/${lowerName}.filter';

const ${upperName}_URL = environment.BASE_URL + '${lowerName}s';

@Injectable()
export class ${name}Service {

    public ${lowerName}s$: Observable<${name}sResponse>;
    public ${lowerName}Filter: ${name}Filter;

    constructor(
        private http: HttpClient,
    ) {
        this.${lowerName}Filter = new ${name}Filter();
    }

    public get${name}s(offset: number = 0, limit: number = this.${lowerName}Filter.limit): Observable<${name}sResponse> {
        this.${lowerName}Filter.offset = offset;
        this.${lowerName}Filter.limit = limit;
        this.${lowerName}s$ = this.http.get<${name}sResponse>(${upperName}_URL + this.${lowerName}Filter.toQueryString());
        return this.${lowerName}s$;
    }

    public fetch${name}(${lowerName}Id: any): Observable<${name}Response> {
        return this.http.get<${name}Response>(\`\${${upperName}_URL}/\${${lowerName}Id}\`);
    }

    public create${name}(${lowerName}: ${name}DTO): Observable<${name}Response> {
        return this.http.post<${name}Response>(\`\${${upperName}_URL}/\`, ${lowerName});
    }

    public edit${name}(${lowerName}: ${name}DTO, ${lowerName}Id: any = ${lowerName}.id): Observable<${name}Response> {
        return this.http.put<${name}Response>(\`\${${upperName}_URL}/\${${lowerName}Id}\`, ${lowerName});
    }

    public delete${name}(${lowerName}Id: any): Observable<IdResponse> {
        return this.http.delete<any>(\`\${${upperName}_URL}/\${${lowerName}Id}\`);
    }
}
`;
};

module.exports = serviceText;
