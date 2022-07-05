import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import Map from '../src/components/Map';
import Controls from '../src/components/Controls';
import ToolTip from '../src/components/ToolTip';

import { CasesServices } from '../src/services/Cases/CasesServices';
import { IFindByDateDTO } from '../src/services/Cases/dtos/responses/findByDate.response';

import { COUNTRIES, DATES } from '../src/constants';
import { IFindByDate } from '../src/services/Cases/dtos/requests/findByDate.request';
import { GenericObject } from '../src/types';

export interface ICountryData {
  name: string;
  variants: GenericObject<number>;
}

const Home: NextPage = () => {
  const [INITIAL_DATE] = DATES;

  const [countryData, setCountryData] = useState<ICountryData[]>([]);
  const [tooltip, setTooltip] = useState('');
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);
  const [method, setMethod] = useState<IFindByDate['method']>('partial');
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

  useEffect(() => {
    async function getData() {
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
    }

    getData();
  }, [selectedDate, method]);

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
