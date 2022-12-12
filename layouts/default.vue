<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <nuxt/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Nav from "../components/Nav.vue"
import Footer from "../components/Footer.vue"

export default {
  components: {
    Header,
    Nav,
    Footer
  }
}
</script>


<style>
* {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: white;
  box-sizing: border-box;
}
body {
  background-color: #5383E8;
}
</style>

