import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    // The user will be redirected to the Google sign-in page.
    // After successful sign-in, they will be redirected back to your app.
    // You'll need to handle the redirect result in your app's entry point or a dedicated redirect handling page.
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error("Google Sign-In error:", errorCode, errorMessage, email, credential);
    throw error;
  }
};