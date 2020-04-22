let BUMASchema ={
    "title": "BUMA schema",
    "description": "to store data BUMA",
    "version": 0,
    "type": "object",
    "properties": {
        id: {type: "number"},
        created_at: {type: "number"},
        waktuLaporan: {type: 'number'},
        judulHazard: {type: 'string'},
        detailLaporan: {type: 'string'},
        lokasi: {type: 'string'},
        subLokasi: {type: 'string'},
        detailLokasi: {type: 'string'},
    }
};

export default BUMASchema;
