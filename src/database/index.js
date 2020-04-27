import Realm from 'realm';

import {databaseOptions} from "./schemas";

const realm = new Realm(databaseOptions);

export default realm;
