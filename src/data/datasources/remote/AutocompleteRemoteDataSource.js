import implement from 'implement-js'
import RestNetworkClient from 'data/apiclients/RestNetworkClient'
import AutocompleteDataSource from 'data/protocols/AutocompleteDataSource'
import ApiConstants from 'data/constants/ApiConstants'
import RequestType from 'data/helpers/RequestType'
import AutocompleteResponseParameters from 'data/helpers/AutocompleteResponseParameters'
import AutocompleteResult from '../../models/AutocompleteResult'

const AutocompleteRemoteDataSource = implement(AutocompleteDataSource)({
    async autocomplete(text) {
        const autocompleteUrl = `${ApiConstants.corsProxyUrl}${ApiConstants.baseUrl}${ApiConstants.autocompleteEndpoint}`;
        const parameters = {
            text: text,
            language: "en"
        }
        const auth = ApiConstants.authentication;
        const autocompleteResponse = await RestNetworkClient.performRequest(autocompleteUrl, RequestType.get, parameters, {}, auth)
            .catch(error => {
                handleError(error);
                return [];
            });
        const autocompleteResultsData = autocompleteResponse.data.result.filter(result => result.type === "city");
        const autocompleteResults = autocompleteResultsData.map(autocompeleteResultData => {
            return parseAutocompleteResult(autocompeleteResultData);
        });
        return autocompleteResults;
    }
});

const parseAutocompleteResult = autocompeleteResultData => {
    if (autocompeleteResultData) {
        const cityName = autocompeleteResultData[AutocompleteResponseParameters.cityName];
        const countryName = autocompeleteResultData[AutocompleteResponseParameters.countryName];
        const latitude = autocompeleteResultData[AutocompleteResponseParameters.latitude];
        const longitude = autocompeleteResultData[AutocompleteResponseParameters.longitude];
        return new AutocompleteResult(cityName, countryName, latitude, longitude);
    }
};

const handleError = error => {
    console.warn(error);
    return null;
};

export default AutocompleteRemoteDataSource;

