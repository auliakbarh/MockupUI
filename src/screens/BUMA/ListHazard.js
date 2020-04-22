import React, {useEffect, useState} from 'react';
import {StatusBar, View, FlatList, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';

import config from '../../config';
import endpoint from '../../config/endpoint';
import * as screenName from '../../router/screenNames';
import styles from './styles/ListHazardStyle';
import EnhancedHazardItem from './observable/ListHazard/EnhancedHazardItem';
import HazardItem from './components/HazardItem';

import {increment} from '../../store/actions/defaultAction';
import Database from '../../database/database';
const db = new Database();

const ListHazard = ({
  database,
  navigation,
  route,
  listHazard,
  increment,
  regular,
}) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const [listDataHazard, setListDataHazard] = useState([]);
  const [page, setPage] = useState(2);
  const [search, setSearch] = useState('');

  const goToDetail = (detail, navigation) => {
    navigation.navigate(screenName.HAZARD_DETAIL_SCREEN, {
      detail: detail.item,
    });
  };

  const fetchListHazardAPI = async () => {
    const result = await fetch(config.api + endpoint.getAllData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 200) {
          return data.data;
        } else {
          return [];
        }
      })
      .catch(e => {
        console.warn(e);
        return [];
      });

    setIsFetching(false);
    return result;
  };

  const fetchListHazard = async () => {
    const listData = await db
      .listData(search, 'DESC', 10000)
      .then(data => {
        setListDataHazard(data);
        console.log('Search =>', search);
        console.log('List Data =>', data);
        console.log('List Data Length =>', data.length);
      })
      .catch(err => {
        console.log(err);
      });

    setIsFetching(false);
    return listData;
  };

  const loadMore = async () => {
    console.log('load more masuk');
    console.log('page => ', page);
    const listData = await db
      .listData(search, 'DESC', 20, page)
      .then(data => {
        setListDataHazard(listDataHazard.concat(data));
        setPage(page + 1);
        console.log('List Data Load More => ', listDataHazard);
        console.log('List Data Length =>', data.length);
      })
      .catch(err => {
        console.log(err);
      });

    setIsFetching(false);
    return listData;
  };

  // const searchData = async (data) => {
  //   console.log('Search data =>', data);
  //   await setSearch(data)
  //   return fetchListHazard()
  // }

  const refresh = () => {
    setIsFetching(true);
    // fetchListHazard()
    // setIsFetching(false);
    return fetchListHazard();
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={config.color.common.darkRed}
      />
      <View style={styles.mainContainer}>
        <View>
          <TextInput
            placeholder={'Search...'}
            onChangeText={text => setSearch(text)}
          />
          <Button
            onPress={() => refresh()}
            // buttonStyle={[styles.buttonSync, {marginTop: scale(5)}]}
            // textStyle={styles.saveButtonText}
            title='Search'
          />
        </View>
        <FlatList
          data={listDataHazard}
          renderItem={item => (
            <HazardItem
              hazards={item.item}
              onPress={() => goToDetail(item, navigation)}
            />
          )}
          keyExtractor={item => item.id}
          onRefresh={() => refresh(database)}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.4}
          refreshing={isFetching}
        />
      </View>
    </>
  );
};

const mapStateToProps = ({regular}) => ({
  regular,
});

const mapDispatchToProps = dispatch => ({
  increment: i => dispatch(increment(i)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListHazard);
