// React Imports
import { FC } from "react";

// MUI Imports
import {
  Box,
  Button,
  Grid2,
  Input,
  TextField,
  Typography,
} from "@mui/material";

// Functional Imports
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// Local Imports

interface FormulaInputResultProps {
  formula?: any;
  handleFormulaChange?: any;
  expressionValidity?: any;
  allInputsFilled?: any;
  result?: any;
  saveFormula?: any;
}

const FormulaInputResult: FC<FormulaInputResultProps> = (props) => {
  return (
    <Box
      sx={{
        minWidth: "25%",
      }}
    >
      <Typography
        fontSize={18}
        fontWeight={500}
        style={{
          color: "#243642",
        }}
      >
        Enter Formula:{" "}
      </Typography>

      <TextField
        sx={{
          width: "100%",
          mt: 1,
          backgroundColor: "#629584",
        }}
        size="small"
        variant="outlined"
        value={props.formula}
        onChange={props.handleFormulaChange}
      />
      <Typography
        sx={{
          mt: 4,
        }}
        fontSize={18}
        fontWeight={500}
        style={{
          color: "#243642",
        }}
      >
        Formula in Latex:{" "}
      </Typography>
      <Box
        sx={{
          backgroundColor: "#629584",
          p: 1,
          py: 0.5,
          mt: 1,
          minHeight: 70,
        }}
      >
        <BlockMath math={props.formula} />
      </Box>

      {props.formula !== "" &&
        props.expressionValidity &&
        props.allInputsFilled && (
          <>
            <Typography
              sx={{
                mt: 4,
              }}
              fontSize={18}
              fontWeight={500}
              style={{
                color: "#243642",
              }}
            >
              Result:{" "}
            </Typography>

            <Typography
              fontSize={30}
              fontWeight={700}
              style={{
                color: "#243642",
              }}
              sx={{
                mt: -1,
                p: 1,
              }}
            >
              {props.result}
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                backgroundColor: "#243642",
              }}
              onClick={props.saveFormula}
            >
              Save Formula
            </Button>
          </>
        )}

      {!props.expressionValidity && (
        <Typography
          fontSize={28}
          fontWeight={700}
          style={{
            color: "#243642",
          }}
          sx={{
            mt: 3,
          }}
        >
          Expression Invalid
        </Typography>
      )}
    </Box>
  );
};

export default FormulaInputResult;
