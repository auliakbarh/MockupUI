let ABLSchema ={
    "title": "ABL schema",
    "description": "to store data ABL",
    "version": 0,
    "type": "object",
    "properties": {
        id: {type: "string", primary: true},
        judulRequest: {"type": "string"},
        detailLaporan: {type: 'string'},
        lokasi: {type: 'string'},
        subLokasi: {type: 'string'},
        detailLokasi: {type: 'string'},
        createdAt: {type: 'string'},
        createdBy: {type: 'string'},
        updatedAt: {type: 'string'},
        updatedBy: {type: 'string'},
        deletedBy: {type: 'string'},
    }
};

export default ABLSchema;
