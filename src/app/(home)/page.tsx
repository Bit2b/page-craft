'use client'

import Link from 'next/link';
import { Navbar } from './navbar';
import TempletesGallery from './TempletesGallery';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api'

const Home = () => {
  const documents = useQuery(api.documents.getDocuments)

  if (documents === undefined) {
    return <div> Loding...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fiex fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TempletesGallery />
        Click <Link className="text-blue-500 underline" href="/documents/123"> here </Link> to go to document id 123

        {documents?.map((document) => (
          <div key={document._id}> {document.title} </div>
        ))}
      </div>
    </div>
  );
};

export default Home;