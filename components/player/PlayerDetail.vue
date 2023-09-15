<template>
  <div class="player-detail">
    <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${player.championName}.png`"
         alt="챔피언 이미지" class="champ-img">
    <div class="stat">
      <nuxt-link :to="`/summoner/${player.summonerName}`">{{ player.summonerName }}</nuxt-link>
      <p>{{ kdaStat }}
        ({{ kda }})</p>
      <p>{{ totalMinionsKilled }}
        ({{ minionsKilledPerMinute }})</p>
      <!--                <span v-if="part.teamPosition !== ''">라인 : {{ part.teamPosition }}</span>-->
    </div>
    <div class="dealing">
      <p>가한 피해량 : {{ player.totalDamageDealtToChampions | comma }}</p>
      <p>받은 피해량 : {{ player.totalDamageTaken | comma }}</p>
    </div>
    <div class="items">
      <Item :item="player.item0"/>
      <Item :item="player.item1"/>
      <Item :item="player.item2"/>
      <Item :item="player.item3"/>
      <Item :item="player.item4"/>
      <Item :item="player.item5"/>
    </div>
  </div>
</template>

<script>
import Item from "../item/Item.vue";

export default {
  components: {Item},
  props: {
    player: Object,
    takenMinutes: Number
  },
  computed: {
    kdaStat() {
      return `${this.player.kills}/${this.player.deaths}/${this.player.assists}`
    },
    kda() {
      if(this.player.deaths === 0) {
        return 'Perfect'
      } else {
        return Math.round((this.player.kills + this.player.assists) / this.player.deaths * 100) / 100
      }
    },
    totalMinionsKilled() {
      return this.player.totalMinionsKilled + this.player.neutralMinionsKilled
    },
    minionsKilledPerMinute() {
      return this.player.totalMinionsKilled + this.player.neutralMinionsKilled
    }
  }
}
</script>

<style>
.player-detail {
  display: flex;
  flex-direction: row;
}
</style>
