'use client';
import styles from './page.module.scss';
import OpportunitiesBanner from '@/components/Opportunities/OpportunitiesBanner';
import OpportunitiesTags from '@/components/Opportunities/OpportunitiesTags';
import OpportunitiesList from '@/components/Opportunities/OpportunitiesList';
import '../app/fonts.css';
import { useState } from 'react';

export default function Home() {
  const [currrentPage, setCurrentPage] = useState<number>(1);
  return (
    <main className={styles.main}>
      <OpportunitiesBanner />
      <OpportunitiesTags setCurrentPage={setCurrentPage} />
      <OpportunitiesList
        currrentPage={currrentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}
