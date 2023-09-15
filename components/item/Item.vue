<template>
  <img :src="`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${item}.png`"
       alt="아이템 이미지" @error="defaultItemImg">
</template>

<script>
export default {
  props: {
    item: Number
  },
  methods: {
    defaultItemImg(e) {
      e.target.src = 'http://via.placeholder.com/50x50'
    }
  }
}
</script>
