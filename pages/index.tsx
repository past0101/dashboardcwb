import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard page
    router.push('/dashboard');
  }, [router]);

  return (
    <>
      <Head>
        <title>Admin Dashboard - Αρχική</title>
        <meta name="description" content="Διαχειριστικό σύστημα επιχείρησης" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg">Φόρτωση...</p>
        </div>
      </main>
    </>
  );
}