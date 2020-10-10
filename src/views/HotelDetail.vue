<template>
  <div>
    <CusNavbar></CusNavbar>
    <SearchBar></SearchBar>
    <Info :idHotel="idHotel"></Info>
    <Room v-for="room in hotel.rooms" :key="room.id" :room="room"></Room>
    <HotelReviews :idHotel="idHotel"></HotelReviews>
    
  </div>
   
</template>

<script>
import HotelReviews from '../components/HotelDetail/HotelReviews'
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
  async created(){
    await this.$store.dispatch('fetchHotelById', this.idHotel);
  },
  computed: {
    hotel(){
      return this.$store.state.hotelById;
    }
  },
  components: {
    CusNavbar,
    SearchBar,
    Info,
    Room,
    HotelReviews
  }
}
</script>

<style scoped>

</style>

<style>
  
</style>