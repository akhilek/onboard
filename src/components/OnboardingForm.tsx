import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Container, Paper, Button, Stack } from '@mui/material';
import { CompanyInfoStep } from './steps/CompanyInfoStep';
import { OperationTypeStep } from './steps/OperationTypeStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { HUTAccountsStep } from './steps/HUTAccountsStep';
import { ReviewStep } from './steps/ReviewStep';
import type { OnboardingData, OperationType } from '../types';

const steps = [
  'Company & Contact Information',
  'Operation Type',
  'Document Upload',
  'HUT Accounts',
  'Review & Submit'
];

const initialData: OnboardingData = {
  companyInfo: {
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    fax: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada'
  },
  operationType: null,
  documents: [],
  hutAccounts: {
    hasAccounts: false,
    accounts: []
  }
};

export function OnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>(initialData);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSaveAndContinueLater = () => {
    localStorage.setItem('onboardingFormData', JSON.stringify(formData));
    localStorage.setItem('onboardingStep', activeStep.toString());
    // alert('Your progress has been saved. You can continue later from where you left off.');
    window.location.href = "http://localhost:5175";

  };

  const handleCompanyInfoSubmit = (data: OnboardingData['companyInfo']) => {
    setFormData(prev => ({ ...prev, companyInfo: data }));
    handleNext();
  };

  const handleOperationTypeSubmit = (type: OperationType) => {
    setFormData(prev => ({ ...prev, operationType: type }));
    handleNext();
  };

  const handleDocumentsSubmit = (documents: File[]) => {
    setFormData(prev => ({ ...prev, documents }));
    handleNext();
  };

  const handleHUTAccountsSubmit = (hutAccounts: OnboardingData['hutAccounts']) => {
    setFormData(prev => ({ ...prev, hutAccounts }));
    handleNext();
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    localStorage.removeItem('onboardingFormData');
    localStorage.removeItem('onboardingStep');
  };

  React.useEffect(() => {
    const savedData = localStorage.getItem('onboardingFormData');
    const savedStep = localStorage.getItem('onboardingStep');
    
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setActiveStep(parseInt(savedStep, 10));
    }
  }, []);

  const handleStepSubmit = () => {
    switch (activeStep) {
      case 0:
      case 1:
      case 2:
      case 3:
        document.querySelector('form')?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
        break;
      default:
        break;
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CompanyInfoStep onSubmit={handleCompanyInfoSubmit} initialData={formData.companyInfo} />;
      case 1:
        return <OperationTypeStep onSubmit={handleOperationTypeSubmit} initialType={formData.operationType} />;
      case 2:
        return <DocumentUploadStep onSubmit={handleDocumentsSubmit} operationType={formData.operationType} />;
      case 3:
        return <HUTAccountsStep onSubmit={handleHUTAccountsSubmit} initialData={formData.hutAccounts} />;
      case 4:
        return (
          <ReviewStep
            data={formData}
            onEdit={(step: number) => setActiveStep(step)}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {renderStep()}
        
        {activeStep !== 4 && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 4,
              borderTop: '1px solid #e0e0e0',
              pt: 3,
              justifyContent: 'space-between'
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                minWidth: '120px',
                '&.Mui-disabled': {
                  visibility: activeStep === 0 ? 'hidden' : 'visible'
                }
              }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              onClick={handleSaveAndContinueLater}
              sx={{
                minWidth: '180px',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              Save & Continue Later
            </Button>
            <Button
              variant="contained"
              onClick={handleStepSubmit}
              sx={{
                minWidth: '120px',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                }
              }}
            >
              Next
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
}