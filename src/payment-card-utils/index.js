/* Payment card utils */

const cardValidationConfig = {
    Visa: {
        maxLen: 19,
        pattern: /^[0-9]{16}$/,
        cvvLen: 3,
        cvvPattern: /^[0-9]{3}$/
    },
    Mlife: {
        maxLen: 19,
        pattern: /^[0-9]{16}$/,
        cvvLen: 3,
        cvvPattern: /^[0-9]{3}$/
    },
    Mastercard: {
        maxLen: 19,
        pattern: /^[0-9]{16}$/,
        cvvLen: 3,
        cvvPattern: /^[0-9]{3}$/
    },
    'American Express': {
        maxLen: 15,
        pattern: /^[0-9]{15}$/,
        cvvLen: 4,
        cvvPattern: /^[0-9]{4}$/
    },
    Discover: {
        maxLen: 19,
        pattern: /^[0-9]{16}$/,
        cvvLen: 3,
        cvvPattern: /^[0-9]{3}$/
    },
    JCB: {
        maxLen: 19,
        pattern: /^[0-9]{16}$/,
        cvvLen: 3,
        cvvPattern: /^[0-9]{3}$/
    },
    'Union Pay': {
        maxLen: 19,
        pattern: /^[0-9]{16,19}$/,
        cvvLen: 3,
        cvvPattern: /^[0-9]{3}$/
    }
};

/**
 * Validates if the given card number is expired.
 *
 * @param {string} cardExpiryDate in MM/YYYY or MM/YY format
 * @returns {boolean} true if expired else false
 */
const isPaymentCardExpired = cardExpiryDate => {
    const cardFormat = '/';
    const cardExpMatches = cardExpiryDate.split(cardFormat);
    const today = new Date();
    const cardDate = new Date();

    if (cardExpMatches.length > 1) {
        cardDate.setFullYear(cardExpMatches[1]);
        cardDate.setMonth(cardExpMatches[0] - 1); // index 0-11

        if (today > cardDate) {
            return true;
        }
    }

    return false;
};

/**
 * Returns payment card type based on the card number passed.
 *
 * @param {string} cardNumber of the payment card
 * @returns {string} payment card type (Visa/Mastercard/American Express/Discover/JCB/Union Pay)
 */
const getPaymentCardType = cardNumber => {
    const val = cardNumber.replace(/\s+/g, '').replace(/-/g, '');

    const regexGroup = {
        Visa: /^4[0-9]{0,15}$/,
        Mastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{0,17}$/,
        'American Express': /^3$|^3[47][0-9]{0,13}$/,
        Discover: /^6$|^601[1]?$|^65[0-9]{0,3}?$|^64[4-9][0-9]?$|^6(?:011[0-9]{0,3}|5[0-9]{0,5}|4[4-9][0-9]{0,4})[0-9]{0,10}$/,
        JCB: /^2[1]?$|^21[3]?$|^1[8]?$|^18[ 0 ]?$|^(?:2131|1800)[0-9]{0,11}$|^3[5]?$|^35[0-9]{0,14}$/,
        'Union Pay': /^(62[0-9]{0,17})$/
    };

    let cardType = '';

    for (const key in regexGroup) {
        if (regexGroup[key].test(val)) {
            cardType = key;
            break;
        }
    }

    return cardType;
};

/**
 * Validates if the given payment card number is valid.
 *
 * @param {string} cardNumber to be validated
 * @returns {boolean} true if valid else false
 */
const validatePaymentCardNumber = cardNumber => {
    cardNumber = cardNumber || '';
    const val = cardNumber.replace(/\s+/g, '').replace(/-/g, '');

    if (!val) {
        return false;
    }

    const cardType = getPaymentCardType(val);

    if (cardType) {
        if (val.length > cardValidationConfig[cardType].maxLen) {
            return false;
        }

        if (!cardValidationConfig[cardType].pattern.test(val)) {
            return false;
        }
    } else {
        if (val.length > 19) {
            return false;
        } else if (val) {
            return false;
        }
    }

    return true;
};

export const PaymentCardUtils = { isPaymentCardExpired, getPaymentCardType, validatePaymentCardNumber };
