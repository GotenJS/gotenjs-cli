const serviceText = () => {
    return `import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.BASE_URL + 'auth/login' === req.url) {
            return next.handle(req).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        console.log('event--->>>', event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    const POSITION = 'toast-bottom-center';
                    switch (error.status) {
                        case 401:
                            this.toastr.error('Usuario y/o contraseña no válidos', 'Inténtelo nuevamente', {
                                positionClass: POSITION
                            });
                            break;
                        case 0:
                            this.toastr.error('Intente mas tarde', 'No es posible loguearse', {
                                positionClass: POSITION
                            });
                            break;
                    }
                    return throwError(error);
                }));
        }

        return next.handle(req);
    }
}
`;
};

module.exports = serviceText;
