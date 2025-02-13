import React from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Checkbox,
  Grid,
  Alert
} from '@mui/material';
import type { OnboardingData } from '../../types';

interface Props {
  onSubmit: (data: OnboardingData['hutAccounts']) => void;
  initialData: OnboardingData['hutAccounts'];
}

const states = [
  { code: 'CT', name: 'Connecticut' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'OR', name: 'Oregon' }
];

export function HUTAccountsStep({ onSubmit, initialData }: Props) {
  const [hasAccounts, setHasAccounts] = React.useState(initialData.hasAccounts);
  const [selectedStates, setSelectedStates] = React.useState<string[]>([]);
  const [accountNumbers, setAccountNumbers] = React.useState<Record<string, string>>({});

  const handleStateToggle = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };

  const handleAccountNumberChange = (state: string, value: string) => {
    setAccountNumbers(prev => ({
      ...prev,
      [state]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accounts = selectedStates.map(state => ({
      state,
      accountNumber: accountNumbers[state] || ''
    }));
    onSubmit({
      hasAccounts,
      accounts
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Highway Use Tax (HUT) Accounts
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={hasAccounts}
            onChange={(e) => setHasAccounts(e.target.checked)}
          />
        }
        label="Does your company already have Highway Use Tax (HUT) accounts?"
      />

      {!hasAccounts && (
        <Alert severity="info" sx={{ mt: 2 }}>
          You may need to register for a HUT account in applicable states before operation.
        </Alert>
      )}

      {hasAccounts && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {states.map(({ code, name }) => (
            <Grid item xs={12} key={code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedStates.includes(code)}
                      onChange={() => handleStateToggle(code)}
                    />
                  }
                  label={name}
                />
                {selectedStates.includes(code) && (
                  <TextField
                    label={`${code} Account Number`}
                    value={accountNumbers[code] || ''}
                    onChange={(e) => handleAccountNumberChange(code, e.target.value)}
                    sx={{ flexGrow: 1 }}
                    variant="outlined"
                  />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}