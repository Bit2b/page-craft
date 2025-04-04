'use client'

import Link from 'next/link';
import { Navbar } from './navbar';
import TempletesGallery from './TempletesGallery';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api'
import { DocumentsTable } from './DocumentsTable';

const Home = () => {
  const { results, loadMore, status } = usePaginatedQuery(api.documents.getDocuments, {}, { initialNumItems: 5 })

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fiex fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TempletesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};

export default Home