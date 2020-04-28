import React from 'react';
import {StatusBar, View, FlatList} from 'react-native';
import {connect} from 'react-redux';

import config from '../../config';
import endpoint from '../../config/endpoint';
import * as screenName from '../../router/screenNames';
import styles from './styles/ListHazardStyle';
import EnhancedHazardItem from './observable/ListHazard/EnhancedHazardItem';

import {increment} from '../../store/actions/defaultAction';

const ListHazard = ({database, navigation, route, increment, regular}) => {
  const [isFetching, setIsFetching] = React.useState(true);
  const [listHazard, setListHazard] = React.useState([]);

  const goToDetail = (detail, navigation) => {
    console.log('detail', detail.item);
    console.log('detail id', detail.item.id);

    database.write(() => {
      // database.create('Hazard', {...detail.item, judulHazard: 'TEST'}, 'modified');
      detail.item.judulHazard = 'TEST';
    })

    // navigation.navigate(screenName.HAZARD_DETAIL_SCREEN, {
    //   detail: detail.item,
    // });
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

  const refresh = async database => {
    setIsFetching(true);
    // subscribeHazardList(database);
    setIsFetching(false);
    return null;
  };

  const subscribeHazardList = (database) => {
    const listHazard =  database.objects('Hazard').sorted('waktuLaporan', true);

    function listener(hazard, changes) {
      console.log('hazard in listener', hazard)
      console.log('changes in listener', changes)
      setIsFetching(true);
      setListHazard(hazard);
      setIsFetching(false);

      // Update UI in response to inserted objects
      changes.insertions.forEach((index) => {
        let insertedHazard = hazard[index];
        console.log('insertedHazard', insertedHazard)
      });

      // Update UI in response to modified objects
      changes.modifications.forEach((index) => {
        let modifiedHazard = hazard[index];
        console.log('modifiedHazard', modifiedHazard)
      });

      // Update UI in response to deleted objects
      changes.deletions.forEach((index) => {
        // Deleted objects cannot be accessed directly
        // Support for accessing deleted objects coming soon...
        console.log('deleted')
      });

    }
    listHazard.addListener(listener);

    return [listHazard, listener];
  }

  const getHazard = database => {
    const listHazard =  database.objects('Hazard');
    setListHazard(listHazard);
    return listHazard
  }

  React.useEffect(() => {
    const sub = subscribeHazardList(database);
    return () => {
      console.log('UNMOUNTED', sub);
      sub[0].removeListener(sub[1]);
      database.removeAllListeners();
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={config.color.common.darkRed}
      />
      <View style={styles.mainContainer}>
        <FlatList
          data={listHazard}
          renderItem={item => (
            <EnhancedHazardItem
              database={database}
              hazards={item.item}
              onPress={() => goToDetail(item, navigation)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          onRefresh={() => refresh(database)}
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
