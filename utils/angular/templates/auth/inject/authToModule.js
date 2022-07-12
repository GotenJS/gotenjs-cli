const authToModuleText = () => {
    return {
        imports,
        importsModule,
        providers
    };
};

const imports = () =>`
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './auth/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './auth/errorInterceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
`;
const importsModule = () =>`BrowserAnimationsModule,
        ToastrModule.forRoot(),
`;
const providers = () => `{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
`;
module.exports = authToModuleText;