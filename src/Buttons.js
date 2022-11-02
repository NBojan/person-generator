import React from 'react';
import { FaEnvelopeOpen, FaUser, FaCalendarTimes, FaMap, FaPhone, FaLock } from 'react-icons/fa'

const Buttons = ({handleBtn}) => {
    return (  
        <div className="btnContainer d-flex space-between align-center mb-24">
            <button className='icon' data-label="name" onMouseOver={handleBtn}><FaUser /></button>
            <button className='icon' data-label="email" onMouseOver={handleBtn}><FaEnvelopeOpen /></button>
            <button className='icon' data-label="age" onMouseOver={handleBtn}><FaCalendarTimes /></button>
            <button className='icon' data-label="street" onMouseOver={handleBtn}><FaMap /></button>
            <button className='icon' data-label="phone" onMouseOver={handleBtn}><FaPhone /></button>
            <button className='icon' data-label="password" onMouseOver={handleBtn}><FaLock /></button>
        </div>
    );
}
 
export default React.memo(Buttons);