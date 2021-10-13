import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { DialogTemplate } from "../../components/templates/DialogTemplate/CollabCardsDialogTemplate";
import CollaboratorService from "../../services/CollaboratorService";

jest.mock("../../services/CollaboratorService");

const COLLABRATORS = [
  {
    id: "a353351e-9397-4b39-a4ef-521391212f0e",
    name: "Box",
    image:
      "https://cdn.zeplin.io/5fa102170abc4fbe7467eaa5/components/36eb3f60-ef31-4b44-be5d-766f4ec7b513.png",
  },
  {
    id: "c148171d-e303-4889-9f19-b30b6bc57340",
    name: "Google Suite",
    image:
      "https://cdn.zeplin.io/5fa102170abc4fbe7467eaa5/components/39a2bbdb-7ccc-4347-b341-10fed1434693.png",
  },
];

describe("<CollabCardDialogTemplate/>", () => {
  let mounted;
  const handleOnClose = jest.fn();
  const onCLick = jest.fn();

  beforeEach(async () => {
    act(() => {
      mounted = mount(
        <DialogTemplate
          handleClose={handleOnClose}
          onClick={onCLick}
          open={true}
        />
      );
    });
  });

  it("Renders correctly", () => {
    let wrapper;
    wrapper = renderer.create(
      <DialogTemplate handleClose={() => {}} onClick={() => {}} open={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("Service Calls works correctly", async () => {
    CollaboratorService.getAllCollaborators.mockReturnValue(COLLABRATORS);
    await act(async () => {
      await Promise.resolve(mounted);
      mounted.update();
    });
  });
});
