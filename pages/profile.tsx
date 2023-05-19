import { getSession } from "next-auth/react"
import Link from "next/link"

export default function profilePage() {
	return (
		<section 
			className="container mx-auto text-center">
			<h3 
				className="text-4xl font-bold bg-zinc-700 text-gray-300">
					Profile Page
			</h3>
			<Link href={"/"}>Home Page</Link>

		</section>
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
