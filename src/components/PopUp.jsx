import React, { useEffect, useRef, useState } from 'react';

const PopUp = ({showPopUp, message}) => {

    const [timer , setTimer] = useState(100);
    const [dead, setDead] = useState(false);
    const timeLine = useRef(null);

    useEffect(() => {
        
        if(timer < 0){
            setDead(true);
            showPopUp(false , "");
            return;
        }
        const timerHandler = setInterval(() => {
            setTimer(prevTimer => prevTimer - 0.6);
            timeLine.current.style.width = `${timer}%`;
        }, 10);

        return () => 
            clearInterval(timerHandler);
            
    }, [timer]);

    return dead ? null : (
        <div className='PopUp'>
            <div className='container'>
                <p>{message}</p>
                <div className='timer' ref={timeLine}></div>
            </div>
        </div>
    );
}

export default PopUp;
