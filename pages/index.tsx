import Head from 'next/head'
import Link from 'next/link'
import { useSession, signOut, getSession } from "next-auth/react"

export default function Home() {
  const {data: session} = useSession()

  function handleSignOut() {
    signOut()
  }

  return (
    <>
      <Head>
        <title>
          Home
        </title>
        <meta name="description" content="authorization app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </>
  )
}

function Guest() {
  return(
    <main className='container mx-auto text-center py-20'>
      <h3 className="text-4xl font-bold">
        Guest Homepage        
      </h3>

      <div className="flex justify-center">
        <Link className='mt-5 px-10 py1 rounded-sm bg-indigo-500 text-gray-100' href={'/login'}>
            Sing In
        </Link>
      </div>
    </main>
  )
}

function User({ session, handleSignOut }: {session:any, handleSignOut:any}) {

  return(
    <main className='container mx-auto text-center py-20'>
      <h3 className="text-3xl font-bold underline">
        Autorized User Homepage        
      </h3>

      <div className="details">
        <h5>
          {session.user.name}
        </h5>
        <h5>
          {session.user.email}
        </h5>
      </div>

      <div className="flex justify-center">
        <button 
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-50"
          onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link className='mt-5 px-10 py1 rounded-sm bg-indigo-500 text-gray-100' href={'/profile'}>
            Profile Page
        </Link>
      </div>
    </main>
  )
}

export async function getServerSideProps({ req }: {req:any}) {
  const session = await getSession({ req })

  if (!session) {
    return(
      {
        redirect: {
          destination:'/login',
          permanent: false
        }
      }
    )
  }

  return (
    {
      props: {session}
    }
  )
}
