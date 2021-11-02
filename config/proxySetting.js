module.exports = {
    "/api/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
    },
    "/api2/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
            "^/api2": "",
        },
    }
}
