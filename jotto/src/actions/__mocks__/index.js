module.exports = {
    ...jest.requireActual('..'),
    __esModule: true,
    // TODO: Update return value for Redux / context implementation
    getSecretWord: jest.fn().mockReturnValue(Promise.resolve('party'))
}