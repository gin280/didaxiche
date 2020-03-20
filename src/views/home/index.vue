<template>
  <div class="overall" @click="aaa">
    首页
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        aaa() {
            console.log(this.$store)
        }
    }
}
</script>

<style lang="scss" scoped>
.overall {
  display: flex;
  justify-content: space-evenly;
}
</style>
