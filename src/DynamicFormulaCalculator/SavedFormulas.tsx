// React Imports
import { FC } from "react";

// MUI Imports
import {
  Box,
  ButtonBase,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Functional Imports
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// Local Imports

interface SavedFormulasProps {
  savedFormulaOpen?: any;
  setSavedFormulaOpen?: any;
  setFormula?: any;
  handleFormulaChange?: any;
  savedFormulas?: any;
  setSavedFormulas?: any;
}

const SavedFormulas: FC<SavedFormulasProps> = (props) => {
  const selectFormula = (formula: string) => {
    props.setSavedFormulaOpen(false);
    props.setFormula(formula);
    props.handleFormulaChange({
      target: {
        value: formula,
      },
    });
  };

  const deleteFormula = (index: number) => {
    let savedFormulasPass = props.savedFormulas;
    savedFormulasPass.splice(index, 1);
    props.setSavedFormulas([...savedFormulasPass]);
  };

  return (
    <Box>
      <List
        sx={{
          p: 2,
          pt: 0,
        }}
      >
        <Typography
          fontSize={18}
          fontWeight={500}
          style={{
            color: "#243642",
          }}
        >
          Saved Formulas
        </Typography>
        {props.savedFormulas.length === 0 && (
          <Typography>No Formulas Saved Yet</Typography>
        )}
        {props.savedFormulas.map((formula: string, index: number) => (
          <ListItem disableGutters key={formula}>
            <ButtonBase
              onClick={() => selectFormula(formula)}
              sx={{
                p: 1,
                py: 0,
              }}
            >
              <BlockMath math={formula} />
            </ButtonBase>
            <IconButton
              onClick={() => deleteFormula(index)}
              sx={{
                ml: 2,
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SavedFormulas;
