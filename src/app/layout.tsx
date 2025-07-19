"use client";

import './globals.css';
import { Providers } from '@/components/Providers';
import { useEffect } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { app } from '@/lib/firebase';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const auth = getAuth(app);
        const result = await getRedirectResult(auth);
        if (result) {
          // This is a redirect from Google Sign-In.
          const user = result.user;
          // You can access user information here (e.g., user.displayName, user.email)
          console.log("Google Sign-In successful!", user);
          // TODO: Redirect the user to the desired page (e.g., dashboard)
        }
      } catch (error: any) {
        // Handle errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error getting redirect result:", errorCode, errorMessage, email, credential);
        // TODO: Display an error message to the user
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
