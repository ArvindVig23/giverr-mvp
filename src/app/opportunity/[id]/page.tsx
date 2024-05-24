'use client';
import OpportunitiesDetail from '@/components/Opportunities/OpportunitiesDetail';
import OpportunitiesSimilars from '@/components/Opportunities/OpportunitiesSimilars';
import { OpportunityDetail, SimilarInterest } from '@/interface/opportunity';
import { getOpportunityDetails } from '@/services/frontend/opportunityService';
import { sweetAlertToast } from '@/services/frontend/toastServices';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OpportunityDetailPage: React.FC = ({ params }: any) => {
  const [opportunityDetail, setOpportunityDetail] =
    useState<OpportunityDetail>();
  const [similarInterest, setSimilarInterest] = useState<SimilarInterest[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const getList = await getOpportunityDetails(params.id);
        const { opportunityData, similarOpportunity } = getList;
        setOpportunityDetail(opportunityData);
        setSimilarInterest(similarOpportunity);
      } catch (error: any) {
        const { message } = error;
        sweetAlertToast('error', message);
        router.push('/');
      }
    })(); //eslint-disable-next-line
  }, []);
  return (
    <div>
      <OpportunitiesDetail opportunityDetail={opportunityDetail} />
      {similarInterest && similarInterest.length > 0 && (
        <OpportunitiesSimilars similarInterest={similarInterest} />
      )}
    </div>
  );
};

export default OpportunityDetailPage;
