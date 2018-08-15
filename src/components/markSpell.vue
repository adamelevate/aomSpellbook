<template>
  <div class="mark-container">
    {{mark}}
    <v-btn @click="closeCard">close</v-btn>
  </div>
</template>

<script>
export default {
  name: 'markSpell',
  props: ['mark'],
  methods: {
    closeCard(){
      this.$emit('closeCard', 'close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
