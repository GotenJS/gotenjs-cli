module.exports = abmNavbarTab = (name) => {
    return (
        `<DropdownItem
                                onClick={() => this.props.redirectTo("/${name.toLowerCase()}s")}
                            >
                                ${name}s
                            </DropdownItem>
                            `
    );};