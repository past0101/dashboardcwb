import React from 'react';
import Head from 'next/head';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Admin Dashboard - Πίνακας Ελέγχου</title>
        <meta name="description" content="Πίνακας ελέγχου διαχείρισης" />
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Πίνακας Ελέγχου</h1>
        <p className="mt-4">Καλώς ήρθατε στο σύστημα διαχείρισης της επιχείρησης.</p>
      </main>
    </>
  );
}