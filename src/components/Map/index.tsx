/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

import { ICountryData } from '../../../pages';
import { COLOR_RANGES } from '../../constants';
import { MethodType } from '../../services/Cases/dtos/requests/findByDate.request';
import geo from './world-110m.json';

interface IMap {
  method: MethodType;
  tooltip: string;
  countryData: ICountryData[];
  setTooltip: (value: string) => void;
  setShowToolTip: (value: boolean) => void;
}

const Map = ({
  method,
  tooltip,
  setTooltip,
  countryData,
  setShowToolTip,
}: IMap) => {
  const getCountryColor = useCallback((country: string) => {
    const countryVariants = countryData
      .find(({ name }) => name === country)?.variants;

    const count = Object
      .values(countryVariants ?? {})
      .reduce((prev, curr) => prev + curr, 0);
    
    return COLOR_RANGES.find(({ range }) => {
      const rangeNumber = method === 'total' ? range[1] : range[0];
      return count >= rangeNumber;
    })?.color;
  }, [countryData, method]);

  const onMouseEnter = useCallback((countryName: string) => {
    setTooltip(countryName);
    setShowToolTip(true);
  }, [setShowToolTip, setTooltip]);

  const onMouseLeave = useCallback(() => {
    setShowToolTip(false);
  }, [setShowToolTip]);

  return (
    <ComposableMap style={{ transform: 'translateX(-4%)' }} data-testid="mapContainer">
      <Geographies data-tip={tooltip} geography={geo}>
        {
          ({ geographies }) => geographies.map((geo) => {
            const countryName = geo.properties.NAME_LONG;
            const commonStyle = {
              strokeWidth: .2,
              outline: 'none',
              fill: getCountryColor(countryName),
            };
    
            const countryStyle = {
              default: { ...commonStyle, opacity: .9 },
              hover: { ...commonStyle, strokeWidth: 1 },
              pressed: { ...commonStyle, strokeWidth: 1 },
            };
            return (
              <Geography
                stroke="black"
                geography={geo}
                key={geo.rsmKey}
                strokeWidth={.15}
                data-tip={tooltip}
                style={countryStyle}
                data-testid="country"
                onMouseLeave={onMouseLeave}
                onMouseEnter={() => onMouseEnter(countryName)}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;
