import React from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';

import config from '../../config';
import scale from '../../config/scale';
import EnhancedRequestItem from './observable/ListRequest/EnhancedRequestItem';
import * as screenName from '../../router/screenNames';

const ListRequest = ({navigation, route, database}) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [listRequest, setListRequest] = React.useState([]);

  const goToDetail = (detail, navigation) => {
    navigation.navigate(screenName.REQUEST_DETAIL_SCREEN, {
      detail: detail.item,
    });
  };

  const refresh = async database => {
    try {
      setIsFetching(true);
      let result = null;
      console.log('listRequest.length', listRequest.length);
      try{
        result = await database.abl.pouch.find({selector:{},
          limit:5,
          skip: listRequest.length
        });
      }catch (e) {
        console.log(e)
      }

      console.log('result find', result);
      // let dump = await database.abl.dump();
      // console.log('dump data', dump.docs.length)
      setListRequest(listRequest.concat(result.docs))
      setIsFetching(false);
      return null;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={config.color.background}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={listRequest}
          renderItem={item => (
            <EnhancedRequestItem
              data={item.item}
              onPress={() => goToDetail(item, navigation)}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={() => refresh(database)}
          refreshing={isFetching}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    padding: scale(5),
    backgroundColor: config.color.background,
  },
  listRequest: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: scale(40),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: config.color.gray,
    marginBottom: scale(5),
  },
  iconListRequest: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: scale(40),
    maxHeight: scale(40),
  },
  descListRequest: {
    flex: 4,
    height: scale(40),
    maxHeight: scale(40),
    paddingLeft: scale(8),
    justifyContent: 'center',
  },
  timeListRequest: {
    flex: 1,
    height: scale(40),
    maxHeight: scale(40),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: scale(5),
    paddingBottom: scale(3),
  },
  time: {
    fontSize: config.fontSize.mini,
    color: config.color.common.gray,
  },
});

export default ListRequest;
