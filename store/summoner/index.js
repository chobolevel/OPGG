export const state = () => ({
  summoner: { accountId: "", id: "", name: "", profileIconId: "", puuid: "", revisionDate: "", summonerLevel: ""},
  soloRank: { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" },
  flexRank: { freshBlood: "", hotStreak: "", inactive: "", leagueId: "", leaguePoints: "", losses: "", queueType: "", rank: "", summonerId: "", summonerName: "", tier: "", veteran: "", wins: "" },
  matchIds: [],
  matches: []
});

export const mutations = {
  setSummoner(state, summoner) {
    state.summoner = summoner;
  },
  setSoloRank(state, soloRank) {
    state.soloRank = soloRank;
  },
  setFlexRank(state, flexRank) {
    state.flexRank = flexRank;
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
      const summoner = await this.$axios.get(encodeURI(`krApi/lol/summoner/v4/summoners/by-name/${summonername}?api_key=${process.env.RIOT_API_KEY}`));
      if(summoner.status === 200) {
        commit("setSummoner", summoner.data);
      }
    }
  },
  async setLeagueInfo({commit}, id) {
    if(id !== null && id !== "") {
      const league = await this.$axios.get(encodeURI(`krApi/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`));
      if(league.status === 200) {
        const soloRank = league.data.find((rankInfo) => rankInfo.queueType === 'RANKED_SOLO_5x5')
        const flexRank = league.data.find((rankInfo) => rankInfo.queueType === 'RANKED_FLEX_SR')
        if(soloRank) {
          commit('setSoloRank', soloRank)
        }
        if(flexRank) {
          commit('setFlexRank', flexRank)
        }
      }
    }
  },
  async setMatchInfo({commit, getters}, puuid) {
    if(puuid !== null && puuid !== "") {
      const matchIdCnt = getters.getMatchIds.length
      if(matchIdCnt === 0) {
        const matchData = await this.$axios.get(encodeURI(`asiaApi/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.RIOT_API_KEY}`));
        if(matchData.status === 200) {
          commit("setMatchIds", matchData.data);
        }
      } else {
        const matchData = await this.$axios.get(encodeURI(`asiaApi/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${matchIdCnt}&count=10&api_key=${process.env.RIOT_API_KEY}`));
        if(matchData.status === 200) {
          commit('setMatchIds', [...getters.getMatchIds, ...matchData.data])
        }
      }
    }
  },
  async setMatches({commit, getters}, matchIds) {
    const matches = [];
    if(matchIds.length !== 0 && matchIds.length === 10) {
      for(let i=0; i<matchIds.length; i++) {
        const matchId = matchIds[i];
        const match = await this.$axios.get(encodeURI(`asiaApi/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`));
        matches.push(match.data.info);
      }
      commit("setMatches", matches);
    } else {
      for(let i = matchIds.length - 10; i < matchIds.length; i++) {
        const matchId = matchIds[i]
        const match = await this.$axios.get(encodeURI(`asiaApi/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`));
        matches.push(match.data.info)
      }
      commit("setMatches", [...getters.getMatches, ...matches])
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
