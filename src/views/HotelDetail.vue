<template>
  <div>
    <CusNavbar></CusNavbar>
    <SearchBar></SearchBar>
    <Info :idHotel="idHotel"></Info>
    <Room></Room>
  </div>
   
</template>

<script>
import CusNavbar from '../components/CusNavbar'
import SearchBar from '../components/HotelSearch/SearchBar'
import Info from '../components/HotelDetail/Info'
import Room from '../components/HotelDetail/Room'
export default {
  data() {
    return {
      idHotel: this.$route.params.id
    }
  },
  created(){
    console.log(this.$route.params.id)
  },
  components: {
    CusNavbar,
    SearchBar,
    Info,
    Room
  }
}
</script>

<style scoped>

</style>

<style>
  
</style>