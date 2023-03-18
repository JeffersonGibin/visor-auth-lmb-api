import { RoutesHandler } from "./routes-handler.js";

describe("routes-handler unit test", () => {
  describe("method apply", () => {
    it("should apply routes when receiving the function in the router list", () => {
      const mockRouteApiFn = jest.fn();
      const mockRouteApi = mockRouteApiFn;

      const instanceRoutesHandler = new RoutesHandler({}, [mockRouteApi]);
      instanceRoutesHandler.apply();

      expect(mockRouteApiFn).toBeCalled();
    });
  });
});
