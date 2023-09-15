<template>
  <section>
    <div class="not-found" v-if="getSummoner.name === ''">
      ❌ Sorry Not Found ❌
    </div>
    <Summoner v-else :summoner="getSummoner"/>
    <div class="loading" v-if="getMatches.length === 0 && getSummoner.name !== ''">
      Loading...
    </div>
    <div class="matches" v-else>
      <ul>
        <MatchList v-for="(match, index) in getMatches" :key="index" :match="match"/>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SummonerMixins} from "~/mixins";
import Summoner from "../../components/summoner/Summoner.vue";
import MatchList from "../../components/match/MatchList.vue";

export default {
  components: {MatchList, Summoner},
  middleware: "search",
  mixins: [SummonerMixins],
  async asyncData({store, route}) {
    await store.dispatch('summoner/setSummonerInfo', route.params.id)
    await store.dispatch('summoner/setLeagueInfo', store.getters["summoner/getSummoner"].id)
    await store.dispatch('summoner/setMatchInfo', store.getters["summoner/getSummoner"].puuid)
    await store.dispatch('summoner/setMatches', store.getters["summoner/getMatchIds"])
  },
  methods: {
    ...mapActions("summoner", ["setSummonerInfo", "setLeagueInfo", "setMatchInfo", "setMatches"]),
    handleOpen(index) {
      const opener = document.querySelector(".opener");
      const match = Array.from(document.querySelectorAll(`#match${index}`));
      match.forEach((mat) => {
        mat.classList.toggle("show");
      });
      if (opener.innerText === "open") {
        opener.innerText = "close";
      } else {
        opener.innerText = "open";
      }
    }
  },
  computed: {
    ...mapGetters("summoner", ["getSummoner", "getSoloRank", "getFlexRank", "getMatchIds", "getMatches"])
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

.not-found {
  padding: 80px 0;
  font-size: 20px;
  font-weight: bold;
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

.summoner-detail h2 {
  margin-bottom: 10px;
}

.summoner-detail p {
  display: inline-block;
  padding: 3px 5px;
  border-radius: 10px;
  background-color: #333;
}

.summoner-detail img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
}

.loading {
  padding: 80px 0;
  font-size: 20px;
  font-weight: bold;
}

.rank-detail {
  width: 40%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.rank-detail img {
  width: 100px;
  margin-right: 30px;
}

.rank-detail div p {
  margin: 10px 0;
}

.match-info {
  border-radius: 10px;
  margin-bottom: 10px;
}

.match-desc {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px 10px 0 0;
}

.match-desc span {
  color: #222;
  font-weight: bold;
}

.match-desc span {
  margin: 0 30px;
}

.match-info ul li {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(255, 0, 0, 0.4);
}

.champ-img {
  width: 60px;
  border-radius: 50%;
}

.match-info ul li.my-match-info {
  background-color: rgba(255, 0, 0, 0.3);
}

.match-info ul li.my-match-info.victory {
  background-color: rgba(0, 0, 255, 0.3);
}

.match-info ul li.my-match-info .opener {
  width: 50px;
  cursor: pointer;
}

.match-info ul li div {
  padding: 0 10px;
}

.match-info ul li div.stat {
  font-size: 14px;
}

.match-info ul li div.dealing {
  font-size: 16px;
}

.match-info ul li div.items img {
  object-fit: cover;
  width: 50px;
}

.match-info ul li.show {
  display: none;
}

.match-info ul li.win {
  background-color: rgba(0, 0, 255, 0.4);
}

.objectives {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
}

.objectives div {
  padding: 20px;
  width: 50%;
  background-color: #eee;
}

.blue-team-objectives {
  border-radius: 0 0 0 10px;
}

.blue-team-objectives h4 {
  color: blue;
}

.purple-team-objectives {
  border-radius: 0 0 10px 0;
}

.purple-team-objectives h4 {
  color: red;
}

.objectives div span {
  color: #222;
  font-weight: bold;
  padding: 0 5px;
}
</style>
