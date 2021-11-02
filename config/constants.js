const ISDEV = process.env.NODE_ENV !== "production";
const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 8008;

module.exports = {
    ISDEV,
    SERVER_HOST,
    SERVER_PORT,
};
