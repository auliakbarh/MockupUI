export const HazardSchema = {
    name: 'Hazard',
    properties: {
        id:  {type: 'int', default: 0},
        created_at:  {type: 'int'},
        waktuLaporan:  {type: 'int'},
        judulHazard: 'string',
        detailLaporan: 'string',
        lokasi: 'string',
        subLokasi: 'string',
        detailLokasi: 'string',
    }
};
