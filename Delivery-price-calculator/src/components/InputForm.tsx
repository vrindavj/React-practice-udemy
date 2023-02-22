import React, { useState } from 'react';
import './InputForm.css';
import * as calConstants from '../utils/constants';

const InputForm = () => {
  const minCartVal = calConstants.MIN_CART_VALUE;
  const initialDistFee = calConstants.INITIAL_DIST_FEE;
  const extraDistFee = calConstants.ADDITIONAL_DIST_FEE;
  const extraItemFee = calConstants.ADDITIONAL_ITEM_FEE;
  const bulkFee = calConstants.BULK_FEE;
  const rushHrFee = calConstants.RUSH_HR_FEE;

  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [cartValue, setCartValue] = useState(0);
  const [distance, setDistance] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [disableCalcBtn, setDisableCalcBtn] = useState(true);

  // setting the default time to now
  var now = new Date();
  now.setMinutes(now.getMinutes() + (-now.getTimezoneOffset()));  // adding offset
  const [defaultDate, setDefaultDate] = useState(now.toISOString().slice(0, -8));



  /**
   * Function to calculate surcharge based on cart value
   * @returns number: surcharge
   */
  const surcharge = () => {
    return minCartVal - cartValue;
  }

  /**
   * Function to calculate delivery fee based on distance
   * @param distance 
   * @returns number : fee
   */
  const distanceBasedFee = (distance: number) => {
    if (distance <= 1000) {
      return initialDistFee
    } else {
      return Math.ceil(distance / 500) * extraDistFee;
    }

  }

  /**
   * Function to calculate delivery fee based on item count
   * @param count: item count 
   * @returns number : fee
   */
  const itemBasedFee = (count: number) => {
    if (count <= 4) {
      return 0;  // less than 4 , no surcharge
    } else if (count > 4 && count <= 12) {
      return (count - 4) * extraItemFee;  // between 4 - 12, surcharge is applied
    } else {
      return ((count - 4) * extraItemFee) + bulkFee; //more than 12 - bulk fee plus surcharge
    }
  }

  /**
   * Function to check if entered date and time is on friday between 5pm-9pm eet (3pm-7pm utc)
   * @returns boolean
   */
  const findIsRushHour = () => {
    let offSetTime = -((new Date()).getTimezoneOffset()) / 60; // how much current time is offset from utc

    let startTime = (15 + offSetTime) * 60;  // 5pm  utc+offset 
    let endTime = (19 + offSetTime) * 60;   // 9pm  utc+offset
    let day = dateTime !== undefined ? dateTime.toString().split(' ')[0] : 'undefined';
    let time = dateTime !== undefined ? (dateTime.getHours() * 60 + dateTime.getMinutes()) : 0;
    let isRushHour = (day === 'Fri' && (time >= startTime && time <= endTime)) ? true : false;
    return isRushHour;


  }

  /**
   * Function to calculate fee based on rush hour
   * @returns rush hour based surcharge 
   */
  const dateTimeBasedFee = () => {
    let isRushHour = findIsRushHour();
    return isRushHour ? rushHrFee : 1;
  }

  /**
   * Function to check empty fields 
   */
  const nullCheck = () => {
    if (cartValue === 0 || distance === 0
      || itemCount === 0) {
      setDisableCalcBtn(true);
    } else {
      setDisableCalcBtn(false);
    }

  }

  /**
   * Function to calculate total delivery price based on delivery distance,
   * cart value, item count and time of delivery
   * @param event : HTML event
   * @returns total delivery price
   */

  const calculateDeliveryPrice = (event: any) => {
    event.preventDefault()
    setDisableCalcBtn(false);

    let fee = 0;
    if (cartValue >= 100) {
      setTotalDeliveryFee(0);
      return
    }
    else if (cartValue < 10) { fee += surcharge() }
    else { fee = 0 }
    fee = (fee + distanceBasedFee(distance) + itemBasedFee(itemCount)) * dateTimeBasedFee();
    fee = fee >= 15 ? 15 : parseFloat(fee.toFixed(2));  // max delivery fee check
    setTotalDeliveryFee(fee)

  }

  /**
   * Function to clear form fields
   */
  const resetForm = () => {
    window.location.reload();
    setDisableCalcBtn(true);
    setTotalDeliveryFee(0);

  }


  return (
    <div className='wrapper-div shadow p-3 mb-5 bg-body rounded m-5 position-relative'>
      <img className="d-none d-sm-block bg-image" src={process.env.PUBLIC_URL + '/del_pic.png'} alt='wolt icon' />
      <form className='position-relative' >
        <div className='row m-2 justify-content-center cart-value-field'>
          <label className='text-sm-start col-sm-2 col-form-label'>Cart Value</label>
          <div className="custom-width px-0 col-sm-2 input-group">
            <input
              required
              type="number"
              className='form-control'
              placeholder="Cart value"
              onChange={(e) => { nullCheck(); setCartValue(parseFloat(e.target.value)) }} />
            <span className="input-group-text">€</span>
          </div>
        </div>
        <div className='row m-2 justify-content-center cart-value-field'>
          <label className='text-sm-start col-sm-2 col-form-label'>Delivery distance</label>
          <div className="custom-width px-0 col-sm-2 input-group">
            <input
              required
              className=' form-control'
              type="number"
              placeholder="Delivery distance"
              onChange={(e) => { nullCheck(); setDistance(parseFloat(e.target.value)) }} />
            <span className="input-group-text">m</span>
          </div>

        </div>
        <div className='row m-2 justify-content-center item-amt-field'>
          <label className='text-sm-start col-sm-2 col-form-label'>Amount of items </label>
          <input type="number"
            required
            className='custom-width col-sm-2 form-control'
            placeholder="Amount of items"
            onChange={(e) => { setItemCount(parseInt(e.target.value)); nullCheck(); }} />
        </div>
        <div className='row m-2 justify-content-center date-time-field'>
          <label className='text-sm-start col-sm-2 col-form-label'>Date & Time</label>
          <input type="datetime-local"
            required
            defaultValue={defaultDate}
            className='custom-width col-sm-2 form-control'
            placeholder="Date and time"
            data-testid="date-time-field"
            onChange={(e) => { setDateTime(new Date(e.target.value)); nullCheck(); }} />
        </div>
        <div className='d-flex ms-sm-5 flex-sm-row flex-column justify-content-center'>
          <button disabled={disableCalcBtn} type="submit" className='btn custom-btn-width btn-info my-sm-5' onClick={(e) => calculateDeliveryPrice(e)}>Calculate delivery price</button>
          <button type="button" className='btn btn-light mx-sm-3 my-2 custom-btn-width my-sm-5' onClick={resetForm}>Clear</button>
        </div>

      </form>

      <div className='mb-5'>
        Delivery price: <span data-testid="delivery-price-span" className='text-info'>{totalDeliveryFee}</span> €
      </div>
      <div className='copyright-text d-none d-sm-block'>Image copyright ©flaticon</div>
    </div>
  )
}

export default InputForm