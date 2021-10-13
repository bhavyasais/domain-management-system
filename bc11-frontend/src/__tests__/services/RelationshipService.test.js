import API from "../../api";
import RelationshipService from "../../services/RelationshipService";
import { STATUS } from "../../utils/Strings";

jest.mock("../../api");

const errorResponse = {
  status: STATUS.FAILURE,
};

const handleAndAssertErrorResponse = (error) => {
  expect(error).toBeDefined();

  const { status } = error;

  expect(status).toEqual(STATUS.FAILURE);
};

describe("RelationshipService getAllRelations", () => {
  it("resolves", async () => {
    API.get.mockReturnValue(Promise.resolve({ data: { relation: "1" } }));

    const getAllRelations = await RelationshipService.getAllRelations({});

    expect(getAllRelations).toBeDefined();

    expect(getAllRelations).toEqual({ relation: "1" });
  });

  it("rejects", async () => {
    API.get.mockReturnValue(Promise.reject(errorResponse));

    try {
      await RelationshipService.getAllRelations({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});
