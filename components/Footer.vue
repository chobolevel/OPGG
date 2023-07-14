<template>
  <footer>
    <p>&copy; <span>{{ currentYear }}</span> OP.GG</p>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style>
 footer {
   width: 100%;
   max-width: 1200px;
   padding: 100px 20px;
   margin: 0 auto;
   text-align: center;
 }
  footer p {
    font-size: 20px;
    font-weight: bold;
  }
</style>
