// React Imports
import React, { FC, useEffect, useState } from "react";

// MUI Imports
import { Box, TextField, Typography } from "@mui/material";

// Functional Imports
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import FunctionsForCalculator from "./FunctionsForCalculator";

// Local Imports

const initialFormula = "x^2 + 2 * (x + 1)";

interface DynamicFormulaCalculatorProps {}

const DynamicFormulaCalculator: FC<DynamicFormulaCalculatorProps> = (props) => {
  const [formula, setFormula] = useState(initialFormula);

  const [variables, setVariables] = useState<any>([]);

  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const [expressionValidity, setExpressionValidity] = useState(false);

  const [result, setResult] = useState(0);

  useEffect(() => {
    handleFormulaChange({
      target: {
        value: initialFormula,
      },
    });
    // handleVariableChange(
    //   {
    //     target: {
    //       value: initialFormula,
    //     },
    //   },
    //   "x"
    // );
  }, []);

  const handleFormulaChange = (ev: any) => {
    let variablesArr = FunctionsForCalculator.extractVariables(ev.target.value);

    let variablesArrPass: any = [];

    variablesArr.map((item) => {
      variablesArrPass.push({
        variableName: item,
        variableValue: "",
      });
    });

    setVariables(variablesArrPass);

    setFormula(ev.target.value);

    setResult(0);
  };

  const handleVariableChange = (ev: any, variableName: string) => {
    let variablesArrPass = variables;

    let indexOfVariable = variablesArrPass.findIndex(
      (item: any) => item.variableName === variableName
    );

    variablesArrPass[indexOfVariable].variableValue = ev.target.value;

    setVariables([...variablesArrPass]);

    const returnVal = FunctionsForCalculator.evaluateWithVariables(
      formula,
      variablesArrPass
    );

    let allInputsFilledPass = true;

    variablesArrPass.map((item: any) => {
      if (item.variableValue === "") {
        allInputsFilledPass = false;
      }
    });

    if (variablesArrPass.length > 0) {
      allInputsFilledPass = allInputsFilledPass;
    } else {
      allInputsFilledPass = false;
    }

    setAllInputsFilled(allInputsFilledPass);

    setExpressionValidity(returnVal !== "Invalid expression");

    setResult(returnVal);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        pt: 8,
      }}
    >
      <Typography>Enter Formula: </Typography>
      <TextField size="small" value={formula} onChange={handleFormulaChange} />
      <Typography
        sx={{
          mt: 4,
        }}
      >
        Formula in Latex:{" "}
      </Typography>
      <BlockMath math={formula} />

      {variables.map((item: any) => (
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography>Value of {item.variableName}: </Typography>
          <TextField
            sx={{
              mt: 1,
            }}
            type="number"
            size="small"
            value={item.variableValue}
            onChange={(ev) => handleVariableChange(ev, item.variableName)}
          />
        </Box>
      ))}

      {formula !== "" && !allInputsFilled && (
        <Typography
          sx={{
            mt: 1,
          }}
        >
          Fill All Fields
        </Typography>
      )}

      {!expressionValidity && allInputsFilled && (
        <Typography
          sx={{
            mt: 1,
          }}
        >
          Expression Invalid
        </Typography>
      )}

      {formula !== "" && expressionValidity && allInputsFilled && (
        <>
          <Typography
            sx={{
              mt: 1,
            }}
          >
            Result:{" "}
          </Typography>

          {result}
        </>
      )}
    </Box>
  );
};

export default DynamicFormulaCalculator;
