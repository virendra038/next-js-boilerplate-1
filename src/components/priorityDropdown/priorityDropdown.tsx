import { Select } from "@chakra-ui/react";

interface Props {
  handlePrioritySelection: (priority: string) => void;
}

export default function PriorityDropdown({ handlePrioritySelection }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlePrioritySelection(e.target.value);
  };

  return (
    <Select aria-label="Select priority" placeholder="Select priority" onChange={handleChange}>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </Select>
  );
}
