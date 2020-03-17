var response = function () { }

response.message = function (code, message, data) {
    return {
        code: code,
        message: message,
        data: data

    }
}

response.success = function (data) {
    return response.message(00, "success", data)
}

response.error = function (code, message) {
    return response.message(code, message, null)
}

module.exports = response