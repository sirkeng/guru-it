import React, { useRef } from 'react';

import SignatureCanvas from 'react-signature-canvas';
import { Box, Button } from '@mui/material';

const SignaturePadComponent: React.FC = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    const data = sigCanvas.current?.toDataURL();

    console.log(data); // You can send this data to your backend or do whatever you need with it
  };

  return (
    <Box
      sx={{
        border: '2px solid #000',
        borderRadius: '8px',
        width: '100%',
        height: '300px',
        marginBottom: '16px',
      }}
    >
      <SignatureCanvas
        ref={sigCanvas}
        penColor='black'
        canvasProps={{ width: 500, height: 300, className: 'sigCanvas' }}
      />
      <Button onClick={clear} variant="outlined" color="secondary" sx={{ marginTop: 2 }}>
        Clear
      </Button>
      <Button onClick={save} variant="contained" color="primary" sx={{ marginTop: 2, marginLeft: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default SignaturePadComponent;
