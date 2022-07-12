module.exports = indexAuthComponent = () => (
    `import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { withNotifier } from "../SnackbarContext";
import { withAuth } from "./AuthContext";

const formStyle = {
    fontSize: 15,
    fontWeight: 600
};

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginAction: false,
            error: false,
            errorMessage: ""
        };
        this.usuarioRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    login = async () => {
        this.setState({ loginAction: true });
        if (this.state.username === "" || this.state.password === "") {
            this.setState({
                error: true,
                errorMessage: "Debe completar todos los campos"
            });
            return;
        }
        this.props.login(
            {
                username: this.state.username,
                password: this.state.password
            },
            respuestaAuth => {
                this.props.showSnackbar({
                    message: \`Hola \${respuestaAuth.username}!\`,
                    messageType: "success"
                });
            },
            err => {
                this.setState({ error: true, errorMessage: "Datos inválidos" });
                if (err.status === 400) {
                    this.props.showSnackbar({
                        message: 'Error: Usuario y/o contraseña inválidos',
                        messageType: "error"
                    });
                }
            }
        );
    };

    handleChange = (value, attribute) => {
        this.setState({ [attribute]: value, error: false, errorMessage: "" });
    };

    handleKeyPress = (e, label) => {
        if (e.key === "Enter") {
            if (label === "username")
                ReactDOM.findDOMNode(this.passwordRef.current).focus();
            else if (label === "password") this.login();
        }
    };

    render() {
        return this.props.authenticated ? (
            <Redirect to={localStorage.getItem("redirect") || "/"} />
        ) : (
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Card style={{ marginTop: 125, backgroundColor: "#eeeeee" }}>
                                <Card.Header
                                    style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}
                                >
                                    Iniciar sesión
                                </Card.Header>

                                <Form.Group controlId="control_usuario" style={{ margin: 20 }}>
                                    <Form style={formStyle}>Usuario</Form>
                                    <Form.Control
                                        ref={this.usuarioRef}
                                        type="text"
                                        style={{
                                            borderColor:
                                                !this.state.username && this.state.loginAction
                                                    ? "red"
                                                    : undefined
                                        }}
                                        value={this.state.username}
                                        label="Text"
                                        placeholder="Ingresar usuario"
                                        onChange={e => this.handleChange(e.target.value, "username")}
                                        onKeyPress={e => this.handleKeyPress(e, "username")}
                                    />
                                </Form.Group>
                                <Form.Group controlId="control_password" style={{ margin: 20 }}>
                                    <Form.Label style={formStyle}>Password</Form.Label>
                                    <Form.Control
                                        ref={this.passwordRef}
                                        type="password"
                                        style={{
                                            borderColor:
                                                !this.state.password && this.state.loginAction
                                                    ? "red"
                                                    : undefined
                                        }}
                                        value={this.state.password}
                                        label="Text"
                                        placeholder="Ingresar password"
                                        onChange={e => this.handleChange(e.target.value, "password")}
                                        onKeyPress={e => this.handleKeyPress(e, "password")}
                                    />
                                </Form.Group>
                                <Button
                                    style={{ margin: 20, ...formStyle }}
                                    onClick={() => this.login()}
                                >
                                    Ingresar
                                </Button>
                                <label style={{ margin: 20, color: "red" }}>
                                    {this.state.errorMessage}
                                </label>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
    }
}

export default withAuth(withNotifier(Login));
`
);