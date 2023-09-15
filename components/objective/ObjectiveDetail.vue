<template>
  <div :class="{'blue-team-objectives': isBlue, 'purple-team-objectives': !isBlue }">
    <h4>{{ isBlue ? "파란 팀" : "퍼플 팀"}}</h4>
    <span>
      <img :src=baronImg alt="바론">
        {{ match.objectives.baron.kills }}
    </span>
    <span>
      <img :src="dragonImg" alt="드래곤">
        {{ match.objectives.dragon.kills }}
    </span>
    <span>
      <img :src="towerImg" alt="타워">
        {{ match.objectives.tower.kills }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    match: Object,
    isBlue: Boolean
  },
  computed: {
    baronImg() {
      if(this.isBlue) {
        return "https://s-lol-web.op.gg/images/icon/icon-baron.svg?v=1689224069050"
      } else {
        return "https://s-lol-web.op.gg/images/icon/icon-baron-r.svg?v=1689224069050"
      }
    },
    dragonImg() {
      if(this.isBlue) {
        return "https://s-lol-web.op.gg/images/icon/icon-dragon.svg?v=1689224069050"
      } else {
        return "https://s-lol-web.op.gg/images/icon/icon-dragon-r.svg?v=1689224069050"
      }
    },
    towerImg() {
      if(this.isBlue) {
        return "https://s-lol-web.op.gg/images/icon/icon-tower.svg?v=1689224069050"
      } else {
        return "https://s-lol-web.op.gg/images/icon/icon-tower-r.svg?v=1689224069050"
      }
    }
  }
}
</script>
