import React from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  InputAdornment
} from '@mui/material';
import type { CompanyInfo } from '../../types';

const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan'
];

interface Props {
  onSubmit: (data: CompanyInfo) => void;
  initialData: CompanyInfo;
}

export function CompanyInfoStep({ onSubmit, initialData }: Props) {
  const [formData, setFormData] = React.useState<CompanyInfo>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format phone number (XXX-XXX-XXXX)
    if (name === 'phone' && value) {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 10)
        .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    // Format postal code (A1A 1A1)
    if (name === 'postalCode' && value) {
      formattedValue = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 6)
        .replace(/(\w{3})(\w{3})/, '$1 $2');
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Company & Contact Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contact Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            placeholder="XXX-XXX-XXXX"
            InputProps={{
              startAdornment: <InputAdornment position="start">+1</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Fax (Optional)"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            variant="outlined"
            placeholder="XXX-XXX-XXXX"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address Line 2 (Optional)"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            variant="outlined"
          >
            {provinces.map((province) => (
              <MenuItem key={province} value={province}>
                {province}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            variant="outlined"
            placeholder="A1A 1A1"
          />
        </Grid>
      </Grid>
    </Box>
  );
}