// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const UserProfileHeader = ({ data }: { data?: any }) => {

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/upload/engineers/${data.user_no}/engineer_no.png`;
  const coverImg = `/images/pages/profile-banner.png`

  return (
    <Card>
      <CardMedia image={coverImg} className='bs-[250px]' />
      <CardContent className='flex gex-row !pt-0 md:justap-5 justify-center flex-col items-center md:items-end md:flify-start'>
        <div className='flex rounded-bs-md mbs-[-40px] border-[5px] mis-[-5px] border-be-0  border-backgroundPaper bg-backgroundPaper'>
          <img height={120} width={120} src={imageUrl} className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full justify-start self-end flex-col items-center gap-6 sm-gap-0 sm:flex-row sm:justify-between sm:items-end '>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4'>{data?.user_firstname + ' ' + data?.user_lastname}</Typography>
            <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
              <div className='flex items-center gap-2'>
                <Typography className='font-medium'>รหัสพนักงาน: {data?.user_no}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <Typography className='font-medium'>ตำแหน่ง: {data?.user_jobtitle}</Typography>
              </div>
            </div>
          </div>
          <Button variant='contained' className='flex gap-2'>
            <i className='tabler-user-check !text-base'></i>
            <span>Connected</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
