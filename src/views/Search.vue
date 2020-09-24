<template>
<div>
    <div v-for="(h,index) in hotel" :key="index">
    <h1>{{h.country}}</h1>
    <h2>{{h.number}}</h2>
    </div>
</div>

  
</template>

<script>
export default {
  data(){
    return {

    }
  },
  mounted(){
    console.log(this.hotel)
  },
  computed: {
    hotel(){
       return this.$store.state.hotel
    }
  }
}
</script>