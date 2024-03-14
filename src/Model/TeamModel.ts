export default class TeamModel{
  id: number;
  name: string;
  conference: string;
  fullName: string;
  abbreviation: string;
  
  constructor (id: number, name: string, conference: string, fullName: string, abbreviation: string) {    
    this.id = id;
    this.name = name;
    this.conference = conference;
    this.fullName = fullName;
    this.abbreviation = abbreviation;
  }
}
