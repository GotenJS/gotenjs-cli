module.exports = configFileAPI = (apiUrl) => (
    `const apiHost = "${apiUrl}" 
//<define-api-modules>
//</define-api-modules>

export default {
    apiHost,
//<export-api-modules>
//</export-api-modules>
}
`
);