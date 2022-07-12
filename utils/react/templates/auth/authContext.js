module.exports = authContext = () => (
    `import React from "react";
import axios from "axios";
import config from "../config/config";
import decoder from "jwt-decode";

const { Provider, Consumer } = React.createContext();

const isLoggedIn = () => {
    return new Promise((res, rej) => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            res(user);
        } else {
            rej("no hay usuario");
        }
    });
};

const initialState = {
    authenticated: false,
    username: ""
};

class AuthProv extends React.Component {
    constructor() {
        super();
        this.state = { ...initialState };
    }

    componentDidMount() {
        isLoggedIn()
            .then(res => {
                this.setState({ username: res.username, authenticated: true });
            })
            .catch(err => null);
    }

    login = async ({ username, password }, successCallback, errorCallback) => {
        axios({
            method: "post",
            url: config.login,
            data: {
                username,
                password
            }
        })
            .then(response => {
                const token = response.data.data;
                localStorage.setItem("token", token);
                const decodedToken = decoder(token);
                const user = { id: decodedToken.id, username: decodedToken.username };
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.setState(
                    {
                        authenticated: true,
                        username
                    },
                    () => {
                        successCallback({ response, username });
                    }
                );
            })
            .catch(e => {
                errorCallback(e.response);
            });
    };

    logout = async () => {
        this.setState({ ...initialState }, () => {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("redirect");
        });
    };

    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    login: this.login,
                    logout: this.logout
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

function withAuth(Component) {
    return function Authenticated(props) {
        return (
            <Consumer>
                {({ login, logout, authenticated, username }) => {
                    return (
                        <Component
                            {...props}
                            login={login}
                            logout={logout}
                            username={username}
                            authenticated={authenticated}
                        />
                    );
                }}
            </Consumer>
        );
    };
}

export { AuthProv as AuthProvider, Consumer as AuthConsumer, withAuth };
`
);