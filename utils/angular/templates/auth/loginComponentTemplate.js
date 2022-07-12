const LoginComponentTexts = () => {
    return {
        html,
        ts,
        css
    };
};

const ts = () => {
    return `import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {

        if (this.authService.currentUserValue) {
            this.router.navigate(['home']);
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            usuario: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'home';
    }

    login() {
        const val = this.form.value;
        if (this.form.valid) {
            this.authService.login(val.usuario, val.password).subscribe(
            authResult => {
                this.router.navigate([this.returnUrl]);
            },
            err => {
                console.log(err);
            }
            );
        } else {
            this.submitted = true;
        }
    }

    get usuario() {
        return this.form.get('usuario');
    }

    get password() {
        return this.form.get('password');
    }
}
`;
};

const html = () => {
    return `<body>
	<div class="container">
    	<div class="row">
        	<div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            	<div class="card card-signin border-secondary my-5">
                	<div class="card-body">
                    	<h5 class="card-title text-center">Log-In</h5>
                    	<form [formGroup]="form" class="form-signin">
                        	<label for="inputusuario">Usuario</label>
                        	<input formControlName="usuario" type="usuario" id="inputusuario" class="form-control"
                            	placeholder="Usuario" required>
                        	<div *ngIf="(usuario.invalid && (usuario.dirty || usuario.touched)) ">
                            	<label *ngIf="form.invalid || usuario.errors.required" style="color: red">
                                	Es requerido.
                            	</label>
                        	</div>
                        	<br />
                        	<label for="inputPassword">Password</label>
                        	<input formControlName="password" type="password" id="inputPassword" class="form-control"
                            	placeholder="Password" required>
                        	<div *ngIf="(password.invalid && (password.dirty || password.touched)) ">
                            	<label *ngIf="form.invalid || password.errors.required" style="color: red">
                                	Es requerido.
                            	</label>
                        	</div>
                        	<br />
                        	<label *ngIf="form.invalid && submitted" style="color:red">
                            	Debe completar todos los campos.
                        	</label>
                        	<button class="btn btn-lg btn-block text-uppercase" style="background-color:rebeccapurple; color:white"
                            	type="submit" (click)="login()">Sign
                            	in</button>
                    	</form>
                	</div>
            	</div>
        	</div>
    	</div>
	</div>
</body>`;
};

const css = ()=>{
    return `
:root {
	--input-padding-x: 1.5rem;
	--input-padding-y: .75rem;
}

body {
	background: transparent;
}

label {
	margin: 0px;
	font-size: 12px;
}

.card-signin {
	border-radius: 1rem;
	box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
	.card-title {
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 1.5rem;
	}
	.card-body {
    padding: 2rem;
	}
}

.form-signin {
	width: 100%;
	.btn {
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 1rem;
    transition: all 0.2s;
	}
}
	`;
};

module.exports = LoginComponentTexts;