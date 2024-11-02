'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Component Imports
import { useSession } from 'next-auth/react'

import CustomTextField from '@core/components/mui/TextField'

// Validation Schema
const schema = yup.object().shape({
  currentPassword: yup.string().required('Current Password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .required('New Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')  // Replace null with undefined
    .required('Confirm Password is required')
})

const ChangePasswordCard = () => {
  const { data: session, status } = useSession(); // ใช้เพื่อตรวจสอบเซสชัน

  // React Hook Form
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })

  // States for password visibility
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  // State to hold userId from session
  const [userId, setUserId] = useState<string | null>(null)

  // Set userId if session is authenticated
  useEffect(() => {
    if (status === 'authenticated' && session?.user_account?.user_id) {
      setUserId(session.user_account.user_id)
    }
  }, [status, session])

  const handleClickShowCurrentPassword = () => {
    setIsCurrentPasswordShown(!isCurrentPasswordShown)
  }

  const onSubmit = async (data: any) => {
    const { currentPassword, newPassword } = data;

    // Perform save actions by sending to the API
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          user_id: userId,  // Send userId (user_no)
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Password changed successfully:', result);
        reset(); // Reset form on success
      } else {
        console.error('Error changing password:', result);
      }
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  }

  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='currentPassword'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Current Password'
                    type={isCurrentPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowCurrentPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isCurrentPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container className='mbs-0' spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='newPassword'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='New Password'
                    type={isNewPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='confirmPassword'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Confirm New Password'
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    placeholder='············'
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                            onMouseDown={e => e.preventDefault()}
                          >
                            <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} className='flex flex-col gap-4'>
              <Typography variant='h6'>Password Requirements:</Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  Minimum 8 characters long - the more, the better
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  At least one lowercase & one uppercase character
                </div>
                <div className='flex items-center gap-2.5'>
                  <i className='tabler-circle-filled text-[8px]' />
                  At least one number, symbol, or whitespace character
                </div>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>Save Changes</Button>
              <Button variant='tonal' type='reset' color='secondary' onClick={() => reset()}>Reset</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
