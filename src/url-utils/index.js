const URL_PARAM_PREFIX = '#/?';

/**
 * Adds the supplied key value pair as a query string parameter to the url.
 *
 * @param {string} url url to which the parameter is to be added
 * @param {string} name parameter name
 * @param {string} value parameter value
 * @returns {string} final url with the query string parameter added
 */
const addQueryStringParameter = (url, name = '', value = '') => {
    if (!url) url = window.location.href;

    if (name !== '' && value !== '') {
        if (url.indexOf(URL_PARAM_PREFIX) !== -1) {
            url = url.concat(url.length !== URL_PARAM_PREFIX.length ? '&' : '', name, '=', value);
        } else {
            url = url.concat(URL_PARAM_PREFIX, name, '=', value);
        }
    }

    return url;
};

/**
 * Removes param from query string if no value is present.
 *
 * @param {string} url url to remove from
 * @param {string} [name=''] name of param
 * @returns {string} updated url
 */
const removeQueryStringParameter = (url, name = '') => {
    if (!url) url = window.location.href;

    let result = url.split('?')[0],
        param,
        paramsArr = [],
        queryString = url.indexOf('?') !== -1 ? url.split('?')[1] : '';
    if (queryString !== '') {
        paramsArr = queryString.split('&');
        for (let i = paramsArr.length - 1; i >= 0; i -= 1) {
            param = paramsArr[i].split('=')[0];
            if (param === name) {
                paramsArr.splice(i, 1);
            }
        }

        result = result + '?' + paramsArr.join('&');
    }

    return result;
};

/**
 * Replaces the supplied key value pair if found as a query parameter in the url
 * else it adds it to the URL as a query parameter.
 *
 * @param {string} url url to which the parameter is to be replaced
 * @param {string} name parameter name
 * @param {string} value parameter value
 * @returns {string} final url with the query string parameter replaced
 */
const replaceQueryStringParameter = (url, name = '', value = '') => {
    if (!url) url = window.location.href;

    if (name !== '') {
        if (url.indexOf(URL_PARAM_PREFIX) === -1) {
            url = url.concat(URL_PARAM_PREFIX);
        }

        let startIndex = -1;
        let urlArr = url.split('#');

        if (urlArr[1] && urlArr[1] !== '') {
            startIndex = urlArr[1].indexOf(name);

            if (startIndex !== -1) {
                const endIndex = urlArr[1].indexOf('&', startIndex);
                const findString =
                    endIndex === -1 ? urlArr[1].slice(startIndex) : urlArr[1].slice(startIndex, endIndex);
                const replaceString = name.concat('=').concat(value);

                urlArr[1] = urlArr[1].replace(findString, replaceString);
                urlArr[1] = '#'.concat(urlArr[1]);
            } else {
                urlArr[1] = addQueryStringParameter('#'.concat(urlArr[1]), name, value);
            }

            url = urlArr[0].concat(urlArr[1]);
        } else {
            urlArr[0] = addQueryStringParameter(urlArr[0], name, value);
            url = urlArr[0];
        }
    }

    return url;
};

/**
 * Returns parameter value based on the given parameter name.
 *
 * @param {string} name parameter name
 * @param {string} url from which parameters are to be extracted
 * @returns {string} parameter value
 */
const getQueryStringParameter = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
};

/**
 * Updates hash params of current url with given params.
 *
 * @param {string} [name=''] name of param
 * @param {string} [value=''] value of param
 * @returns {string} updated hash
 */
const updateHashParams = (name = '', value = '') => {
    let hash = window.location.hash;
    if (value === '') {
        hash = removeQueryStringParameter(null, name);
    }

    if (name !== '') {
        if (hash.indexOf(URL_PARAM_PREFIX) === -1) {
            hash = hash.concat(URL_PARAM_PREFIX);
        }

        let startIndex = -1;
        let urlArr = hash.split('#');

        if (urlArr[1] && urlArr[1] !== '') {
            startIndex = urlArr[1].indexOf(name);

            if (startIndex !== -1) {
                const endIndex = urlArr[1].indexOf('&', startIndex);
                const findString =
                    endIndex === -1 ? urlArr[1].slice(startIndex) : urlArr[1].slice(startIndex, endIndex);
                const replaceString = name.concat('=').concat(value);

                urlArr[1] = urlArr[1].replace(findString, replaceString);
                urlArr[1] = '#'.concat(urlArr[1]);
            } else {
                urlArr[1] = addQueryStringParameter('#'.concat(urlArr[1]), name, value);
            }

            hash = urlArr[1];
        }
    }

    return hash;
};

export const UrlUtils = {
    getQueryStringParameter,
    removeQueryStringParameter,
    replaceQueryStringParameter,
    getQueryStringParameter,
    updateHashParams,
};
