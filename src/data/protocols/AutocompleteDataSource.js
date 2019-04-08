import { Interface, type } from 'implement-js'

const AutocompleteDataSource = Interface('AutocompleteDataSource')({
    autocomplete: type('function')
}, {
    error: true,
    strict: true
});

export default AutocompleteDataSource;