'use client'

// React Imports
import { useEffect, useState, type ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Type Imports
import { useSession } from 'next-auth/react'

import UserProfile from '@views/pages/user-profile'

// Component Imports

const ProfileTab = dynamic(() => import('@views/pages/user-profile/profile'))

// Vars
const tabContentList = (data?: any): { [key: string]: ReactElement } => ({
  profile: <ProfileTab data={data} />,
})

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/profile` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

const ProfilePage = () => {
  // Vars
  const [data, setData] = useState([])
  const { data: session } = useSession()

  console.log(session?.user_account?.user_id)

  useEffect(() => {

    // Fetch customers from API
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/engineers/byId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ putEngineer: session?.user_account?.user_id }),
        });

        const data = await response.json();

        setData(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      }
    };

    fetchCustomers();

  }, [session?.user_account?.user_id]);

  return <UserProfile data={data} tabContentList={tabContentList(data)} />
}

export default ProfilePage
