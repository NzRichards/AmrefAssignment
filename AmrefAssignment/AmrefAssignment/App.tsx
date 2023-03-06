import React from 'react';
import {SafeAreaView, TextInput, Button, ScrollView} from 'react-native';
import {DataTable, ActivityIndicator, MD2Colors} from 'react-native-paper';

type Person = {
  _id: string;
  NAME: string;
  SURNAME: string;
  AGE: number;
  CITY: string;
};

const App = () => {
  const fetchData = async () => {
    setProgressStatus('Loading');
    setData([]);
    const response = await fetch(
      'https://exercise-b342.restdb.io/rest/group-1',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': '63722be4c890f30a8fd1f370',
          'cache-control': 'no-cache',
        },
      },
    );
    const dataFromApi = await response.json();
    setProgressStatus('Not Loading');
    setData(dataFromApi);
  };

  const filterByCityName = (enteredText: string) => {
    setSearchText(enteredText);
    if (data.length === 0) {
      return;
    }

    const filteredData = data.filter((person: Person) =>
      person.CITY.includes(enteredText),
    );
    setData(filteredData);
  };

  const [data, setData] = React.useState<Person[]>([]);
  const [progressStatus, setProgressStatus] = React.useState('Not Loading');
  const [searchText, setSearchText] = React.useState<string>();

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          placeholder="Search by City"
          onChangeText={filterByCityName}
        />
        <Button title="Fetch Data" onPress={fetchData} />
        {progressStatus === 'Loading' && (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Surname</DataTable.Title>
            <DataTable.Title>Age</DataTable.Title>
            <DataTable.Title>City</DataTable.Title>
          </DataTable.Header>
          {data.length === 0 && progressStatus === 'Not Loading' && (
            <DataTable.Row>
              <DataTable.Cell>
                No Data, Please click the button to fetch the Data
              </DataTable.Cell>
            </DataTable.Row>
          )}
          {data.map((person: Person) => (
            <DataTable.Row key={person._id}>
              <DataTable.Cell>{person.NAME}</DataTable.Cell>
              <DataTable.Cell>{person.SURNAME}</DataTable.Cell>
              <DataTable.Cell>{person.AGE}</DataTable.Cell>
              <DataTable.Cell>{person.CITY}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
