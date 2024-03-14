import React, { useState } from 'react' ;
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { TeamController } from '../Controller/TeamController';
import TeamModel from '../Model/TeamModel';

export function Home() {
  const [team, setTeam] = useState<string>("");
  const [conference, setConference] = useState<string>("");
  const [teams, setTeams] = useState<TeamModel[]>([]);

const hendleSearch = () => {
  console.log(`Conference: ${conference}, Team: ${team}`);
  try{
    TeamController.fetchTeam(conference, team).then(() => {
      setTeams([...TeamController.getTeams()]);
    })
  } catch (error) {
    console.log("Error fetching: ", error);
  }
}

  return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center", paddingTop: 50}}>
      <TextInput 
        style={{width:"95%", height:40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5}}
        placeholder="Conferencia..."
        onChangeText={text => setConference(text)}
        value={conference}
      />
      <TextInput 
        style={{width:"95%", height:40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 5}}
        placeholder="Time..."
        onChangeText={text => setTeam(text)}
        value={team}
      />
      <Text
        style={{width:"95%", height:40, marginBottom: 10, padding: 5}}>
        API Host: {`${process.env.EXPO_PUBLIC_API_HOST}:${process.env.EXPO_PUBLIC_API_PORT}`}
      </Text>
      <Button title="Buscar" onPress={hendleSearch} />

      <FlatList 
        data={teams}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{marginTop: 40}}>
            <Text> Name: {item.name}</Text>
            <Text> Conference: {item.conference}</Text>
            <Text> FullName: {item.fullName}</Text>
            <Text> Abrev: {item.abbreviation}</Text>
          </View>
        )}
      />
    </View>
  );
}