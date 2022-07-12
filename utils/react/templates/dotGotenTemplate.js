module.exports = dotGotenFile = (architecture) => {
    return `{
    "technology": "react",
    "plugins": [
        "goten-react-form",
        "goten-react-list",
        "goten-react-paginator",
        "goten-react-text-field"
    ],
    "architecture": "${architecture}"
}
`;
};