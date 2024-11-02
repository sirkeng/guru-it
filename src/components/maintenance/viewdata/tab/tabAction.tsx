// components/ActionTabs.tsx

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import QRCode from 'qrcode';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

interface ActionTabsProps {
  status: number
}

const TabAction: React.FC<ActionTabsProps> = ({ status }) => {

  const searchParams = useSearchParams();
  const documentNo = searchParams.get('documentNo');
  const customer = searchParams.get('customer');
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Generate the QR Code when dialog is opened
  useEffect(() => {
    const generateQRCode = async () => {
      if (documentNo && customer) {
        const url = `${process.env.NEXT_PUBLIC_APP_URL}/print?documentNo=${encodeURIComponent(documentNo)}&customer=${encodeURIComponent(customer)}`;

        try {
          const qrData = await QRCode.toDataURL(url);

          setQrCodeData(qrData);
        } catch (error) {
          console.error('QR Code generation error:', error);
        }
      }
    };

    generateQRCode();
  }, [documentNo, customer]);

  const handleSignatureClick = () => {
    // Logic for handling signature action
    setOpen(true);
    console.log('Signature button clicked');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrintClick = () => {
    if (documentNo && customer) {
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/print?documentNo=${encodeURIComponent(documentNo)}&customer=${encodeURIComponent(customer)}`;

      window.open(url, '_blank');  // Open in a new tab
    } else {
      console.error('Missing documentNo or customer');

      // Optionally show an alert or notification here
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px', marginY: '10px' }}>
      <Button
        variant={status === 0 ? 'contained' : 'outlined'}
        color={status > 0 ? 'success' : 'primary'}
        startIcon={
          status < 0 ? (
            <Icon icon="material-symbols:circle-outline" />
          ) : status === 0 ? (
            <Icon icon="mingcute:add-circle-fill" />
          ) : (
            <Icon icon="mdi:check-circle" />
          )
        }
        disabled={status !== 0}
        onClick={handleSignatureClick}
      >
        Signature
      </Button>
      <Button
        variant={status === 1 ? 'contained' : 'outlined'}
        color="primary"
        startIcon={
          status < 2 ? (
            <Icon icon="material-symbols:circle-outline" />
          ) : status === 1 ? (
            <Icon icon="mingcute:add-circle-fill" />
          ) : (
            <Icon icon="mdi:check-circle" />
          )
        }
        disabled={status !== 1}

        onClick={handlePrintClick}
      >
        Print Maintenance
      </Button>
      <Button
        variant={status === 1 ? 'contained' : 'outlined'}
        color="primary"
        startIcon={
          status < 2 ? (
            <Icon icon="material-symbols:circle-outline" />
          ) : status === 1 ? (
            <Icon icon="mingcute:add-circle-fill" />
          ) : (
            <Icon icon="mdi:check-circle" />
          )
        }
        disabled={status !== 1}

      // onClick={handlePrintClick}
      >
        Send Mail
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="qr-dialog-title">
        <DialogTitle id="qr-dialog-title">QR Code</DialogTitle>
        <DialogContent>
          {qrCodeData ? (
            <img src={qrCodeData} alt="QR Code" style={{ width: '300px', height: '300px' }} />
          ) : (
            <p>Generating QR Code...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TabAction;
