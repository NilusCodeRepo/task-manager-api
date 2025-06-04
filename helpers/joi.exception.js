const { MESSAGES } = require("../constants/messages");

const JoiException = async (schema, body) => {
    try {
        const value = await schema?.validateAsync(body);
        return {
            error: null,
            value,
        };
    } catch (err) {
        return {
            value: null,
            error: err?.details[0]?.message || MESSAGES.SOMETHING_WENT_WRONG,
        };
    }
};

module.exports = { JoiException };
