import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback, useRef } from 'react';

import Map from '../src/components/Map';
import Controls from '../src/components/Controls';
import ToolTip from '../src/components/ToolTip';

import { CasesServices } from '../src/services/Cases/CasesServices';
import { IFindByDateDTO } from '../src/services/Cases/dtos/responses/findByDate.response';

import { COUNTRIES } from '../src/constants';
import { IFindByDate, MethodType } from '../src/services/Cases/dtos/requests/findByDate.request';
import { GenericObject } from '../src/types';

export interface ICountryData {
  name: string;
  variants: GenericObject<number>;
}

export interface IQueryParams {
  date: string;
  method: MethodType;
}

const Home: NextPage = () => {
  const { query, push } = useRouter();
  const INITIAL_DATA = query as unknown as IQueryParams;

  const hasInitialized = useRef(false);

  const [countryData, setCountryData] = useState<ICountryData[]>([]);
  const [tooltip, setTooltip] = useState('');
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATA.date);
  const [method, setMethod] = useState<MethodType>('partial');
  const [showToolTip, setShowToolTip] = useState(false);

  function sortAscending(a: IFindByDateDTO, b: IFindByDateDTO) {
    if (a.num_sequences < b.num_sequences) {
      return 1;
    }
    if (a.num_sequences > b.num_sequences) {
      return -1;
    }
    return 0;
  }

  const getData = async () => {
    try {
      const { data } = await CasesServices.findByDate({
        method,
        date: selectedDate,
      });

      COUNTRIES.forEach((country) => {
        const casesPerCountry = data
          ?.filter(({ location }) => location === country)
          .sort(sortAscending);
        
        const newCountry = {} as ICountryData;

        newCountry.name = country;
        newCountry.variants = {};

        if (casesPerCountry) {
          casesPerCountry?.forEach(({ variant, num_sequences }) => {
            if (method === 'total' && newCountry.variants[variant]) {
              newCountry.variants = {
                ...newCountry.variants,
                [variant]: +num_sequences + +newCountry.variants[variant]
              };
            } else {
              newCountry.variants = {
                ...newCountry.variants,
                [variant]: +num_sequences
              };
            }
          });
        } else {
          newCountry.variants = {};
        }

        setCountryData((prevState) => ([
          ...prevState.filter(({ name }) => name !== country),
          newCountry
        ]));
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const updateQuery = useCallback((payload: Partial<IQueryParams>) => {
    push({ query: {
      ...INITIAL_DATA,
      ...payload,
    } });
  }, [INITIAL_DATA]);


  useEffect(() => {
    getData();
  }, [selectedDate, method]);

  useEffect(() => {
    const hasValues = Object.values(INITIAL_DATA);
    if (!hasValues?.length || hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    setSelectedDate(INITIAL_DATA.date);
    setMethod(INITIAL_DATA.method || 'partial');
  }, [INITIAL_DATA]);

  return (
    <main>
      <ToolTip
        tooltip={tooltip}
        countryData={countryData}
        showToolTip={showToolTip}
      />
      <Controls
        method={method}
        setMethod={setMethod}
        updateQuery={updateQuery}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Map
        method={method}
        tooltip={tooltip}
        setTooltip={setTooltip}
        countryData={countryData}
        setShowToolTip={setShowToolTip}
      />
    </main>
  );
};

export default Home;
