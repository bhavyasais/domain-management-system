import API from "../../api";
import CollaboratorService from "../../services/CollaboratorService";
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

describe("CollaboratorService getAllCollaborators", () => {
  it("resolves", async () => {
    API.get.mockReturnValue(Promise.resolve({ data: { collab: "collab" } }));

    const getAllCollaborators = await CollaboratorService.getAllCollaborators(
      {}
    );

    expect(getAllCollaborators).toBeDefined();

    expect(getAllCollaborators).toEqual({ collab: "collab" });
  });

  it("rejects", async () => {
    API.get.mockReturnValue(Promise.reject(errorResponse));

    try {
      await CollaboratorService.getAllCollaborators({});
    } catch (error) {
      handleAndAssertErrorResponse(error);
    }
  });
});
