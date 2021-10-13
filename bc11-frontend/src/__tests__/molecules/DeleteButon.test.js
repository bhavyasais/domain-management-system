import React from "react";
import renderer from "react-test-renderer";
import DeleteButton from "../../components/molecules/DeleteButton/DeleteButton";

describe("DeleteButton", () => {
    it("should render correctly", () => {
        let wrapper;
        wrapper = renderer.create(<DeleteButton variant="contained" value="Delete selected" />);
        expect(wrapper).toMatchSnapshot();
    });
});
