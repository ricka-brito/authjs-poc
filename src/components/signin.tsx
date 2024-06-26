import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("entra")
      }}
    >
      <button type="submit">Test entra</button>
    </form>
  )
} 