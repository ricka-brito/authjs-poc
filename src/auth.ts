import axios from "axios";
import NextAuth from "next-auth";
import Entra from "next-auth/providers/microsoft-entra-id";

let accountInfoProcessed = false;

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Entra({
			clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
			clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
			tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
			authorization: {
				prompt: "select-account",
        params: { scope: "User.Read openid" } 
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin

			// Process account info only if it hasn't been processed before
			if (account && !accountInfoProcessed) {
				console.log("Account Info:", account);
				token.accessToken = account.id_token;
				token.refreshToken = account.refresh_token;
				console.log("Refresh Token:", token.refreshToken);

				// Set the flag to true to indicate that account info has been processed
				accountInfoProcessed = true;
			}
			return token;
		},
		async session({ session, token, user }) {

      //   const profilePicture = await fetch(
      //   `https://graph.microsoft.com/v1.0/me/photos/648x648/$value`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token.accessToken}`,
      //     },
      //   }
      // )
      
      // if (profilePicture.ok) {
      //   const pictureBuffer = await profilePicture.arrayBuffer()
      //   const pictureBase64 = Buffer.from(pictureBuffer).toString("base64")
      //   session.user.image = `data:image/jpeg;base64, ${pictureBase64} `
      // }


      //fix ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

      // } else {
      //   console.log("antes")
      //   try {
      //     const profilePictureWithoutEntraPic = await axios.get(`https://ui-avatars.com/api/?name=AAA&size=512`, {
      //       responseType: "arraybuffer",
      //     })
      //   } catch (error) {
      //     console.log(error)
      //   }


      //   // if(profilePictureWithoutEntraPic.ok) {
      //   //   console.log("depois")
      //     // const pictureBufferWithoutEntraPic = profilePictureWithoutEntraPic.arrayBuffer()
      //   // const pictureBase64WithoutEntraPic = Buffer.from(profilePictureWithoutEntraPic.data, "binary").toString("base64")
      //   // session.user.image = `data:image/jpeg;base64, ${pictureBase64WithoutEntraPic} `
      //   // }
      // }
    

			// Send properties to the client, like an access_token and user id from a provider.
			session.user.token = token.accessToken as string;
			return session;
		},
	},
	
});
