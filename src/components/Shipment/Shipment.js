import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
import thankyouImg from '../../images/giphy.gif';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderPlace, setOrderPlace] = useState(false)

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {setOrderPlace(true)};
  
  // const handleThankYou = () =>{
      
  // }

  let thankyou;
  if(orderPlace){
      thankyou = <img src={thankyouImg} alt=""/>
  }
    return (
      <div className='shipment_form'>
          {orderPlace && thankyou}
            { !orderPlace &&
            
            <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
              <input name="name" defaultValue={loggedInUser.name || loggedInUser.displayName } ref={register({ required: true })} placeholder='Your Name'/>
              {errors.name && <span className='error'>Name is required</span>}
              
              <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email'/>
              {errors.email && <span className='error'>Email is required</span>}
              
              <input name="address" ref={register({ required: true })} placeholder='Your Address'/>
              {errors.address && <span className='error'>Address is required</span>}
              
              <input name="phone" ref={register({ required: true })} placeholder='Your Phone Number'/>
              {errors.phone && <span className='error'>Phone is required</span>}
              
              <input type="submit" />
            </form>}
      </div> 
      
    );
};

export default Shipment;