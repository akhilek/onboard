import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import type { OnboardingData } from '../../types';

interface Props {
  data: OnboardingData;
  onEdit: (step: number) => void;
  onSubmit: () => void;
}

export function ReviewStep({ data, onEdit, onSubmit }: Props) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Review Your Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Company & Contact Information</Typography>
              <Button onClick={() => onEdit(0)}>Edit</Button>
            </Box>
            <List>
              <ListItem>
                <ListItemText primary="Business Name" secondary={data.companyInfo.businessName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Contact Name" secondary={data.companyInfo.contactName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={data.companyInfo.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone" secondary={data.companyInfo.phone} />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Address" 
                  secondary={`${data.companyInfo.address1}${data.companyInfo.address2 ? `, ${data.companyInfo.address2}` : ''}, ${data.companyInfo.city}, ${data.companyInfo.province} ${data.companyInfo.postalCode}`} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Operation Type</Typography>
              <Button onClick={() => onEdit(1)}>Edit</Button>
            </Box>
            <Typography>
              {data.operationType === 'provincial' && 'Provincial (Single Province)'}
              {data.operationType === 'federal' && 'Federal (Inter-Province)'}
              {data.operationType === 'crossBorder' && 'Cross-Border (Canada to U.S.)'}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Uploaded Documents</Typography>
              <Button onClick={() => onEdit(2)}>Edit</Button>
            </Box>
            <List>
              {data.documents.map((doc, index) => (
                <ListItem key={index}>
                  <ListItemText primary={doc.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">HUT Accounts</Typography>
              <Button onClick={() => onEdit(3)}>Edit</Button>
            </Box>
            {data.hutAccounts.hasAccounts ? (
              <List>
                {data.hutAccounts.accounts.map((account) => (
                  <ListItem key={account.state}>
                    <ListItemText 
                      primary={account.state} 
                      secondary={`Account: ${account.accountNumber}`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No HUT accounts registered</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
        >
          Save & Continue Later
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onSubmit}
        >
          Submit Application
        </Button>
      </Box>
    </Box>
  );
}