import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Alert
} from '@mui/material';
import type { OperationType } from '../../types';

interface Props {
  onSubmit: (type: OperationType) => void;
  initialType: OperationType | null;
}

export function OperationTypeStep({ onSubmit, initialType }: Props) {
  const [selected, setSelected] = React.useState<OperationType | null>(initialType);
  const [showAlert, setShowAlert] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      onSubmit(selected);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleChange = (value: OperationType) => {
    setSelected(value);
    setShowAlert(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Select Operation Type
      </Typography>

      {showAlert && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please select an operation type to continue
        </Alert>
      )}

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <RadioGroup
          value={selected || ''}
          onChange={(e) => handleChange(e.target.value as OperationType)}
        >
          <FormControlLabel
            value="provincial"
            control={<Radio />}
            label="Provincial (Single Province)"
          />
          <FormControlLabel
            value="federal"
            control={<Radio />}
            label="Federal (Inter-Province)"
          />
          <FormControlLabel
            value="crossBorder"
            control={<Radio />}
            label="Cross-Border (Canada to U.S.)"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}