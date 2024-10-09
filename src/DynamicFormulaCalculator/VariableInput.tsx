// React Imports
import { FC } from "react";

// MUI Imports
import { Box, Slider, TextField, Typography } from "@mui/material";

// React Imports

// MUI Imports

// Functional Imports

interface VariableInputProps {
  variableName?: any;
  variableValue?: any;
  onChange?: any;
}

const VariableInput: FC<VariableInputProps> = (props) => {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Typography
        fontSize={18}
        fontWeight={500}
        style={{
          color: "#243642",
        }}
      >
        Value of {props.variableName}:{" "}
      </Typography>
      <TextField
        sx={{
          mt: 1,
          backgroundColor: "#629584",
        }}
        type="number"
        size="small"
        onKeyDown={(evt: any) =>
          (evt.key === "e" || evt.key === ".") && evt.preventDefault()
        }
        value={props.variableValue}
        onChange={props.onChange}
      />
      <Slider
        value={props.variableValue}
        sx={{
          "& .MuiSlider-thumb": {
            color: "#629584",
          },
          "& .MuiSlider-track": {
            color: "#629584",
          },
          "& .MuiSlider-rail": {
            color: "#acc4e4",
          },
          "& .MuiSlider-active": {
            color: "#629584",
          },
        }}
        onChange={props.onChange}
      />
    </Box>
  );
};

export default VariableInput;
