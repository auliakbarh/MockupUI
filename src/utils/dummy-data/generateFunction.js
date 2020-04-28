import {
    dummy_title,
    dummy_detail,
    dummy_location,
    dummy_subLocation,
    dummy_locationDetail,
} from './randomData';
import {getUNIXTS} from '../UNIXTS';

const makeHazard = (i) => {
    return {
        id: i,
        waktuLaporan: getUNIXTS(),
        created_at: getUNIXTS(),
        judulHazard: dummy_title[i] || i.toString(),
        detailLaporan: dummy_detail[i] || i.toString(),
        lokasi: dummy_location[i] || i.toString(),
        subLokasi: dummy_subLocation[i] || i.toString(),
        detailLokasi: dummy_locationDetail[i] || i.toString(),
    };
};

export const generateBUMA = db => {
    try {
        let result = false;
        if (db) {
            const hazards = [...Array(10000).keys()].map(i => makeHazard(i));
            // console.log(hazards.length);
            // console.log(hazards[0]);

            // result = await db.buma.bulkInsert(hazards);
            // result = result.success;
            // result = true;

            try{
                db.write(() => {
                    result = hazards.map(hazard => db.create('Hazard', hazard));
                })

                console.log(result.length);
            }catch (e) {
                console.log('error generate data', e)
            }

        }

        return result;
    } catch (e) {
        console.log(e);
        return false;
    }
};
