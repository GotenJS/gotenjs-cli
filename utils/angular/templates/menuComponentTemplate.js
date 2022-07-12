const menuComponentText = (projectName) => {
    return {
        html: html(projectName),
        ts,
    };
};

const ts = () => {
    return `import { Component } from '@angular/core';
// <imports-menu>
// </imports-menu>
@Component({
    selector: 'menu-tab',
    templateUrl: './menu.component.html',
})
export class MenuComponent {
    public menus: Array<any>;
    public selectedMenu: number;
    // <definitions-menu>
    // </definitions-menu>

    constructor(
        // <constructor-menu>
        // </constructor-menu>
    ) {
        this.menus = [
// <tabs>
// </tabs>
            { link: '/home', title: 'Home' },
        ];
        this.changeMenu();
    }

    changeMenu(menuTitle = '') {
        const index = this.menus.findIndex(menu => menu.title === menuTitle);
        this.selectedMenu = index > -1 ? index : this.menus.length - 1;
    }

    // <behavior>
    // </behavior>
}
`;
};

const html = (projectName) => {
	return () => { 
        return `<nav class="navbar navbar-expand-lg navbar-light bg-white shadow fixed-top">
        <a class="navbar-brand" [routerLink]="['/']" (click)="changeMenu()">${projectName}</a>
        <button class="navbar-toggler" type="button" (click)="toggleNavbar = !toggleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
        <div class="collapse navbar-collapse" [ngbCollapse]="!toggleNavbar" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" *ngFor="let menu of menus; let i = index;" [ngClass]="{'active':i===selectedMenu}" (click)="changeMenu(menu.title)">
                    <a class="nav-link" [ngClass]="{'active':i===selectedMenu}" [routerLink]="[menu.link]">
                        {{menu.title}}
                    </a>
                </li>
                <!-- logout -->
            </ul>
        </div>
    </nav>`;
}
};

module.exports = menuComponentText;