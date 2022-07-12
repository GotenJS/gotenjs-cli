const serviceText = () => {
    return `import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class Interceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('currentUser') && localStorage.getItem('token')) {
            req = req.clone({
                setHeaders: {
                    token: localStorage.getItem('token')
                }
            });
        }
        return next.handle(req);
    }
}
`;
};

module.exports = serviceText;
