import React,{ useState } from "react";

const Timer =(props) =>
{
    const {hours, mins,secs} = props.time;
    const [hh,setHH]=useState(hours);
    const [mm,setMM]=useState(mins);
    const [ss,setSS]=useState(secs);

    const tick =() =>
    {
        if(hh===0 && mm===0 && ss===0)
            reset();
        else if(mm===0 && ss===0)
        {
            setHH(hh-1);
            setMM(59);
            setSS(59);
        }
        else if(ss===0)
        {
            setHH(hh);
            setMM(mm-1);
            setSS(59);
        }
        else   
        {
            setHH(hh);
            setMM(mm);
            setSS(ss-1);
        }
    }

    const reset = () => 
    {
        setHH(hours);
        setMM(mins);
        setSS(secs);
    }

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    // const hhh=hh + "";
    // const mmm=mm + "";
    // const sss=ss + "";

    return(
        <div className="timer">
            <p>{`${hh.toString().padStart(2, '0')} : ${mm.toString().padStart(2, '0')} : ${ss.toString().padStart(2, '0')}`}</p>
        </div>
    );
}

export default Timer;