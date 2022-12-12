<template>
  <section>
    <div class="summoner">
      <div class="summoner-detail">
        <h2>{{ getSummoner.name }}</h2>
        <p>{{ getSummoner.summonerLevel }}</p>
      </div>
      <div class="rank-detail" v-if="getSoloRank.tier !== ''">
        <p>{{ getSoloRank.tier }} {{ getSoloRank.rank }} {{ getSoloRank.leaguePoints }}LP</p>
        <p>{{ getSoloRank.wins }}승 {{ getSoloRank.losses }}패</p>
        <p>{{ soloRankWinRate }}%</p>
      </div>
      <div class="rank-detail" v-if="getFlexRank.tier !== ''">
        <p>{{ getFlexRank.tier }} {{ getFlexRank.rank }} {{ getFlexRank.leaguePoints }}LP</p>
        <p>{{ getFlexRank.wins }}승 {{ getFlexRank.losses }}패</p>
        <p>{{ flexRankWinRate }}%</p>
      </div>
    </div>
    <div class="matches">
      <ul>
        <li class="match-info" v-for="(match, index) in getMatches" :key="index">
          <p>{{ match.gameMode }}</p>
          <p>{{ match.gameDuration }}</p>
          <ul>
            <li :class="{ 'win': part.win }" v-for="(part, index) in match.participants" :key="index">
              <p>{{ part.teamId }}</p>
              <p>{{ part.summonerName }}({{part.summonerLevel}})</p>
              <p>
                챔피언 이미지
                {{ part.championName }}({{ part.champLevel }})
                {{ part.kills }} / {{ part.deaths }} / {{ part.assists }}
              </p>
              <p>LINE : {{ part.teamPosition }}</p>
              <p>spell :
                {{ part.spell1Casts }}
                {{ part.spell2Casts }}
                {{ part.spell3Casts }}
                {{ part.spell4Casts }}
              </p>
              <p>
                아이템 칸
              </p>
              <p>가한 피해량 : {{ part.totalDamageDealtToChampions }}</p>
              <p>받은 피해량 : {{ part.totalDamageTaken }}</p>
              <p>CS : {{ part.totalMinionsKilled }}</p>
              <p>{{ part.win ? "승리" : "패배" }}</p>
            </li>
          </ul>
          <div class="blue-team-objectives">
            <h4>BLUE TEAM</h4>
            baron : {{ match.teams[0].objectives.baron.kills }}
            dragon : {{ match.teams[0].objectives.dragon.kills }}
            tower : {{ match.teams[0].objectives.tower.kills }}
          </div>
          <div class="purple-team-objectives">
            <h4>PURPLE TEAM</h4>
            baron : {{ match.teams[1].objectives.baron.kills }}
            dragon : {{ match.teams[1].objectives.dragon.kills }}
            tower : {{ match.teams[1].objectives.tower.kills }}
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    methods: {
      ...mapActions("summoner", ["setSummonerInfo"])
    },
    computed: {
      ...mapGetters("summoner", ["getSummoner", "getSoloRank", "getFlexRank", "getMatches"]),
      soloRankWinRate() {
        return Math.round(this.getSoloRank.wins / (this.getSoloRank.wins + this.getSoloRank.losses) * 100);
      },
      flexRankWinRate() {
        return Math.round(this.getFlexRank.wins / (this.getFlexRank.wins + this.getFlexRank.losses) * 100);
      }
    },
    created() {
      this.setSummonerInfo(this.$route.params.id);
    }
  }
</script>

<style>
  section {
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
  }
  .summoner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .summoner-detail {
    width: 20%;
  }
  .rank-detail {
    width: 40%;
  }
  .rank-detail p {
    margin: 10px 0;
  }
</style>
