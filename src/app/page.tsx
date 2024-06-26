import { SignIn } from "@/components/signin";
import { auth } from "@/auth";
import { SignOut } from "@/components/signout";
import Image from "next/image";

export default async function Home() {
	const session = await auth();


	console.log(session);

	return (
		<>
		{session && session.user}
    {session?.user.image && <Image src={session.user.image!} alt="julia" width={400} height={400}/>}
      {session && session.user?.email}
			<SignIn />
      <SignOut />
		</>
	);
}
