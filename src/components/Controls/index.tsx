/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import { Slider, Select, MenuItem } from '@material-ui/core';
import { Container } from './styles';
import { DATES } from '../../constants';
import { toBrazilDate } from '../../utils/date';
import { IFindByDate } from '../../services/Cases/dtos/requests/findByDate.request';

interface IControllers {
  method: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  setMethod: Dispatch<SetStateAction<IFindByDate['method']>>;
}

const Controls = ({ setSelectedDate, method, setMethod }: IControllers) => {
  let debouncing: NodeJS.Timeout;

  const onSliderChange = useCallback((_: any, value: number | number[]) => {
    clearTimeout(debouncing);
    debouncing = setTimeout(() => {
      setSelectedDate(DATES[+value])
    }, 500);
  }, [setSelectedDate]);

  const onSelectChange = useCallback((
    { target: { value } }: ChangeEvent<{
      value: unknown;
    }>,
    _: any
  ) => {
    setMethod(value as IFindByDate['method']);
  }, []);

  return (
    <Container>
      <section>
        <article>
          <Slider
            min={0}
            defaultValue={0}
            onChange={onSliderChange}
            max={DATES.length - 1}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => toBrazilDate(DATES[value])}
          />
        </article>
        <article>
          <span>mai/2020</span>
          <span>out/2020</span>
          <span>mar/2021</span>
          <span>jul/2021</span>
          <span>jan/2022</span>
        </article>
      </section>
      <section>
        <label htmlFor="methodSelector">Modo de visualização:</label>
        <Select
          value={method}
          id="methodSelector"
          onChange={onSelectChange}
        >
          <MenuItem value="partial">Parcial</MenuItem>
          <MenuItem value="total">Total</MenuItem>
        </Select>
      </section>
    </Container>
  );
};

export default Controls;
