'use client';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image
import logo from '/public/images/logo.svg';
import lightSearch from '/public/images/search-light.svg';
import ProfileDropdown from './ProfileDropdown';
import { useCookies } from 'react-cookie';
import SubmitEvents from '../../manageProfile/SubmitEvents';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from '@/constants/constants';
import { useForm } from 'react-hook-form';
import { addLatLngParams } from '@/services/frontend/commonServices';
const Header: React.FC = () => {
  const [cookies] = useCookies();
  const pathName = usePathname();
  const params = useSearchParams();
  const [searchOrg, setSearchOrg] = useState(params.get('name') ?? '');
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchText = async (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchOrg.length) {
      params.set('name', keyword);
    } else {
      if (params.has('name')) params.delete('name');
    }
    router.push(pathName + '?' + params.toString());
  };

  useEffect(() => {
    let debouceTimeout = setTimeout(() => {
      setSearchText(searchOrg);
    }, 500);
    return () => {
      clearTimeout(debouceTimeout);
    };
    // eslint-disable-next-line
  }, [searchOrg]);

  const libraries = useMemo<Libraries>(() => ['places'], []);
  const [autocompletes, setAutocompletes] = useState<any>([]);
  const { register, setValue, watch } = useForm();
  const searchValue = watch('search');
  const { isLoaded } = useLoadScript(
    useMemo(
      () => ({
        googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: libraries,
      }),
      [libraries],
    ),
  );

  useEffect(() => {
    if (!searchValue) {
      // Remove lat and lng from searchParams when input is cleared
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete('lat');
      current.delete('long');
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.push(`${window.location.pathname}${query}`);
    } //eslint-disable-next-line
  }, [searchValue]);

  const pathname = usePathname();
  const onPlaceChanged: any = () => {
    const place = autocompletes.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      // Update form value
      setValue('search', place.formatted_address);

      const params: any = [
        {
          key: 'lat',
          value: lat,
        },
        {
          key: 'long',
          value: lng,
        },
      ];
      addLatLngParams(searchParams, pathname, router, params);
    }
  };

  const lat = searchParams.get('lat');
  const long = searchParams.get('long');
  const reverseGeocode = async (lat: string | null, long: string | null) => {
    if (!lat || !long) return;

    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: +lat, lng: +long };

    try {
      const response = await geocoder.geocode({ location: latlng });
      if (response.results[0]) {
        return response.results[0].formatted_address;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    if (isLoaded && lat && long) {
      reverseGeocode(lat, long).then((address) => {
        if (address) {
          setValue('search', address);
        }
      });
    } //eslint-disable-next-line
  }, [lat, long]);
  return (
    <header className="hidden md:block">
      <nav className=" px-4 md:px-5 py-5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen">
          <div className="flex flex-wrap gap-2 lg:gap-8">
            <Link href="/" className="items-center inline-block">
              <Image className="h-8 w-auto" src={logo} alt="Logo" />
            </Link>
            <div className="flex flex-wrap gap-1 lg:gap-2.5 items-center text-sm lg:text-base">
              <Link
                href="/"
                className={`px-1  hover:text-[#1E1E 1E] ${pathName === '/' ? 'text-[#1E1E 1E]' : 'text-[#1E1E1E80]'}`}
              >
                Opportunities
              </Link>
              <Link
                href="/organizations"
                className={`px-1  hover:text-[#1E1E 1E] ${pathName === '/organizations' ? 'text-[#1E1E 1E]' : 'text-[#1E1E1E80]'}`}
              >
                Organizations
              </Link>
            </div>
          </div>

          {['/', '/organizations'].includes(pathName) && (
            <div className="flex w-full max-w-[654px] absolute left-0 right-0 m-auto search-bar ">
              <div className="relative items-center flex border border-[#E6E3D6] bg-[#EDEBE3] rounded-xl h-11 w-full">
                {pathName === '/organizations' && (
                  <input
                    onChange={(e) =>
                      pathName === '/organizations'
                        ? setSearchOrg(e?.target?.value)
                        : null
                    }
                    defaultValue={searchOrg}
                    placeholder={'Search Organization'}
                    className="placeholder-[#24181B80] h-full w-full rounded-xl px-4 pl-10 focus:outline-0 bg-transparent"
                  />
                )}
                {pathName === '/' && isLoaded ? (
                  <Autocomplete
                    className="w-full"
                    onLoad={(autocomplete: any) => {
                      let obj = { ...autocompletes };
                      let newAutocompletes: any = [obj];
                      newAutocompletes = autocomplete;
                      setAutocompletes(newAutocompletes);
                    }}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      {...register('search')}
                      placeholder={'Search opportunities'}
                      className="placeholder-[#24181B80] h-full w-full rounded-xl px-4 pl-10 focus:outline-0 bg-transparent"
                    />
                  </Autocomplete>
                ) : (
                  <input
                    placeholder={'Search opportunities'}
                    className="placeholder-[#24181B80] h-full w-full rounded-xl px-4 pl-10 focus:outline-0 bg-transparent"
                  />
                )}

                <Image
                  className="absolute top-2.5 left-3 pointer-events-none"
                  src={lightSearch}
                  alt="search"
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-2.5 desktop-submit">
            {cookies.userToken ? (
              <>
                <SubmitEvents />
                <ProfileDropdown />
              </>
            ) : (
              <Link
                href={'/sign-in'}
                className="text-base  w-auto h-11 px-4 py-3 flex justify-center items-center bg-[#E60054] rounded-2xl font-medium text-white hover:bg-[#C20038]"
              >
                Join now
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
