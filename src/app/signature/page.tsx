'use client'
import { useState, useRef, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { Box, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import SignatureCanvas from 'react-signature-canvas';

const Signature = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  console.log(signature)

  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    };

    const updateCanvasSize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial check
    checkOrientation();
    updateCanvasSize();

    // Add event listeners
    window.addEventListener('resize', () => {
      checkOrientation();
      updateCanvasSize();
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', () => {
        checkOrientation();
        updateCanvasSize();
      });
    };
  }, []);

  const searchParams = useSearchParams();

  const maId = searchParams.get('documentNo');
  const customerName = searchParams.get('customer');

  // Calculate width and height for the canvas
  const calculatedWidth = canvasSize.width * 0.95;
  const calculatedHeight = canvasSize.height * 0.6;

  const saveSignature = async () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

      const payload = {
        image: signatureData,
        maId,
        customerName,
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/signature`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data)
          setSignature(signatureData);
          Swal.fire({
            icon: 'success',
            title: 'Signature Saved',
            text: 'You have successfully signed the document!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Failed to upload signature. Please try again.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading the signature.',
        });
      }
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setSignature(null);
    }
  };

  return (
    <Box className="text-center mt-20" sx={{ marginLeft: '15px', marginRight: '15px' }}>
      {isPortrait ? (
        <Typography className="portrait-warning" variant="h5">
          Please rotate your device to landscape mode to sign the document.
        </Typography>
      ) : (
        <Box className="signature-container flex flex-col items-center justify-center" sx={{ width: `${calculatedWidth}px`, height: `${calculatedHeight}px` }}>
          <Typography variant="h4" gutterBottom>
            Sign the Document
          </Typography>
          <div className="border-2 border-black mb-4 w-full h-full flex items-center justify-center">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                width: calculatedWidth,
                height: calculatedHeight,
              }}
            />
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant="outlined" color="secondary" onClick={clearSignature} className="border-red-500 text-red-500 hover:bg-red-100">
              Clear
            </Button>
            <Button variant="contained" color="primary" onClick={saveSignature} className="bg-blue-500 hover:bg-blue-600">
              Save Signature
            </Button>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Signature;
