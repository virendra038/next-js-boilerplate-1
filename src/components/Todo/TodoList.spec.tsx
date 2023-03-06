import { render, screen } from "@testing-library/react";
import Todo from "@/components/Todo/TodoList";

const fakeInput = ["Movie", "Snacks"];

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  Editable: ({ children }) => <div>{children}</div>,
  EditableInput: () => (
    <div>
      {["Movie", "Snacks"].map((value, index) => (
        <div key={index}>{value}</div>
      ))}
    </div>
  ),
  EditablePreview: () => <span></span>,
  Table: ({ children }) => <table>{children}</table>,
  TableContainer: ({ children }) => <div>{children}</div>,
  Tbody: ({ children }) => <tbody>{children}</tbody>,
  Td: ({ children }) => <td>{children}</td>,
  Th: ({ children }) => <th>{children}</th>,
  Tr: ({ children }) => <tr>{children}</tr>,
}));

describe("Todo with data", () => {
  beforeEach(() => {
    render(<Todo todos={["Movie", "Snacks"]} />);
  });

  it("checks for the table component", () => {
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("checks the text of the task", () => {
    // const myElement = screen.getByText(/Movie/);
    const myElementScacks = screen.getAllByText("Snacks");
    expect(myElementScacks[0]).toBeInTheDocument();
    // expect(myElement).toBeInTheDocument();
    expect(myElementScacks).toHaveLength(2);
  });
  it("renders the checkbox", () => {
    const checkbox = screen.getAllByRole("checkbox");
    expect(checkbox[0]).toBeInTheDocument();
  });
});

describe("Todo without data", () => {
  beforeEach(() => {
    render(<Todo todos={[]} />);
  });

  it("checks for the table component", () => {
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("checks the text of the task", () => {
    const myElement = screen.getByText("No Tasks found");
    expect(myElement).toBeInTheDocument();
  });
});
