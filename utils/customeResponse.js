exports.sendResponse = function (response, data, message, api_status, status_code = 202) {
    response.status(status_code).json({
        data: data,
        message: message,
        api_status: api_status,
        status_code: status_code
    });
}