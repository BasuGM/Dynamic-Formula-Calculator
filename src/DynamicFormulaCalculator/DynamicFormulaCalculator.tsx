// React Imports
import { FC, useEffect, useState } from "react";

// MUI Imports
import { Box, Grid2, Typography } from "@mui/material";

// Functional Imports
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../Redux/ActionTypes";

// Local Imports
import FunctionsForCalculator from "./FunctionsForCalculator";
import VariableInput from "./VariableInput";
import SavedFormulas from "./SavedFormulas";
import FormulaInputResult from "./FormulaInputResult";
import VariablesInputs from "./VariablesInputs";

interface DynamicFormulaCalculatorProps {}

const DynamicFormulaCalculator: FC<DynamicFormulaCalculatorProps> = (props) => {
  const dispatch = useDispatch();

  const savedFormulas = useSelector(
    (state: any) => state.appState?.savedFormulas
  );

  const [formula, setFormula] = useState("");

  const [variables, setVariables] = useState<any>([]);

  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const [expressionValidity, setExpressionValidity] = useState(false);

  const [result, setResult] = useState(0);

  const [savedFormulaOpen, setSavedFormulaOpen] = useState(false);

  useEffect(() => {
    getResult();
  }, [variables]);

  const getResult = () => {
    const returnVal = FunctionsForCalculator.evaluateWithVariables(
      formula,
      variables
    );

    let allInputsFilledPass = true;

    variables.map((item: any) => {
      if (item.variableValue === "") {
        allInputsFilledPass = false;
      }
    });

    if (variables.length > 0) {
      allInputsFilledPass = allInputsFilledPass;
    } else {
      allInputsFilledPass = false;
    }

    setAllInputsFilled(allInputsFilledPass);

    setExpressionValidity(returnVal !== "Invalid expression");

    setResult(returnVal);
  };

  const handleFormulaChange = (ev: any) => {
    let variablesArr = FunctionsForCalculator.extractVariables(ev.target.value);

    let variablesArrPass: any = [];

    variablesArr.map((item) => {
      variablesArrPass.push({
        variableName: item,
        variableValue: "10",
      });
    });

    setVariables(variablesArrPass);

    setFormula(ev.target.value);
  };

  const handleVariableChange = (ev: any, variableName: string) => {
    let variablesArrPass = variables;

    let indexOfVariable = variablesArrPass.findIndex(
      (item: any) => item.variableName === variableName
    );

    variablesArrPass[indexOfVariable].variableValue = ev.target.value;

    setVariables([...variablesArrPass]);
  };

  const saveFormula = () => {
    if (savedFormulas?.includes(formula)) {
      alert("Formula already exists!");
    } else {
      const newFormulas = [...savedFormulas, formula];

      dispatch({
        type: ActionTypes.UPDATE_SAVED_FORMULAS,
        payload: newFormulas,
      });
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
        minWidth: 1000,
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
          gap: 4,
        }}
      >
        <FormulaInputResult
          formula={formula}
          handleFormulaChange={handleFormulaChange}
          expressionValidity={expressionValidity}
          allInputsFilled={allInputsFilled}
          result={result}
          saveFormula={saveFormula}
        />
        <VariablesInputs
          variables={variables}
          handleVariableChange={handleVariableChange}
        />
        <SavedFormulas
          savedFormulaOpen={savedFormulaOpen}
          setSavedFormulaOpen={setSavedFormulaOpen}
          setFormula={setFormula}
          handleFormulaChange={handleFormulaChange}
          savedFormulas={savedFormulas}
          setSavedFormulas={(ev: any) => {
            dispatch({
              type: ActionTypes.UPDATE_SAVED_FORMULAS,
              payload: ev,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default DynamicFormulaCalculator;
