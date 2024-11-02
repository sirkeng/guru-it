// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const AboutOverview = ({ data }: { data?: any }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <Typography className='uppercase' variant='body2' color='text.disabled'>
                About
              </Typography>
              <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>
                  หมายเลขพนักงาน:
                </Typography>
                <Typography>
                  {data.user_no}
                </Typography>
              </div>
              <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>
                  ชื่อ-นามสกุล:
                </Typography>
                <Typography>
                  {data.user_firstname + ' ' + data.user_lastname}
                </Typography>
              </div>

              <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>
                  ตำแหน่งงาน:
                </Typography>
                <Typography>
                  {data.user_jobtitle}
                </Typography>
              </div>

              <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>
                  อีเมล:
                </Typography>
                <Typography>
                  {data.user_email}
                </Typography>
              </div>

              <div className='flex items-center flex-wrap gap-2'>
                <Typography className='font-medium'>
                  เบอร์ติดต่อ:
                </Typography>
                <Typography>
                  {data.user_phone}
                </Typography>
              </div>

            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
