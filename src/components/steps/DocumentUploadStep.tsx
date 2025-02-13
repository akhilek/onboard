import React from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Stack
} from '@mui/material';
import { Upload } from 'lucide-react';
import type { OperationType } from '../../types';

interface Props {
  onSubmit: (documents: File[]) => void;
  operationType: OperationType | null;
}

const documentRequirements = {
  provincial: [
    'Business Registration Certificate',
    'Provincial Operating License',
    'Safety Fitness Certificate'
  ],
  federal: [
    'Business Registration Certificate',
    'Provincial Operating License',
    'Safety Fitness Certificate',
    'International Fuel Tax Agreement (IFTA) Registration'
  ],
  crossBorder: [
    'Business Registration Certificate',
    'Provincial Operating License',
    'Safety Fitness Certificate',
    'International Fuel Tax Agreement (IFTA) Registration',
    'BOC-3 (Designation of Process Agent)',
    'Unified Carrier Registration (UCR)',
    'SCAC / PAPS Code',
    'Carrier Code / PARS',
    'MCS-90 (Proof of Financial Responsibility)',
    'W-8 BEN-E'
  ]
};

export function DocumentUploadStep({ onSubmit, operationType }: Props) {
  const [documents, setDocuments] = React.useState<File[]>([]);
  const [irpAccountNumber, setIrpAccountNumber] = React.useState('');
  const [usDotNumber, setUsDotNumber] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const requiredDocs = operationType ? documentRequirements[operationType] : [];

  const handleFileSelect = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocuments = [...documents];
      newDocuments[index] = file;
      setDocuments(newDocuments);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(documents);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Required Document Uploads
      </Typography>

      <List>
        {requiredDocs.map((doc, index) => (
          <ListItem key={doc}>
            <ListItemIcon>
              <Upload />
            </ListItemIcon>
            <ListItemText
              primary={doc}
              secondary={documents[index]?.name || 'No file selected'}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current?.click()}
              sx={{ ml: 2 }}
            >
              Upload
            </Button>
            <input
              type="file"
              hidden
              ref={fileInputRef}
              onChange={handleFileSelect(index)}
            />
          </ListItem>
        ))}
      </List>

      {(operationType === 'federal' || operationType === 'crossBorder') && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="IRP Account Number"
            value={irpAccountNumber}
            onChange={(e) => setIrpAccountNumber(e.target.value)}
            variant="outlined"
          />
        </Stack>
      )}

      {operationType === 'crossBorder' && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="US DOT Number"
            value={usDotNumber}
            onChange={(e) => setUsDotNumber(e.target.value)}
            variant="outlined"
          />
        </Stack>
      )}
    </Box>
  );
}