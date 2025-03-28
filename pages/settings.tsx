import React from 'react';
import Layout from '@/components/layout/Layout';

export default function Settings() {
  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Ρυθμίσεις</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Αυτή η σελίδα είναι υπό κατασκευή. Εδώ θα υπάρχουν σύντομα οι ρυθμίσεις της εφαρμογής.
        </p>
      </div>
    </Layout>
  );
}