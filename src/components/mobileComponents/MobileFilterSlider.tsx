import Filter from '../Opportunities/Filter';
import close from '/public/images/close.svg';
import Image from 'next/image';

const MobileFilterSlider = (props: any) => {
  return (
    <div>
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-solid border-[#1E1E1E0D] rounded-t">
        <h3 className="text-base font-semibold">Filters</h3>
        <button
          onClick={() => {
            document.body.classList.remove('overflow-hidden');
            props.setShowModal(false);
          }}
          className="w-[30px] h-[30px] ml-auto bg-[#24181B] hover:bg-[#454545] border-0 text-white rounded-[10px] flex items-center justify-center float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        >
          <Image src={close} alt="close" />
        </button>
      </div>
      <Filter
        opportunityIds={props.opportunityIds}
        setCurrentPage={props.setCurrentPage}
        setTotalRecords={props.setTotalRecords}
        setShowModal={props.setShowModal}
      />
    </div>
  );
};

export default MobileFilterSlider;
