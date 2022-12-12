<template>
  <section>
    <img class="main-img"
      src="https://opgg-static.akamaized.net/logo/20221205205756.a5ef964a42ca44b69cacc12b769d6c5a.png?image=q_auto,f_webp,w_auto&v=1670665277508">
    <form @submit="handleSubmit" class="search-form">
      <input type="text" name="summonername" v-model="summonername" placeholder="소환사 닉네임을 입력하세요."><br>
      <button type="submit">.GG</button>
    </form>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        summonername: ""
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        if (this.summonername !== null && this.summonername !== "") {
          this.$router.push(`/summoner/${this.summonername}`);
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
