import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PriorityDropdown from "@/components/priorityDropdown/priorityDropdown";

describe("PriorityDropdown component", () => {
  it("Priority dropdown should only consist 4 options - Select priority, Low, Medium, High", () => {
    const handlePrioritySelection = jest.fn();
    const { getByLabelText } = render(
      <PriorityDropdown handlePrioritySelection={handlePrioritySelection} />
    );
    const select = getByLabelText("Select priority");

    expect(select.children.length).toBe(4);
    expect(select.children[0].textContent).toBe("Select priority");
    expect(select.children[1].textContent).toBe("Low");
    expect(select.children[2].textContent).toBe("Medium");
    expect(select.children[3].textContent).toBe("High");
  });

  it("should call handlePrioritySelection when a priority is selected", () => {
    const handlePrioritySelection = jest.fn();
    const { getByLabelText } = render(
      <PriorityDropdown handlePrioritySelection={handlePrioritySelection} />
    );
    const select = getByLabelText("Select priority");

    fireEvent.change(select, { target: { value: "High" } });

    expect(handlePrioritySelection).toHaveBeenCalledWith("High");
  });
});
