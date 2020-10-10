<template>
  <div>
    <CusNavbar></CusNavbar>
    <SearchBar></SearchBar>
    <Info :idHotel="idHotel"></Info>
    <Room></Room>
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