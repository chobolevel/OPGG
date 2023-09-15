<template>
  <div v-if="rank.tier !== ''" class="rank-detail">
    <img :src="require(`@/static/img/ranked-emblems/Emblem_${rank.tier}.png`)" alt="솔로랭크 티어 이미지">
    <div>
      <p>{{ rank.tier }} {{ rank.rank }} {{ rank.leaguePoints }}LP</p>
      <p>{{ rank.wins }}승 {{ rank.losses }}패</p>
      <p>승률 : {{ winRate }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rank: Object
  },
  computed: {
    winRate() {
      return Math.round(this.rank.wins / (this.rank.wins + this.rank.losses) * 100);
    }
  }
}
</script>
