import implement from 'implement-js'
import RestNetworkClient from 'data/apiclients/RestNetworkClient'
import AutocompleteDataSource from 'data/protocols/AutocompleteDataSource'
import ApiConstants from 'data/constants/ApiConstants'
import RequestType from 'data/helpers/RequestType'
import AutocompleteResponseParameters from 'data/helpers/AutocompleteResponseParameters'
import City from 'data/models/City';
import Location from 'data/models/Location';

const AutocompleteRemoteDataSource = implement(AutocompleteDataSource)({
    async autocomplete(text) {
        if (text.length >= 2) {
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
            if (autocompleteResponse.data) {
                const autocompleteResultsData = autocompleteResponse.data.result.filter(result => result.type === "city");
                const autocompleteResults = autocompleteResultsData.map(autocompeleteResultData => {
                    return parseAutocompleteResult(autocompeleteResultData);
                });
                return autocompleteResults;
            }   
        }
        return [];
    }
});

const parseAutocompleteResult = autocompeleteResultData => {
    if (autocompeleteResultData) {
        const cityId = autocompeleteResultData[AutocompleteResponseParameters.id];
        const cityName = autocompeleteResultData[AutocompleteResponseParameters.cityName];
        const countryName = autocompeleteResultData[AutocompleteResponseParameters.countryName];
        const latitude = autocompeleteResultData[AutocompleteResponseParameters.latitude];
        const longitude = autocompeleteResultData[AutocompleteResponseParameters.longitude];
        const numberOfHotels = autocompeleteResultData[AutocompleteResponseParameters.numberOfHotels];
        return new City(countryName, cityId, new Location(latitude, longitude), numberOfHotels, cityName);
    }
};

const handleError = error => {
    console.warn(error);
    return null;
};

export default AutocompleteRemoteDataSource;

