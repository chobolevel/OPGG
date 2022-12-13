export const state = () => ({
  summoner: { accountId: "", id: "", name: "", profileIconId: "", puuid: "", revisionDate: "", summonerLevel: ""},
  soloRank: { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" },
  flexRank: { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" },
  matchIds: [],
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
  setMatchIds(state, ids) {
    state.matchIds = ids;
  },
  setMatches(state, matches) {
    state.matches = matches;
  }
};

export const actions = {
  async setSummonerInfo({ commit }, summonername) {
    if(summonername !== null && summonername !== "") {
      const summoner = await this.$axios.get(encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${process.env.RIOT_API_KEY}`));
      if(summoner.status === 200) {
        commit("setSummoner", summoner.data);
      } else {
        commit("setSummoner", { accountId: "", id: "", name: "", profileIconId: "", puuid: "", revisionDate: "", summonerLevel: ""});
      }
    } else {
      commit("setSummoner", { accountId: "", id: "", name: "", profileIconId: "", puuid: "", revisionDate: "", summonerLevel: ""});
    }
  },
  async setLeagueInfo({commit}, id) {
    if(id !== null && id !== "") {
      const league = await this.$axios.get(encodeURI(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`));
      if(league.status === 200) {
        if(league.data.length  === 2) {
          commit("setSoloRank", league.data[0]);
          commit("setFlexRank", league.data[1]);
        } else if(league.data.length === 1) {
          commit("setSoloRank", league.data[0]);
          commit("setFlexRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
        }
      } else {
        commit("setSoloRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
        commit("setFlexRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
      }
    } else {
      commit("setSoloRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
      commit("setFlexRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
    }
  },
  async setMatchInfo({commit}, puuid) {
    if(puuid !== null && puuid !== "") {
      const matchData = await this.$axios.get(encodeURI(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.RIOT_API_KEY}`));
      if(matchData.status === 200) {
        commit("setMatchIds", matchData.data);
      } else {
        commit("setMatchIds", []);
      }
    } else {
      commit("setMatchIds", []);
    }
  },
  async setMatches({commit}, matchIds) {
    let matches = [];
    if(matchIds.length !== 0) {
      for(let i=0; i<matchIds.length; i++) {
        let matchId = matchIds[i];
        let match = await this.$axios.get(encodeURI(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`));
        matches.push(match.data.info);
      }
      commit("setMatches", matches);
    } else {
      commit("setMatches", []);
    }
  },
  setAllClear({commit}) {
    commit("setSummoner", { accountId: "", id: "", name: "", profileIconId: "", puuid: "", revisionDate: "", summonerLevel: ""});
    commit("setSoloRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
    commit("setFlexRank", { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" });
    commit("setMatchIds", []);
    commit("setMatches", []);
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
  getMatchIds(state) {
    return state.matchIds;
  },
  getMatches(state) {
    return state.matches;
  }
};
