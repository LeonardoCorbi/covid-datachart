import { render } from '@testing-library/react';
import Controls, { IControls } from '.';

const component = ({
  method = 'partial',
  selectedDate = '2020-05-11',
}: Partial<IControls>) => {
  const cb = jest.fn();
  return (
    <Controls
      method={method}
      setMethod={cb}
      updateQuery={cb}
      selectedDate={selectedDate}
      setSelectedDate={cb}
    />
  );
};

describe('Control component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(component({}));

    const slider = getByTestId('slider');
    const select = getByTestId('methodSelector');
    const playButton = getByTestId('playButton');

    expect(slider).toBeDefined();
    expect(select).toBeDefined();
    expect(playButton).toBeDefined();
  });
});