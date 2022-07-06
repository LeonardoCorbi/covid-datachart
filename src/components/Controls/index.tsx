import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';

import { Slider, Select, MenuItem } from '@material-ui/core';

import { DATES } from '../../constants';
import { Button, Container } from './styles';
import { IQueryParams } from '../../../pages';
import { toBrazilDate } from '../../utils/date';
import { MethodType } from '../../services/Cases/dtos/requests/findByDate.request';

interface IControllers {
  method: string;
  updateQuery: ({ date, method: type }: Partial<IQueryParams>) => void
  selectedDate: string;
  setMethod: (value: MethodType) => void;
  setSelectedDate: (value: string) => void;
}

const Controls = ({
  method,
  setMethod,
  updateQuery,
  selectedDate,
  setSelectedDate,
}: IControllers) => {
  let debouncing: NodeJS.Timeout;

  const initialIndex = useMemo(() => DATES.findIndex((date) => date === selectedDate), [selectedDate]);
  const DATE_INDEX_LENGTH = DATES.length - 1;
  const TIME = 1500;

  const [sliderPosition, setSliderPosition] = useState(initialIndex);
  const [isPlayed, setIsPlayed] = useState(false);

  const onSliderChange = useCallback((
    _: any,
    value: number | number[]
  ) => {
    const date = DATES[+value];

    setSliderPosition(+value);
    clearTimeout(debouncing);

    debouncing = setTimeout(() => {
      setSelectedDate(date);
      updateQuery({ date });
    }, 500);
  }, [setSelectedDate, updateQuery]);

  const onSelectChange = useCallback((
    { target: { value } }: ChangeEvent<{ value: unknown; }>,
    _: any
  ) => {
    const type = value as MethodType;
    updateQuery({ method: type });
    setMethod(type);
  }, [updateQuery]);

  const onPlayClick = useCallback(() => {
    setIsPlayed((prevState) => !prevState);
  }, [isPlayed]);

  useEffect(() => {
    if (!(sliderPosition < DATE_INDEX_LENGTH && isPlayed)) return;
    
    const timer = setTimeout(() => {
      onSliderChange(null, sliderPosition + 1);
    }, TIME);
    
    if (sliderPosition === DATE_INDEX_LENGTH) setIsPlayed(false);
    return () => clearTimeout(timer);
  }, [sliderPosition, isPlayed]);

  useEffect(() => {
    setSliderPosition(initialIndex);
  }, [initialIndex]);

  return (
    <Container>
      <section>
        <article>
          <Slider
            min={0}
            data-test-id="slider"
            valueLabelDisplay="on"
            value={sliderPosition}
            max={DATE_INDEX_LENGTH}
            onChange={onSliderChange}
            valueLabelFormat={(value) => toBrazilDate(DATES[value])}
          />
        </article>
        <article>
          <ul>
            <li>mai/2020</li>
            <li>out/2020</li>
            <li>mar/2021</li>
            <li>jul/2021</li>
            <li>jan/2022</li>
          </ul>
        </article>
      </section>
      <section>
        <article>
          <label htmlFor="methodSelector">Modo de visualização:</label>
          <Select
            value={method}
            id="methodSelector"
            data-test-id="select"
            defaultValue="partial"
            onChange={onSelectChange}
          >
            <MenuItem value="partial">Parcial</MenuItem>
            <MenuItem value="total">Total</MenuItem>
          </Select>
        </article>
        <article>
          <label htmlFor="playButton">Simular passagem de tempo:</label>
          <Button
            type="button"
            id="playButton"
            data-test-id="select"
            onClick={onPlayClick}
          >
            {isPlayed ? 'Pause' : 'Play'}
          </Button>
        </article>
      </section>
    </Container>
  );
};

export default Controls;
