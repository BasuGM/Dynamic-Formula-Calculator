// React Imports
import { FC, useEffect, useState } from "react";

// MUI Imports
import { Box, Button, TextField, Typography } from "@mui/material";

// Functional Imports
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// Local Imports
import FunctionsForCalculator from "./FunctionsForCalculator";
import VariableInput from "./VariableInput";
import SavedFormulas from "./SavedFormulas";

const initialFormula = "x^2 + 2 * (x + 1)";

interface DynamicFormulaCalculatorProps {}

const DynamicFormulaCalculator: FC<DynamicFormulaCalculatorProps> = (props) => {
  const [formula, setFormula] = useState(initialFormula);

  const [variables, setVariables] = useState<any>([]);

  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const [expressionValidity, setExpressionValidity] = useState(false);

  const [result, setResult] = useState(0);

  const [savedFormulas, setSavedFormulas] = useState<any>([]);

  const [savedFormulaOpen, setSavedFormulaOpen] = useState(false);

  useEffect(() => {
    handleFormulaChange({
      target: {
        value: initialFormula,
      },
    });
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

  const saveFormula = () => {
    if (savedFormulas.includes(formula)) {
      alert("Formula already exists!");
    } else {
      const newFormulas = [...savedFormulas, formula];
      setSavedFormulas(newFormulas);
    }
  };

  return (
    <Box
      sx={{
        pt: 8,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E2F1E7",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          mb: 8,
        }}
      >
        <Typography
          fontSize={32}
          fontWeight={700}
          style={{
            color: "#387478",
          }}
        >
          Dynamic Formula Calculator
        </Typography>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          gap: 10,
        }}
      >
        <Box>
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
              minWidth: 200,
              width: formula.length * 8.3,
              mt: 1,
              backgroundColor: "#629584",
            }}
            size="small"
            variant="outlined"
            value={formula}
            onChange={handleFormulaChange}
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
            }}
          >
            <BlockMath math={formula} />
          </Box>

          {formula !== "" && expressionValidity && allInputsFilled && (
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
                sx={{
                  mt: 1,
                  backgroundColor: "#629584",
                  p: 1,
                }}
              >
                {result}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 8,
                  backgroundColor: "#243642",
                  ml: 4,
                }}
                onClick={saveFormula}
              >
                Save Formula
              </Button>
            </>
          )}

          {formula !== "" && !allInputsFilled && (
            <Typography
              sx={{
                mt: 1,
              }}
              fontSize={18}
              fontWeight={500}
              style={{
                color: "#243642",
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
              fontSize={18}
              fontWeight={500}
              style={{
                color: "#243642",
              }}
            >
              Expression Invalid
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 210,
            height: 400,
            overflowY: "scroll",
            px: 3,
          }}
        >
          {variables.map((item: any) => (
            <VariableInput
              variableName={item.variableName}
              variableValue={item.variableValue}
              onChange={(ev: any) =>
                handleVariableChange(ev, item.variableName)
              }
            />
          ))}
        </Box>

        <SavedFormulas
          savedFormulaOpen={savedFormulaOpen}
          setSavedFormulaOpen={setSavedFormulaOpen}
          setFormula={setFormula}
          handleFormulaChange={handleFormulaChange}
          savedFormulas={savedFormulas}
          setSavedFormulas={setSavedFormulas}
        />
      </Box>
    </Box>
  );
};

export default DynamicFormulaCalculator;
