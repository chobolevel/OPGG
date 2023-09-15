<template>
  <li class="match-info">
    <div class="match-desc">
            <span class="match-type">
              {{ match.gameMode }}
            </span>
      <span class="match-duration">{{ formatDate(match.gameStartTimestamp, match.gameEndTimestamp) }}</span>
    </div>
    <ul>
      <li v-for="(part, index) in match.participants" v-if="part.summonerName === getSummoner.name" :key="part.summonerId + String(index)"
          :class="{ 'victory' : part.win }" class="my-match-info">
        <p>{{ part.win ? "승리" : "패배" }}</p>
        <PlayerDetail :player="part"/>
        <div class="opener" @click="handleOpen(match.gameId)">
          open
        </div>
      </li>
      <li v-for="(part, index) in match.participants" :id="'match' + match.gameId" :key="String(index) + part.summonerId" :class="{ 'win': part.win }"
          class="show">
        <PlayerDetail :player="part"/>
      </li>
    </ul>
    <div class="objectives">
      <ObjectiveDetail :is-blue="true" :match="match.teams[0]"/>
      <ObjectiveDetail :is-blue="false" :match="match.teams[1]"/>
    </div>
  </li>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Item from "../item/Item.vue";
import PlayerDetail from "../player/PlayerDetail.vue";
import ObjectiveDetail from "../objective/ObjectiveDetail.vue";

export default {
  components: {ObjectiveDetail, PlayerDetail, Item},
  props: {
    match: Object
  },
  methods: {
    ...mapActions("summoner", ["setSummonerInfo", "setLeagueInfo", "setMatchInfo", "setMatches"]),
    formatDate(start, end) {
      const dur = new Date(end - start);
      return dur.getMinutes() + "분 " + dur.getSeconds() + "초";
    },
    handleOpen(gameId) {
      const matchedPlayers = document.querySelectorAll(`#match${gameId}`)
      Array.from(matchedPlayers).forEach((player) => {
        player.classList.toggle("show")
      })
    }
  },
  computed: {
    ...mapGetters("summoner", ["getSummoner", "getSoloRank", "getFlexRank", "getMatchIds", "getMatches"])
  }
}
</script>
