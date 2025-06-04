module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_OPTIONS: {
        expiresIn: '1d',
        issuer: 'taskManager',
    }
};