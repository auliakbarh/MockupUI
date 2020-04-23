import RNFetchBlob from "react-native-fetch-blob";
import Toast from 'react-native-simple-toast';


async function writeFileBackLog(text, filename){

    const RNFS = require('react-native-fs');
    let path = RNFetchBlob.fs.dirs.DownloadDir + '/' + filename + '.txt';


    RNFS.writeFile(path, text, 'utf8')
        .then((success) => {
            // console.warn(`FILE ${filename} WRITTEN! in`, path);
        })
        .catch((err) => {
            Toast.show('Backlog tidak dapat diproduksi, mohon izinkan iSafe mengakses penyimpanan.', Toast.SHORT)
            // console.warn(err.message);
        });
}
async function writeBacklog(text = 'nothing', subject='no subject', filename = 'BackLog iSafe'){
    const RNFS = require('react-native-fs');

    let path = RNFetchBlob.fs.dirs.DownloadDir + '/' + filename + '.txt';
    let time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    const breakLine = '-------------------------------------------------------------------';


    let read = await RNFS.readFile(path, 'utf8').then(res => { return res }).catch(err => { return null });

    let newText = time + ' : ' + subject + '\u000A';


    if(read === null){
        newText = newText + text + '\u000A\u000A' + breakLine + '\u000A\u000A';
    }else{
        newText = newText + text + '\u000A\u000A' + breakLine + '\u000A\u000A' + read;
    }

    writeFileBackLog(newText.toString(), filename)

}

export default writeBacklog
