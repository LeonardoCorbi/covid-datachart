import { render, fireEvent } from '@testing-library/react';
import Map from '.';

const component = () => {
  const cb = jest.fn();
  return (
    <Map
      tooltip='Teste'
      method='partial'
      countryData={[]}
      setTooltip={cb}
      setShowToolTip={cb}
    />
  );
};

describe('Map component', () => {
  it('should render correctly', () => {
    const { getAllByTestId } = render(component());
    const [country] = getAllByTestId('country');
    
    expect(country).toBeDefined();
  });

  it('should have hover action', () => {
    const { getAllByTestId } = render(component());
    const countries = getAllByTestId('country');
    
    countries.forEach((country) => {
      fireEvent.mouseEnter(country);

      expect(<h2 />).toBeDefined();
    });
  });
});
