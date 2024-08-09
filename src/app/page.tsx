import { SignIn } from "@/components/signin";
import { auth } from "@/auth";
import { SignOut } from "@/components/signout";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  console.log(session);

  return (
    <>
      {session?.user?.image && (
        <Image src={session.user.image!} alt="julia" width={400} height={400} />
      )}
      <p>{session && session.user?.email}</p>
      <p>{session && session.user?.token}</p>
      <SignIn />
      <SignOut />
    </>
  );
}
