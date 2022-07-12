const homeComponentTexts = () => {
    return {
        html,
        ts,
    };
};

const ts = () => {
    return `import { Component } from '@angular/core';

@Component({
    selector: 'home-tab',
    templateUrl: './home.component.html',
})
export class HomeComponent {

}
`;
};

const html = () => {
    return `<div style="text-align:center">
    <div>
        <h1>
            Welcome to Goten for Angular!
        </h1>
        <img width="200" alt="Goten Logo" src="assets/Goten.png">
        <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
        <h2>Here are some links to help you start</h2>
    </div>
    <ul>
        <li>
            <h2>
                <a target="_blank" rel="noopener" href="https://gitlab.cysonline.com.ar/goten/goten-cli">CLI Documentation</a>
            </h2>
        </li>
        <li>
            <h2>
                <a target="_blank" rel="noopener" href="https://gitlab.cysonline.com.ar/goten/">Goten repositories</a>
            </h2>
        </li>
    </ul>
</div>`;
};

module.exports = homeComponentTexts;