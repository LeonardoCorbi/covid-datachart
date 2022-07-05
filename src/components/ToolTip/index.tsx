import { useCallback, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import { ICountryData } from '../../../pages';
import { Container } from './styles';

interface IToolTip {
  tooltip: string;
  showToolTip: boolean;
  countryData: ICountryData[];
}

const ToolTip = ({ tooltip, countryData, showToolTip }: IToolTip) => {
  const variants = useMemo(() => countryData
    .find(({ name }) => name === tooltip)?.variants
  , [countryData, tooltip]);

  const getCasesList = useCallback(() => {
    const keys = Object.keys(variants ?? {});

    if (!keys.length) {
      return <p>Não há dados para exibir</p>;
    }

    const values = Object.values(variants ?? {});
    return (
      <ol>
        {
          keys.map((item, index) => (
            <li key={item}>
              <strong>{item}</strong>: {values[index]}
            </li>
          ))
        }  
      </ol>
    )
  }, [tooltip, variants]);


  return (
    <Container>
      {
        showToolTip && (
          <ReactTooltip>
            <h2>{tooltip}</h2>
            {getCasesList()}
          </ReactTooltip>
        )
      }
    </Container>
  );
};

export default ToolTip;
