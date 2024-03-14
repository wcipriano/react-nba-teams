import TeamModel from "../Model/TeamModel";

export class TeamController {
  static teams: TeamModel[] = [];

  static async  fetchTeam(conference?:string, team?:string):Promise<void> {
    try {
      conference = conference ? conference : "";
      team = team ? team : "";
      const host = `${process.env.EXPO_PUBLIC_API_HOST}:${process.env.EXPO_PUBLIC_API_PORT}`;
      //host = "http://192.168.1.110:5050";
      const endpoint = "/api/Nba/teams";
      const url = `${host}${endpoint}?conference=${conference}&team=${team}`
      console.log("url: ", url);
      const response = await fetch(url);
      const data = await response.json();
      if(!data.erro) {
        for (let i=0; i<data.length; i++) {
          var teamObj = new TeamModel(data[i].id, data[i].name, data[i].conference, data[i].fullName, data[i].abbreviation);
          this.teams.push(teamObj);
        }
      } else {
        console.log("Team not found: ", data.erro);
      }
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  }

  static getTeams(): TeamModel[] {
    return this.teams;
  }
}