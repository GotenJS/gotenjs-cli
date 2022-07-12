const serviceText = () => {
    return `import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();
const AUTHURL = environment.BASE_URL + 'auth/login';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser$: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
    return this.http.post<any>(AUTHURL, { username, password })
        .pipe(map(
        authResult => {
            if (authResult && authResult.data) {
                this.setSession(authResult);
            }
            return authResult;
        }
        ));
    }

    public setSession(authResult) {
        const decodedToken = helper.decodeToken(authResult.data);
        const user = {id: decodedToken.id, username: decodedToken.username};
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', authResult.data);
        this.currentUserSubject.next(user);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public isLoggedIn() {
        return localStorage.getItem('currentUser');
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
}
`;
};

module.exports = serviceText;
