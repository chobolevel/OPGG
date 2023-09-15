<template>
      <div class="summoner">
        <div class="summoner-detail">
          <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/${summoner.profileIconId}.png`" alt="소환사 아이콘 이미지">
          <h2>{{ summoner.name }}</h2>
          <p>{{ summoner.summonerLevel }}</p>
        </div>
        <Rank :rank="getSoloRank"/>
        <Rank :rank="getFlexRank"/>
      </div>
</template>

<script>
import {mapGetters} from "vuex";
import Rank from "./Rank.vue";

export default {
    components: {Rank},
    props: {
      summoner: Object
    },
    computed: {
      ...mapGetters("summoner", ["getSummoner", "getSoloRank", "getFlexRank", "getMatchIds", "getMatches"]),
    }
  }
</script>
