export const state = () => ({
  summoner: { accountId: "", id: "", name: "", profileIconId: "", puuid: "", revisionDate: "", summonerLevel: ""},
  soloRank: { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" },
  flexRank: { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" },
  matches: []
});

export const mutations = {
  setSummoner(state, { accountId, id, name, profileIconId, puuid, revisionDate, summonerLevel }) {
    state.summoner = { accountId, id, name, profileIconId, puuid, revisionDate, summonerLevel };
  },
  setSoloRank(state, {freshBlood, hotStreak, inactive, leagueId, leaguePoints, losses, queueType, rank, summonerId, summonerName, tier, veteran, wins}) {
    state.soloRank = {freshBlood, hotStreak, inactive, leagueId, leaguePoints, losses, queueType, rank, summonerId, summonerName, tier, veteran, wins};
  },
  setFlexRank(state, {freshBlood, hotStreak, inactive, leagueId, leaguePoints, losses, queueType, rank, summonerId, summonerName, tier, veteran, wins}) {
    state.flexRank = {freshBlood, hotStreak, inactive, leagueId, leaguePoints, losses, queueType, rank, summonerId, summonerName, tier, veteran, wins};
  },
  setMatches(state, matches) {
    state.matches = matches;
  }
};

export const actions = {
  async setSummonerInfo({ commit }, summonername) {
    const summoner = await this.$axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${process.env.RIOT_API_KEY}`);
    commit("setSummoner", summoner.data);
    const league = await this.$axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.data.id}?api_key=${process.env.RIOT_API_KEY}`);
    if(league.data.length  === 2) {
      commit("setSoloRank", league.data[0]);
      commit("setFlexRank", league.data[1]);
    } else if(league.data.length === 1) {
      commit("setSoloRank", league.data[0]);
      commit("setFlexRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
    }
    const matchData = await this.$axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.data.puuid}/ids?start=0&count=20&api_key=${process.env.RIOT_API_KEY}`);
    let matches = [];
    for(let i=0; i<matchData.data.length; i++) {
      let matchId = matchData.data[i];
      let match = await this.$axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`);
      matches.push(match.data.info);
    }
    commit("setMatches", matches);
  }
};

export const getters = {
  getSummoner(state) {
    return state.summoner;
  },
  getSoloRank(state) {
    return state.soloRank;
  },
  getFlexRank(state) {
    return state.flexRank;
  },
  getMatches(state) {
    return state.matches;
  }
};
