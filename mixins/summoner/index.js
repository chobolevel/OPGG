import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      'getSummoner': 'summoner/getSummoner',
      'getSoloRank': 'summoner/getSoloRank',
      'getFlexRank': 'summoner/getFlexRank',
      'getMatchIds': 'summoner/getMatchIds',
      'getMatches': 'summoner/getMatches'
    })
  }
}
