<template>
  <div v-if="rank.tier !== ''" class="rank-detail">
    <img :src="require(`@/static/img/ranked-emblems/Emblem_${rank.tier}.png`)" alt="솔로랭크 티어 이미지">
    <div>
      <p>{{ rankDetail }}</p>
      <p>{{ rankWinAndLose }}</p>
      <p>{{ winRate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rank: Object
  },
  computed: {
    rankDetail() {
      return `${this.rank.tier} ${this.rank.rank} ${this.rank.leaguePoints}LP`
    },
    rankWinAndLose() {
      return `${this.rank.wins}승 ${this.rank.losses}패`
    },
    winRate() {
      return `승률 ${Math.round(this.rank.wins / (this.rank.wins + this.rank.losses) * 100)}%`
    }
  }
}
</script>
