global.IntersectionObserver = class IntersectionObserverMock {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.observe = jest.fn();
        this.disconnect = jest.fn();
    }
};
