import { createRxDatabase, addRxPlugin } from 'rxdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

import schemas from './schemas';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite)

addRxPlugin(SQLiteAdapter);

export const database = async () => {
    return await createRxDatabase({
        name: 'mydatabase',
        adapter: 'react-native-sqlite',
        multiInstance: false,
        ignoreDuplicate: true,
        pouchSettings: { auto_compaction: true, revs_limit: 1 },
        queryChangeDetection: true,
    }).then(async db => {
        await db.collection({
            name: 'abl',
            schema: schemas.ABL,
        })
        await db.collection({
            name: 'buma',
            schema: schemas.BUMA,
        })
        return db;
    }).catch(e => {
        console.log('error of createRxDatabase', e)
        return null;
    })
}
