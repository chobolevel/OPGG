<template>
  <section>
    <div class="not-found" v-if="getSummoner.name === ''">
      ❌ Sorry Not Found ❌
    </div>
    <div class="summoner" v-else>
      <div class="summoner-detail">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/profileicon/${getSummoner.profileIconId}.png`">
        <h2>{{ getSummoner.name }}</h2>
        <p>{{ getSummoner.summonerLevel }}</p>
      </div>
      <div class="rank-detail" v-if="getSoloRank.tier !== ''">
        <img :src="require(`@/static/img/ranked-emblems/Emblem_${getSoloRank.tier}.png`)">
        <div>
          <p>{{ getSoloRank.tier }} {{ getSoloRank.rank }} {{ getSoloRank.leaguePoints }}LP</p>
          <p>{{ getSoloRank.wins }}승 {{ getSoloRank.losses }}패</p>
          <p>승률 : {{ soloRankWinRate }}%</p>
        </div>
      </div>
      <div class="rank-detail" v-if="getFlexRank.tier !== ''">
        <img :src="require(`@/static/img/ranked-emblems/Emblem_${getFlexRank.tier}.png`)">
        <div>
          <p>{{ getFlexRank.tier }} {{ getFlexRank.rank }} {{ getFlexRank.leaguePoints }}LP</p>
          <p>{{ getFlexRank.wins }}승 {{ getFlexRank.losses }}패</p>
          <p>승률 : {{ flexRankWinRate }}%</p>
        </div>
      </div>
    </div>
    <div class="loading" v-if="getMatches.length === 0 && getSummoner.name !== ''">
      Loading...
    </div>
    <div class="matches" v-else>
      <ul>
        <li class="match-info" v-for="(match, index) in getMatches" :key="index">
          <div class="match-desc">
            <span class="match-type">
              {{ match.gameMode }}
            </span>
            <span class="match-duration">{{ formatDate(match.gameStartTimestamp, match.gameEndTimestamp)}}</span>
          </div>
          <ul>
            <li class="my-match-info" :class="{ 'victory' : part.win }" v-for="(part) in match.participants" :key="part.summonerName" v-if="part.summonerName === getSummoner.name">
              <p>{{ part.win ? "승리" : "패배"}}</p>
              <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${part.championName}.png`" class="champ-img">
              <div class="stat">
                <nuxt-link :to="`/summoner/${part.summonerName}`">{{ part.summonerName }}</nuxt-link>
                <p>{{ part.kills }} / {{ part.deaths }} / {{ part.assists }} ({{ Math.round((part.kills + part.assists) / part.deaths * 100) / 100 }})</p>
                <p>{{ part.totalMinionsKilled + part.neutralMinionsKilled }} ({{ (part.totalMinionsKilled + part.neutralMinionsKilled) }})</p>
<!--                <span v-if="part.teamPosition !== ''">라인 : {{ part.teamPosition }}</span>-->
              </div>
              <div class="dealing">
                <p>가한 피해량 : {{ part.totalDamageDealtToChampions | comma }}</p>
                <p>받은 피해량 : {{ part.totalDamageTaken | comma }}</p>
              </div>
              <div class="items">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item0}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item1}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item2}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item3}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item4}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item5}.png`" @error="defaultItemImg">
              </div>
              <div class="opener" @click="handleOpen(index)">
                open
              </div>
            </li>
            <li class="show" :class="{ 'win': part.win }" v-for="(part) in match.participants" :key="part.summonerId" :id="'match' + index">
              <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${part.championName}.png`" class="champ-img">
              <div class="stat">
                <nuxt-link :to="`/summoner/${part.summonerName}`">{{ part.summonerName }}</nuxt-link>
                <p>{{ part.kills }} / {{ part.deaths }} / {{ part.assists }} (cs : {{ part.totalMinionsKilled + part.neutralMinionsKilled }})</p>
                <span v-if="part.teamPosition !== ''">LINE : {{ part.teamPosition }}</span>
              </div>
              <div class="dealing">
                <p>가한 피해량 : {{ part.totalDamageDealtToChampions | comma }}</p>
                <p>받은 피해량 : {{ part.totalDamageTaken | comma }}</p>
              </div>
              <div class="items">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item0}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item1}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item2}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item3}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item4}.png`" @error="defaultItemImg">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${part.item5}.png`" @error="defaultItemImg">
              </div>
            </li>
          </ul>
          <div class="objectives">
            <div class="blue-team-objectives">
              <h4>파란 팀</h4>
              <span>
                <img src="https://s-lol-web.op.gg/images/icon/icon-baron.svg?v=1689224069050" alt="바론"> {{ match.teams[0].objectives.baron.kills }}
              </span>
              <span>
                <img src="https://s-lol-web.op.gg/images/icon/icon-dragon.svg?v=1689224069050" alt="드래곤"> {{ match.teams[0].objectives.dragon.kills }}
              </span>
              <span>
                <img src="https://s-lol-web.op.gg/images/icon/icon-tower.svg?v=1689224069050" alt="타워"> {{ match.teams[0].objectives.tower.kills }}
              </span>
            </div>
            <div class="purple-team-objectives">
              <h4>퍼플 팀</h4>
              <span>
                <img src="https://s-lol-web.op.gg/images/icon/icon-baron-r.svg?v=1689224069050" alt="바론"> {{ match.teams[1].objectives.baron.kills }}
              </span>
              <span>
                <img src="https://s-lol-web.op.gg/images/icon/icon-dragon-r.svg?v=1689224069050" alt="드래곤"> {{ match.teams[1].objectives.dragon.kills }}
              </span>
              <span>
                <img src="https://s-lol-web.op.gg/images/icon/icon-tower-r.svg?v=1689224069050" alt="타워"> {{ match.teams[1].objectives.tower.kills }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SummonerMixins} from "~/mixins";

export default {
    middleware: "search",
    mixins: [SummonerMixins],
    async asyncData({ store, route }) {
      await store.dispatch('summoner/setSummonerInfo', route.params.id)
      await store.dispatch('summoner/setLeagueInfo', store.getters["summoner/getSummoner"].id)
      await store.dispatch('summoner/setMatchInfo', store.getters["summoner/getSummoner"].puuid)
      await store.dispatch('summoner/setMatches', store.getters["summoner/getMatchIds"])
    },
    methods: {
      ...mapActions("summoner", ["setSummonerInfo", "setLeagueInfo", "setMatchInfo", "setMatches"]),
      formatDate(start, end) {
        const dur = new Date(end - start);
        return dur.getMinutes() + "분 " + dur.getSeconds() + "초";
      },
      handleOpen(index) {
        const opener = document.querySelector(".opener");
        const match = Array.from(document.querySelectorAll(`#match${index}`));
        match.forEach((mat) => {
          mat.classList.toggle("show");
        });
        if(opener.innerText === "open") {
          opener.innerText = "close";
        } else {
          opener.innerText = "open";
        }
      },
      defaultItemImg(e) {
        e.target.src = ''
      }
    },
    computed: {
      ...mapGetters("summoner", ["getSummoner", "getSoloRank", "getFlexRank", "getMatchIds", "getMatches"]),
      soloRankWinRate() {
        return Math.round(this.getSoloRank.wins / (this.getSoloRank.wins + this.getSoloRank.losses) * 100);
      },
      flexRankWinRate() {
        return Math.round(this.getFlexRank.wins / (this.getFlexRank.wins + this.getFlexRank.losses) * 100);
      }
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
