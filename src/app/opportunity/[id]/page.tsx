'use client';
import OpportunitiesDetail from '@/components/Opportunities/OpportunitiesDetail';
import OpportunitiesSimilars from '@/components/Opportunities/OpportunitiesSimilars';
import CardSkeleton from '@/components/common/loader/CardSkeleton';
import DetailPageSkeleton from '@/components/common/loader/DetailPageSkeleton';
import { OpportunityDetail, SimilarInterest } from '@/interface/opportunity';
import { getOpportunityDetails } from '@/services/frontend/opportunityService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OpportunityDetailPage: React.FC = ({ params }: any) => {
  const [loading, setLoading] = useState(false);
  const [opportunityDetail, setOpportunityDetail] =
    useState<OpportunityDetail>();
  const [similarInterest, setSimilarInterest] = useState<SimilarInterest[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const getList = await getOpportunityDetails(params.id);
        const { opportunityData, similarOpportunity } = getList;
        setOpportunityDetail(opportunityData);
        setSimilarInterest(similarOpportunity);
        setLoading(false);
      } catch (error: any) {
        const { message } = error;
        sweetAlertToast('error', message);
        router.push('/');
        setLoading(false);
      }
    })(); //eslint-disable-next-line
  }, []);
  const cards = Array(5).fill(null);
  return (
    <div>
      {loading ? (
        <DetailPageSkeleton />
      ) : (
        <OpportunitiesDetail opportunityDetail={opportunityDetail} />
      )}

      {loading ? (
        <div className="grid grid-cols-5 gap-4">
          {cards.map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        similarInterest &&
        similarInterest.length > 0 && (
          <OpportunitiesSimilars similarInterest={similarInterest} />
        )
      )}
    </div>
  );
};

export default OpportunityDetailPage;
