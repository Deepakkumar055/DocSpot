import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);


  const getUserAppointments = async () => {
    try {
      const{data} = await axios.get(`${backendUrl}/api/users/appointments`, {
        headers:{
          token
        }
      })
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
       
      else{
        toast.error(data.message);
      }
      
    } catch (error) {
       console.log(error);
       toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
       const { data } = await axios.post(
         `${backendUrl}/api/users/cancel-appointments`,
         { appointmentId },
         {
           headers: {
             token,
           },
         }
       );
       if (data.success) {
         toast.success(data.message);
         getUserAppointments(); // Refresh appointments after cancel
       } else {
         toast.error(data.message);
       }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    if(token){
      getUserAppointments();
    }
    
  }, [token])

 

  

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-36 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.
speciality}</p>
             
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-800'>Date & Time</span>: {item.slotDate} |{item.slotTime}
              </p>
            </div>
            <div className='flex flex-col gap-4 justify-end'>
            {!item.cancelled && !item.isCompleted &&<button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-black transition-all duration-300'>
                Pay Online
              </button>} 
              {!item.cancelled &&  !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-black transition-all duration-300'>
                Cancel Appointment
              </button>}

              {item.cancelled &&   !item.isCompleted &&<button className='sm:min-w-48 py-2 border border-red-500 text-red-500 '>
                 Appointment Cancelled
              </button>}
              {
                item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 text-green-500'>Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;