export class RoutesHandler {
  #routes = [];
  #instanceApp;

  /**
   * Handler routes of application
   * @param {Express} instanceApp
   * @param {Array} routes
   */
  constructor(instanceApp, routes) {
    this.#instanceApp = instanceApp;
    this.#routes = routes;
  }

  apply() {
    const routes = this.#routes;

    routes.forEach((route) => {
      if (typeof route === "function") {
        route(this.#instanceApp);
      }
    });
  }
}
