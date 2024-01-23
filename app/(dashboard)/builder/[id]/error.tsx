'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { TbHomeSearch } from 'react-icons/tb';

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-4'>
      <h2 className='text-destructive text-4xl'>Something went wrong</h2>
      <Button asChild>
        <Link href={'/'}>
          Go Home <TbHomeSearch />
        </Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
