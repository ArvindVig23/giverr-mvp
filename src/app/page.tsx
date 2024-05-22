import styles from './page.module.scss';
import OpportunitiesBanner from '@/components/Opportunities/OpportunitiesBanner';
import OpportunitiesTags from '@/components/Opportunities/OpportunitiesTags';
import OpportunitiesList from '@/components/Opportunities/OpportunitiesList';
import '../app/fonts.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <OpportunitiesBanner />
      <OpportunitiesTags />
      <OpportunitiesList />
    </main>
  );
}
