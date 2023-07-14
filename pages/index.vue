<template>
  <section>
    <img :src="require('../static/img/basic/main.jpg')" alt="가렌의 심판" class="main-img">
    <form @submit="handleSubmit" class="search-form">
      <input v-model="summonerName" name="summonerName" placeholder="소환사 닉네임을 입력하세요." type="text"><br>
      <button type="submit">.GG</button>
    </form>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        summonerName: ""
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        if (this.summonerName !== null && this.summonerName !== "") {
          this.$router.push(`/summoner/${this.summonerName}`);
        }
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
    text-align: center;
  }
  .main-img {
    width: 400px;
    margin: 50px 0;
  }
  .search-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-form input {
    width: 600px;
    height: 60px;
    border-radius: 10000px 0 0 10000px;
    padding-left: 40px;
    border: none;
    color: #222;
    font-size: 18px;
  }
  .search-form input:focus {
    outline: none;
  }
  .search-form button {
    all: unset;
    width: 100px;
    height: 60px;
    background-color: white;
    border-radius: 0 10000px 10000px 0;
    color: #5383E8;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
</style>
