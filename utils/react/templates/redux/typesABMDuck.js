module.exports = typesABMDuck = (name) => (
    `export default {
    PUSH_${name.toUpperCase()}: "${name.toUpperCase()}",
    LOAD_${name.toUpperCase()}S: "LOAD_${name.toUpperCase()}S",
    DELETE_${name.toUpperCase()}: "DELETE_${name.toUpperCase()}",
    UPDATE_${name.toUpperCase()}: "UPDATE_${name.toUpperCase()}",
    CLEAR_${name.toUpperCase()}_DATA: "CLEAR_${name.toUpperCase()}_DATA"
}
`
);