import InputForm from "./InputForm";
import { render, screen, fireEvent,act } from '@testing-library/react';


describe("Input form", () => {
  
  let  cartValueField: HTMLElement,deliveryDistanceField: HTMLElement,itemCountField: HTMLElement, dateTimeField: HTMLElement,resultElement: HTMLElement,buttonElement: HTMLElement
  const rushHour ='2023-01-20T18:45' ;
  const nonRushHour = '2023-01-06T12:00';
  let calculateDeliveryPrice = jest.fn();
    
  beforeEach(() => {
    render(
        <InputForm />
    );

    cartValueField = screen.getByPlaceholderText('Cart value');
    deliveryDistanceField = screen.getByPlaceholderText('Delivery distance');
    itemCountField = screen.getByPlaceholderText('Amount of items');
    dateTimeField = screen.getByTestId('date-time-field');
    resultElement = screen.getByTestId('delivery-price-span');
    buttonElement  = screen.getByRole("button", { name: /Calculate delivery price/i} );

    })
    
    it('should render all the input fields', () => {
        expect(cartValueField).toBeInTheDocument();
        expect(deliveryDistanceField).toBeInTheDocument();
        expect(itemCountField).toBeInTheDocument();
        expect(dateTimeField).toBeInTheDocument();

    });
 
    it('should initially render date-time input field with current date and time', () => {
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        expect(dateTimeField.getAttribute('value')).toBe(now.toISOString().slice(0, -8))
    });

    it('should calculate delivery fee when cart value greater than 100', () => {
        fireEvent.change(cartValueField, { target: { value: 101 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 12 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(0);
    });

    it('should calculate delivery fee to be 0 when cart value is equal to 100', () => {
        fireEvent.change(cartValueField, { target: { value: 100 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 12 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(0);
    });
   
    it('should calculate delivery fee to be 8.4 when cart value is less than 10€,count = 4, distance = 480m and it is non rush hour',  () => {
        fireEvent.change(cartValueField, { target: { value: 3.6 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 480 } });
        fireEvent.change(itemCountField, { target: { value: 4 } });
        fireEvent.change(dateTimeField, { target: { value: nonRushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(8.4);
    });

    it('should calculate delivery fee to be 6 when cart value is more than 10 but less than 100, count = 12, distance = 362m and it is non rush hour', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 362 } });
        fireEvent.change(itemCountField, { target: { value: 12 } });
        fireEvent.change(dateTimeField, { target: { value: nonRushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(6);

    });

    it('should calculate delivery fee to be 15 total surcharges exceed 15', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 3620 } });
        fireEvent.change(itemCountField, { target: { value: 15 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(15);

    });

    it('should calculate delivery fee when distance is less than 1000m', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 734 } });
        fireEvent.change(itemCountField, { target: { value: 15 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(10.44);

    });

    it('should calculate delivery fee when distance is 1503m (more than than 1000)', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1503 } });
        fireEvent.change(itemCountField, { target: { value: 15 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(12.84);

    });

    it('should calculate delivery fee when distance is 1200m (more than than 1000)', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1200 } });
        fireEvent.change(itemCountField, { target: { value: 15 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(11.64);

    });

    it('should calculate delivery fee when distance is equal to 1000m', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 15 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(10.44);

    });

    it('should calculate delivery fee when distance is equal to 1000m', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 15 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(10.44);

    });

    it('should calculate delivery fee when count is less than 5', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 4 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(2.4);

    });

    it('should calculate delivery fee when count is greater than 4 and less 13', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 5 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(3);

    });

    it('should calculate delivery fee when count is greater than or equal to 13', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 13 } });
        fireEvent.change(dateTimeField, { target: { value: rushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(9.24);

    });

    it('should calculate delivery fee when it is not friday rush hour', () => {
        fireEvent.change(cartValueField, { target: { value: 40 } });
        fireEvent.change(deliveryDistanceField, { target: { value: 1000 } });
        fireEvent.change(itemCountField, { target: { value: 13 } });
        fireEvent.change(dateTimeField, { target: { value: nonRushHour } });
        fireEvent.click(buttonElement)
        expect(Number(resultElement.textContent)).toEqual(7.7);

    });
  })
  


