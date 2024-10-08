'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import chevronDown from '/public/images/chevron-down.svg';
import { useFieldArray, useForm } from 'react-hook-form';
import { websiteLinkRegex } from '@/utils/regex';
import { CreateEventStep2Form, SearchParam } from '@/interface/opportunity';
import { updateSearchParams } from '@/services/frontend/commonServices';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateSubmitOppDetails } from '@/app/redux/slices/submitOpportunity';
import { useLoadScript, Autocomplete, Libraries } from '@react-google-maps/api';
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from '@/constants/constants';

import { provincesOptions } from '@/utils/staticDropdown/dropdownOptions';
import cross from '/public/images/cross.svg';
import Image from 'next/image';
const CreateEventStep2 = ({
  stepValidationShouldCheck,
  setStepValidationShouldCheck,
}: any) => {
  const eventDetails = useSelector((state: any) => state.submitOppReducer);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    setError,
    trigger,
    formState: { errors },
  } = useForm<CreateEventStep2Form>({
    defaultValues: {
      locationType: eventDetails.virtualLocationLink ? 'VIRTUAL' : 'PHYSICAL',
      virtualLocationLink: eventDetails.virtualLocationLink || '',
      physicalLocations: eventDetails.physicalLocations,
    },
  });
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'physicalLocations',
  });
  const dispatch = useDispatch();
  const locationType = watch('locationType');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleFormSubmit = async (data: CreateEventStep2Form) => {
    const updatedSubmitEventState = {
      ...eventDetails,
      virtualLocationLink: data.virtualLocationLink,
      physicalLocations: data.physicalLocations,
      locationType: data.locationType,
    };
    dispatch(updateSubmitOppDetails(updatedSubmitEventState));
    const params: SearchParam[] = [
      {
        key: 'submit-event',
        value: 'true',
      },
      {
        key: 'step',
        value: '3',
      },
      {
        key: 'commitment',
        value: eventDetails.type ? eventDetails.type : 'ONETIME',
      },
    ];
    updateSearchParams(searchParams, pathname, router, params);
  };

  useEffect(() => {
    if (locationType === 'PHYSICAL') {
      setValue('virtualLocationLink', '');
    }
    if (locationType === 'VIRTUAL') {
      setValue('physicalLocations', [
        {
          address: '',
          city: '',
          province: '',
          postalCode: '',
          locationName: '',
          lat: null,
          long: null,
        },
      ]);
    }
    //eslint-disable-next-line
  }, [locationType]);

  const addLocation = () => {
    const lastLocation = getValues('physicalLocations').slice(-1)[0];
    let hasError = false;

    if (!lastLocation.address) {
      setError(`physicalLocations.${fields.length - 1}.address`, {
        type: 'manual',
        message: 'Address is required',
      });
      hasError = true;
    }
    if (!lastLocation.city) {
      setError(`physicalLocations.${fields.length - 1}.city`, {
        type: 'manual',
        message: 'City is required',
      });
      hasError = true;
    }
    if (!lastLocation.postalCode) {
      setError(`physicalLocations.${fields.length - 1}.postalCode`, {
        type: 'manual',
        message: 'Postal Code is required',
      });
      hasError = true;
    }

    if (!hasError) {
      append({
        address: '',
        city: '',
        province: '',
        postalCode: '',
        locationName: '',
        lat: null,
        long: null,
      });
      setAutocompletes([...autocompletes, null]);
    }
  };

  // to check  the form validation on click of the navigation buttons
  useEffect(() => {
    if (stepValidationShouldCheck === 2) {
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
      setStepValidationShouldCheck('');
    } //eslint-disable-next-line
  }, [stepValidationShouldCheck]);

  //  google api
  // google api load and autocomplete state
  const [autocompletes, setAutocompletes] = useState<any>([]);

  // to resolve the warning from console useMemo to memoize both the libraries array and the options object
  const libraries = useMemo<Libraries>(() => ['places'], []);

  const { isLoaded } = useLoadScript(
    useMemo(
      () => ({
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
      }),
      [libraries],
    ),
  );

  const handlePlaceSelect = (index: number) => {
    const place = autocompletes[index].getPlace();

    if (place.address_components) {
      let city = '';
      let postalCode = '';
      let province = '';

      place.address_components.forEach((component: any) => {
        if (component.types.includes('locality')) {
          city = component.long_name;
        }
        if (component.types.includes('postal_code')) {
          postalCode = component.long_name;
        }
        if (component.types.includes('administrative_area_level_1')) {
          province = component.short_name; // Using short_name for province abbreviation
        }
      });

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setValue(
        `physicalLocations.${index}.address`,
        place.formatted_address || '',
      );
      setValue(`physicalLocations.${index}.city`, city);
      setValue(`physicalLocations.${index}.postalCode`, postalCode);
      setValue(`physicalLocations.${index}.province`, province);
      setValue(`physicalLocations.${index}.lat`, lat);
      setValue(`physicalLocations.${index}.long`, lng);

      trigger(`physicalLocations.${index}.postalCode`);
      trigger(`physicalLocations.${index}.city`);
      trigger(`physicalLocations.${index}.province`);
    }
  };

  useEffect(() => {
    // Initialize or update autocompletes array when fields change
    setAutocompletes((prevAutocompletes: any) => {
      const newAutocompletes = new Array(fields.length).fill(null);
      // Preserve existing autocomplete instances
      prevAutocompletes.forEach((autocomplete: any, index: number) => {
        if (index < newAutocompletes.length) {
          newAutocompletes[index] = autocomplete;
        }
      });
      return newAutocompletes;
    });
  }, [fields.length]);

  const handlePostalCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    setValue(`physicalLocations.${index}.postalCode`, value);
  };

  return (
    <form className="" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex  w-full py-5 flex-col relative px-5 max-h-modal overflow-auto">
        <h4 className="text-[#24181B] text-2xl font-medium mb-5">Location</h4>
        <div className="border border-[#E6E3D6] rounded-t-xl p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label className="text-base text-[#24181B]">
              Physical location
            </label>

            <label className="relative cursor-pointer">
              <input
                {...register('locationType')}
                className="hidden peer"
                name="locationType"
                type="radio"
                value={'PHYSICAL'}
              />
              <div className="ml-auto border border[#E6E3D6] min-6 w-6 h-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>
          </div>
          {locationType === 'PHYSICAL' &&
            fields.map((field, index) => (
              <div
                key={field.id}
                className="physical-location-group flex flex-col gap-5 relative"
              >
                {fields.length > 1 ? (
                  <div className="flex justify-between items-center">
                    <label className="text-base text-[#24181B]">
                      Physical location {index + 1}
                    </label>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute right-2 p-2 z-10 hover:bg-white hover:rounded-full "
                    >
                      <Image
                        className="brightness-0 group-hover:brightness-0 group-hover:invert"
                        src={cross}
                        alt="close"
                      />
                    </button>
                  </div>
                ) : null}

                <div className="relative w-full">
                  {isLoaded ? (
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        setAutocompletes((prev: any) => {
                          const newAutocompletes = [...prev];
                          newAutocompletes[index] = autocomplete;
                          return newAutocompletes;
                        });
                      }}
                      onPlaceChanged={() => handlePlaceSelect(index)}
                    >
                      <div className="relative">
                        <input
                          {...register(`physicalLocations.${index}.address`, {
                            required:
                              locationType === 'PHYSICAL'
                                ? 'Address is required'
                                : false,
                            onChange: () =>
                              trigger(`physicalLocations.${index}.address`),
                          })}
                          type="text"
                          id={`address-${index}`}
                          className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                          placeholder=" "
                        />
                        <label
                          htmlFor={`address-${index}`}
                          className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[18px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >
                          Address
                        </label>
                      </div>
                    </Autocomplete>
                  ) : (
                    <input
                      {...register(`physicalLocations.${index}.address`, {
                        required:
                          locationType === 'PHYSICAL'
                            ? 'Address is required'
                            : false,
                        onChange: () =>
                          trigger(`physicalLocations.${index}.address`),
                      })}
                      type="text"
                      id={`address-${index}`}
                      className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                      placeholder=" "
                    />
                  )}
                  {errors.physicalLocations?.[index]?.address && (
                    <span className="error-message text-red-500">
                      {errors.physicalLocations[index]?.address?.message}
                    </span>
                  )}
                </div>
                <div className="relative w-full">
                  <input
                    {...register(`physicalLocations.${index}.city`, {
                      required:
                        locationType === 'PHYSICAL'
                          ? 'City is required'
                          : false,
                      onChange: () =>
                        trigger(`physicalLocations.${index}.city`),
                    })}
                    type="text"
                    id={`city-${index}`}
                    className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor={`city-${index}`}
                    className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    City
                  </label>
                  {errors.physicalLocations?.[index]?.city && (
                    <span className="error-message text-red-500">
                      {errors.physicalLocations[index]?.city?.message}
                    </span>
                  )}
                </div>
                <div className="relative w-full">
                  <select
                    {...register(`physicalLocations.${index}.province`)}
                    className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#24181B] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                  >
                    <option value="" disabled hidden>
                      Select Province
                    </option>
                    {provincesOptions.length > 0 ? (
                      provincesOptions.map((option) => {
                        return (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })
                    ) : (
                      <option disabled>No options to choose</option>
                    )}
                  </select>
                  <Image
                    src={chevronDown}
                    alt="arrow"
                    className="absolute top-[17px] right-4 pointer-events-none"
                  />
                  <label
                    htmlFor={`province-${index}`}
                    className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Province (optional)
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    {...register(`physicalLocations.${index}.postalCode`, {
                      required:
                        locationType === 'PHYSICAL'
                          ? 'Postal Code is required'
                          : false,
                      onChange: (e) => {
                        handlePostalCodeChange(e, index);
                        trigger(`physicalLocations.${index}.postalCode`);
                      },
                    })}
                    type="text"
                    id={`postalCode-${index}`}
                    className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor={`postalCode-${index}`}
                    className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >
                    Postal Code
                  </label>
                  {errors.physicalLocations?.[index]?.postalCode && (
                    <span className="error-message text-red-500">
                      {errors.physicalLocations[index]?.postalCode?.message}
                    </span>
                  )}
                </div>
                {index !== fields.length - 1 && (
                  <hr className="border-[#E6E3D6] realtive -left-[1.5px] -right-[1.5px]"></hr>
                )}
              </div>
            ))}
          {locationType === 'PHYSICAL' && (
            <button
              onClick={addLocation}
              disabled={fields.length >= 10}
              className="cursor-pointer text-base h-[60px] px-4 py-3 inline-flex justify-center items-center border border-[#ff000040] bg-inherit rounded-2xl font-medium text-[#E60054] hover:bg-[#ff000017]"
              type="button"
            >
              Add Another Location
            </button>
          )}
        </div>
        <div className="border border-[#E6E3D6] border-t-0 rounded-b-xl p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <label className="text-base text-[#24181B]">Virtual</label>

            <label className="relative cursor-pointer">
              <input
                {...register('locationType')}
                className="hidden peer"
                name="locationType"
                type="radio"
                value={'VIRTUAL'}
              />
              <div className="ml-auto border border[#E6E3D6] w-6 h-6  min-6 bg-white rounded-full relative flex items-center justify-center peer-checked:bg-[#E60054] peer-checked:border-[#E60054]">
                <span className="w-2 h-2 absolute bg-white rounded-md peer-checked:bg-[#fff]"></span>
              </div>
            </label>
          </div>

          <div
            className={`flex flex-col gap-5 ${locationType === 'VIRTUAL' ? '' : 'hidden'}`}
          >
            <div className="relative w-full">
              <input
                {...register('virtualLocationLink', {
                  required:
                    locationType === 'VIRTUAL'
                      ? 'Virtual location link is required.'
                      : false,
                  pattern: {
                    value: websiteLinkRegex,
                    message: 'Enter valid location link',
                  },
                })}
                type="text"
                id="virtualLocationLink"
                className="block rounded-2xl px-5 pb-2.5 pt-6 w-full text-base text-[#1E1E1E] bg-[#EDEBE3] border border-[#E6E3D6] appearance-none focus:outline-none focus:ring-0 focus:border-[#E60054] peer"
                placeholder=" "
              />
              <label
                htmlFor="virtualLocationLink"
                className="absolute text-base text-[#1E1E1E80] duration-300 transform -translate-y-4 scale-75 top-[21px] placeholder-shown:top-[17px] peer-placeholder-shown:top-[17px] peer-focus:top-[21px] z-10 origin-[0] start-5 peer-focus:text-[#1E1E1E80] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Link
              </label>
              {errors.virtualLocationLink && (
                <span className="text-red-500">
                  {(errors.virtualLocationLink as { message: string }).message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end p-6 border-t border-solid border-[#1E1E1E0D] rounded-b">
        <button
          ref={submitButtonRef}
          className="text-base  w-full h-[60px] py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
          type="submit"
        >
          Continue to Commitment
        </button>
      </div>
    </form>
  );
};

export default CreateEventStep2;
