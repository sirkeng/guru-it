import React, { useEffect, useState } from 'react';

import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Box, MenuItem, Select, Typography, IconButton, Divider, Collapse } from '@mui/material';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react/dist/iconify.js';

interface EditCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customerData: any; // Add customerData prop
}

const EditCustomerDialog: React.FC<EditCustomerDialogProps> = ({ open, onClose, customerData }) => {
  const [customerTax, setCustomerTax] = useState('');
  const [customerType, setCustomerType] = useState<number>(1);
  const [customerTypeNo, setCustomerTypeNo] = useState('');
  const [customerContact, setCustomerContact] = useState<number>(1);

  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerName, setCustomerName] = useState<string>('');

  const [customerAddress, setCustomerAddress] = useState('');
  const [customerSubdist, setCustomerSubdist] = useState('');
  const [customerDist, setCustomerDist] = useState('');
  const [customerProv, setCustomerProv] = useState('');
  const [customerPostal, setCustomerPostal] = useState('');
  const [customerImg, setCustomerImg] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Expanded sections set to true by default
  const [addressExpanded, setAddressExpanded] = useState(true);
  const [isImageSectionExpanded, setIsImageSectionExpanded] = useState(true);

  useEffect(() => {
    if (customerData) {
      setCustomerTax(customerData.customer_tax || '');
      setCustomerType(customerData.customer_type || 1);
      setCustomerTypeNo(customerData.customer_typeno || '');
      setCustomerContact(customerData.customer_contact || 1);
      setCustomerAddress(customerData.customer_address || '');
      setCustomerSubdist(customerData.customer_subdist || '');
      setCustomerDist(customerData.customer_dist || '');
      setCustomerProv(customerData.customer_prov || '');
      setCustomerPostal(customerData.customer_postal || '');
      setImagePreview(`${process.env.NEXT_PUBLIC_API_URL}/upload/customers/${customerData?.customer_no}/${customerData?.customer_img}`)

      // Set name fields based on customer_contact type
      if (customerData.customer_contact === 1) {
        // For company, use customer_name as companyName
        setCompanyName(customerData.customer_name || '');
      } else if (customerData.customer_contact === 2) {
        // Split customer_name into title, firstName, and lastName
        const nameParts = customerData.customer_name?.split(' ') || [];

        if (nameParts.length >= 3) {
          setTitle(nameParts[0]);
          setFirstName(nameParts[1]);
          setLastName(nameParts.slice(2).join(' ')); // In case last name has multiple parts
        } else {
          setTitle(nameParts[0] || '');
          setFirstName(nameParts[1] || '');
          setLastName(''); // Empty if name doesn't have enough parts
        }
      }
    }
  }, [customerData]);

  const toggleAddressExpansion = () => {
    setAddressExpanded((prev) => !prev);
  };

  const handleExpandClick = () => {
    setIsImageSectionExpanded(!isImageSectionExpanded);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setCustomerImg(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    let fullName = '';

    if (customerContact === 1) {
      fullName = companyName;
      setCustomerName(companyName);
    } else if (customerContact === 2) {
      fullName = `${title} ${firstName} ${lastName}`;
      setCustomerName(fullName);
    }

    const formData = new FormData();

    formData.append('customerId', customerData.customer_id)
    formData.append('customerTax', customerTax);
    formData.append('customerType', String(customerType));
    formData.append('customerTypeNo', customerTypeNo);
    formData.append('customerContact', String(customerContact));
    formData.append('customerName', fullName);
    formData.append('customerAddress', customerAddress);
    formData.append('customerSubdist', customerSubdist);
    formData.append('customerDist', customerDist);
    formData.append('customerProv', customerProv);
    formData.append('customerPostal', String(customerPostal));

    if (customerImg) {
      formData.append('customerImg', customerImg);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          title: 'สำเร็จ!',
          text: 'คุณเพิ่มลูกค้าสำเร็จ.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log(customerName)
            onClose();
          }
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while creating the ticket.',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to connect to the API.',
        icon: 'error',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" marginBottom="20px">
          <Typography variant="h2" component="h4">
            เพิ่มผู้ติดต่อ
          </Typography>
          <TextField
            margin="dense"
            label="รหัสผู้ติดต่อ"
            type="text"
            disabled
            value={customerData?.customer_no}
            sx={{ marginRight: '10px' }}
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" justifyContent="space-between" marginBottom="20px">
          <TextField
            margin="dense"
            label="เลขทะเบียน 13 หลัก"
            type="text"
            fullWidth
            value={customerTax}
            onChange={(e) => setCustomerTax(e.target.value)}
            sx={{ marginRight: '10px' }}
          />
        </Box>

        <Box display="flex" marginBottom="20px">
          <FormControl fullWidth>
            <FormLabel>สาขา</FormLabel>
            <RadioGroup
              row
              value={customerType}
              onChange={(e) => setCustomerType(Number(e.target.value))}
            >
              <FormControlLabel value={1} control={<Radio />} label="สำนักงานใหญ่" />
              <FormControlLabel value={2} control={<Radio />} label="สาขา" />
            </RadioGroup>
          </FormControl>
          {customerType === 2 && (
            <TextField
              margin="dense"
              label="หมายเลขสาขา"
              type="text"
              value={customerTypeNo}
              onChange={(e) => setCustomerTypeNo(e.target.value)}
              variant="outlined"
              sx={{ marginLeft: '10px', width: '150px' }}
            />
          )}
        </Box>

        <Box display="flex" justifyContent="space-between" marginBottom="20px">
          <FormControl fullWidth>
            <FormLabel>ชื่อกิจการ</FormLabel>
            <RadioGroup
              row
              value={customerContact}
              onChange={(e) => setCustomerContact(Number(e.target.value))}
            >
              <FormControlLabel value={1} control={<Radio />} label="นิติบุคคล" />
              <FormControlLabel value={2} control={<Radio />} label="บุคคลธรรมดา" />
            </RadioGroup>
          </FormControl>
        </Box>

        {customerContact === 1 && (
          <Box display="flex" justifyContent="space-between" marginBottom="20px">
            <TextField
              margin="dense"
              label="ชื่อกิจการ"
              type="text"
              fullWidth
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              sx={{ marginRight: '10px' }}
            />
          </Box>
        )}

        {customerContact === 2 && (
          <Box display="flex" justifyContent="space-between" marginBottom="20px">
            <FormControl fullWidth sx={{ marginRight: '10px', marginTop: '8px', marginBottom: '4px' }}>
              <Select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              >
                <MenuItem value="นาย">นาย</MenuItem>
                <MenuItem value="นาง">นาง</MenuItem>
                <MenuItem value="นางสาว">นางสาว</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="ชื่อจริง"
              type="text"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ marginRight: '10px' }}
            />
            <TextField
              margin="dense"
              label="นามสกุล"
              type="text"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        )}

        <Divider sx={{ marginBottom: '20px' }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h4">ที่อยู่</Typography>
          <IconButton onClick={toggleAddressExpansion}>
            {/* {addressExpanded ? <ExpandLess /> : <ExpandMore />} */}
            <Icon icon='rivet-icons:expand' />
          </IconButton>
        </Box>

        <Collapse in={addressExpanded}>
          <Box marginTop="20px">
            <TextField
              margin="dense"
              label="ที่อยู่"
              type="text"
              fullWidth
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              sx={{ marginBottom: '20px' }}
            />
            <Box display="flex" justifyContent="space-between" marginBottom="20px">
              <TextField
                margin="dense"
                label="แขวง/ตำบล"
                type="text"
                fullWidth
                value={customerSubdist}
                onChange={(e) => setCustomerSubdist(e.target.value)}
                sx={{ marginRight: '10px' }}
              />
              <TextField
                margin="dense"
                label="เขต/อำเภอ"
                type="text"
                fullWidth
                value={customerDist}
                onChange={(e) => setCustomerDist(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" marginBottom="20px">
              <TextField
                margin="dense"
                label="จังหวัด"
                type="text"
                fullWidth
                value={customerProv}
                onChange={(e) => setCustomerProv(e.target.value)}
                sx={{ marginRight: '10px' }}
              />
              <TextField
                margin="dense"
                label="รหัสไปรษณีย์"
                type="text"
                fullWidth
                value={customerPostal}
                onChange={(e) => setCustomerPostal(e.target.value)}
              />
            </Box>
          </Box>
        </Collapse>

        {/* Horizontal Divider */}
        <Divider sx={{ margin: '20px 0' }} />

        {/* customerImg Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
          <Typography variant="h6">รูปภาพ</Typography>
          <IconButton onClick={handleExpandClick}>
            {/* {isImageSectionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
            <Icon icon='rivet-icons:expand' />
          </IconButton>
        </Box>

        <Collapse in={isImageSectionExpanded}>
          <Box display="flex" justifyContent="space-between" marginBottom="20px">
            <Button
              variant="contained"
              component="label"
              startIcon={<Icon icon='mdi:camera-outline' />}
              sx={{ marginRight: '10px' }}
            >
              เพิ่มรูป
              <input
                type="file"
                accept="customerImg/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{ maxWidth: '200px', maxHeight: '150px' }}
              />
            )}
          </Box>
        </Collapse>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ยกเลิก</Button>
        <Button onClick={handleSubmit}>เพิ่มผู้ติดต่อ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;