import ResultBox from './ResultBox';
import {render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
    const testCases = [
        { amount: '100', result: '28.57'},
        { amount: '20', result: '5.71'},
        { amount: '200', result: '57.14'},
        { amount: '345', result: '98.57'},
    ]
    for(const testObj of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={parseFloat(testObj.amount)} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN '+ testObj.amount + '.00 = $' + testObj.result);
      });
      cleanup();
    }
    const testCasesUSD = [
      { amount: '28.00', result: '98'},
      { amount: '6.00', result: '21'},
      { amount: '57.00', result: '199.50'},
      { amount: '98.57', result: '345'},
      {amount: '20.00', result: '70'},
  ]
  for(const testObj of testCasesUSD) {
  it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={parseFloat(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('$'+ testObj.amount + ' = PLN ' + testObj.result);
    });
    cleanup();
  }
  it('should render proper info about conversion when PLN -> PLN', () => {
    render(<ResultBox from="PLN" to="PLN" amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('PLN 100.00 = PLN 100.00');
  });
  it('should render proper info about conversion when USD -> USD', () => {
    render(<ResultBox from="USD" to="USD" amount={100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('$100.00 = $100.00');
  });
  it('should return "Wrong value..." when input is below 0', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent("Wrong value...");
  });
});