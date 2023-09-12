import Flicking from '@egjs/react-flicking';
import "@egjs/react-flicking/dist/flicking.css";
import React from 'react';

const Flicker = () => {
    return (
        <Flicking
            align="prev"
            circular={true}
            onMoveEnd={e => {
            console.log(e);
            }}>
            <div className="panel w-96">
                <img className='w-full' src="https://media.istockphoto.com/id/487770577/photo/makeup-set-on-table-front-view.jpg?s=612x612&w=0&k=20&c=IS_ZuHCF3N66jhDMwt2s7J_PGWABlpv2ISEAwpJ4JKU=" alt="" />
            </div>
            <div className="panel w-96">
                <img className='w-full' src="https://images.news18.com/ibnlive/uploads/2021/10/makeup-kit.jpg" alt="" />
            </div>
            <div className="panel w-96">
                <img className='w-full' src="https://watermark.lovepik.com/photo/20211121/large/lovepik-cosmetic-cosmetics-picture_500597172.jpg" alt="" />
            </div>
            <div className="panel w-96">
                <img className='w-full' src="https://t4.ftcdn.net/jpg/02/73/55/33/360_F_273553300_sBBxIPpLSn5iC5vC8FwzFh6BJDKvUeaC.jpg" alt="" />
            </div>
            <div className="panel w-96">
                <img className='w-full' src="https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?cs=srgb&dl=pexels-zhugewala-2113855.jpg&fm=jpg" alt="" />
            </div>
            <div className="panel w-96">
                <img className='w-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Inglot_Cosmetics.jpg/1200px-Inglot_Cosmetics.jpg" alt="" />
            </div>
        </Flicking>
    );
};

export default Flicker;