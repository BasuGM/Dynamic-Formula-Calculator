// React Imports
import { FC } from "react";

// MUI Imports
import { Box, Grid2 } from "@mui/material";

// Functional Imports

// Local Imports
import VariableInput from "./VariableInput";

interface VariablesInputsProps {
  variables?: any;
  handleVariableChange?: any;
}

const VariablesInputs: FC<VariablesInputsProps> = (props) => {
  return (
    <Box
      sx={{
        width: "20%",
        height: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "scroll",
        px: 3,
      }}
    >
      {props.variables.map((item: any) => (
        <VariableInput
          variableName={item.variableName}
          variableValue={item.variableValue}
          onChange={(ev: any) =>
            props.handleVariableChange(ev, item.variableName)
          }
        />
      ))}
    </Box>
  );
};

export default VariablesInputs;
