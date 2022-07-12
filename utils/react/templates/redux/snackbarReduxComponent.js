module.exports = snackbarComponent = () => (
    `import React from 'react'
import classNames from "classnames"
import Button from 'react-bootstrap/Button'
import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'
import { withStyles } from "@material-ui/core/styles"
import SnackbarMaterial from '@material-ui/core/Snackbar'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import SnackbarContent from "@material-ui/core/SnackbarContent"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const styles = theme => ({
    success: {
        backgroundColor: green[500],
    },
    error: {
        backgroundColor: '#ff4d5c',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: grey[800]
    },
})

function MySnackbarContent(props) {
    const { classes, className, message, messageType, onClose } = props

    return (
        <SnackbarContent
            className={classNames(classes[messageType], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes[messageType]}>            
                    {message}
                </span>
            }
            action={[
                <Button key={1} bsPrefix=""
                    style={{
                        border: "0px",
                        backgroundColor: styles()[messageType].backgroundColor
                    }}
                    onClick= {() => onClose()}
                >
                    <FontAwesomeIcon style={{fontWeight: 600, fontSize: 12, color: 'white'}} icon={faTimes} />
                </Button>
            ]}
        />
    )
}

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

export default class Snackbar extends React.Component {
    handleClose = () => {
        this.props.closeSnackbar()
    }

    render() {
        return (
            <SnackbarMaterial 
                id="snackbar_app"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}                        
                style={{bottom: '10px', width: '100%'}}
                open={this.props.snackbar.visible}
                autoHideDuration={3000}
                onClose={this.handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={this.handleClose}
                    message={<span style={{textAlign: 'center', fontSize: 15, wordBreak: "break-all"}} id="message-id">{this.props.snackbar.message}</span>}
                    messageType={this.props.snackbar.messageType}
                />
            </SnackbarMaterial>
        )
    }
}
`
);