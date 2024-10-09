const replaceMathFunctions = (expression: string) => {
  expression = expression.replace(/(\d+)\s*\^\s*(\d+)/g, "Math.pow($1, $2)");

  expression = expression.replace(/\bsin\(/g, "Math.sin(");
  expression = expression.replace(/\bcos\(/g, "Math.cos(");
  expression = expression.replace(/\btan\(/g, "Math.tan(");
  expression = expression.replace(/\babs\(/g, "Math.abs(");
  expression = expression.replace(/\blog\(/g, "Math.log10(");
  expression = expression.replace(/\bsqrt\(/g, "Math.sqrt(");
  expression = expression.replace(/\bpi\b/g, "Math.PI");
  expression = expression.replace(/\be\b/g, "Math.E");

  return expression;
};

const extractVariables = (formula: string) => {
  const regex = /\b[a-zA-Z_]\w*\b/g;

  const allMatches = formula.match(regex) || [];

  const mathKeywords = [
    "sin",
    "cos",
    "tan",
    "log",
    "sqrt",
    "abs",
    "Math",
    "PI",
    "E",
    "exp",
    "pow",
    "min",
    "max",
    "floor",
    "ceil",
    "round",
  ];

  const variables = allMatches.filter((match) => !mathKeywords.includes(match));

  return Array.from(new Set(variables));
};

const evaluateExpression = (expression: string) => {
  try {
    const parsedExpression = replaceMathFunctions(expression);

    return new Function(`return ${parsedExpression}`)();
  } catch (error) {
    return "Invalid expression";
  }
};

const evaluateWithVariables = (expression: string, variables: any) => {
  let variablesInObjectForm: any = {};

  variables.map((item: any) => {
    variablesInObjectForm = {
      ...variablesInObjectForm,
      [item.variableName]: item.variableValue,
    };
  });

  Object.keys(variablesInObjectForm).forEach((variable) => {
    const value = variablesInObjectForm[variable];
    const regex = new RegExp(`\\b${variable}\\b`, "g");
    expression = expression.replace(regex, value);
  });

  return evaluateExpression(expression);
};

const FunctionsForCalculator = {
  replaceMathFunctions,
  extractVariables,
  evaluateExpression,
  evaluateWithVariables,
};

export default FunctionsForCalculator;
