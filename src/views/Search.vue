<template>
<div>
  <CusNavbar></CusNavbar>
  <SearchBar></SearchBar>
  <el-container>
    <el-main class="filter-main" >
        <el-row class="filter-row">
          <el-col class="filter" :span="18">
            <div class="filter-wrapper">
               <h4 style="width: 300px">Lọc chỗ nghỉ theo </h4>
            <el-select class="filter"  v-model="value" clearable placeholder="Giá">
                <el-option
                  :value="price"
                >
                        <el-row >
                          <el-col :span="24">
                            <el-slider
                                v-model="range"
                                range
                                show-stops
                                :max="20">
                            </el-slider>  
                          </el-col>
                          <el-col class="price" :span="12">
                            TỐI THIỂU : {{minPrice }}
                          </el-col>
                          <el-col class="price" :span="12">
                            TỐI ĐA: {{maxPrice }} 
                          </el-col>
                        </el-row>
                  </el-option>
              </el-select>
              <el-select class="filter"  v-model="star" clearable placeholder="Xếp hạng">
                <el-option
                  v-for="item in ratings"
                  :key="item.rating"
                  :value="item.rating">
                    <el-rate
                      v-model="item.rating"
                      disabled
                      show-score
                      text-color="#ff9900">
                    </el-rate>
                </el-option>
              </el-select>
              <!-- <el-select class="filter"  v-model="star" clearable placeholder="Vị trí">
                <el-option
                  v-for="item in ratings"
                  :key="item.rating"
                  :value="item.rating+' star '">
                    <el-rate
                      v-model="item.rating"
                      disabled
                      show-score
                      text-color="#ff9900">
                    </el-rate>
                </el-option>
              </el-select>
              <el-select class="filter"  v-model="star" clearable placeholder="Thêm">
                <el-option
                  v-for="item in ratings"
                  :key="item.rating"
                  :value="item.rating+' star '">
                    <el-rate
                      v-model="item.rating"
                      disabled
                      show-score
                      text-color="#ff9900">
                    </el-rate>
                </el-option>
              </el-select> -->
            </div>
           
          </el-col>
          <el-col class="hotelName" :span="6">
             <el-input
                placeholder="Từ khóa hay tên khách sạn"
                prefix-icon="el-icon-search"
                v-model="search">
            </el-input>
          </el-col>
        </el-row>
            
    </el-main>
  </el-container>
  <HotelList :star="star" :range="range"></HotelList>
  <Footer></Footer>
   
</div>

  
</template>

<script>
import CusNavbar from '../components/CusNavbar'
import SearchBar from '../components/HotelSearch/SearchBar'
import HotelList from '../components/HotelSearch/HotelList'
import Footer from '../components/Footer'
export default {
  data(){
    return {
        search:'',
        star: '',
        value:'',
        range: [0,30],
        ratings: [
            {
              rating: 1
            },
            {
              rating: 2
            },
            {
              rating: 3
            },
            {
              rating: 4
            },
            {
              rating: 5
            }
        ]
    }
  },
  computed:{
    price() {
      return  this.minPrice   + ' - ' + this.maxPrice 
    },
    minPrice(){
      return this.range[0]*200000 
    },
    maxPrice() {
      return this.range[1]*200000 
    }
  },
  
  components: {
    CusNavbar,
    SearchBar,
    HotelList,
    Footer
  },

  // computed: {
  //   hotel(){
  //     console.log(this.$store.state.hotel)
  //      return this.$store.state.hotel
  //   }
  // }
}
</script>

<style scoped>
  
  h4 {
    padding: 0 10px;
    width: 200px;
    font-size: 14px;
  }
  
  .el-select-dropdown__item {
    overflow: inherit;
    height: none;
  }
  .price {
    padding: 0 10px;
    text-align: center;
    font-size: 12px
    
  }
 
  .filter-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
  .filter-row{
    width: 80% !important; 
    margin: 0 auto;
    display: flex; 
    align-items: center;
    justify-content: center;
  }

</style>
<style >
  .hotelName .el-input__inner {
    border-radius: 20px;
    background-color: #f8f7f9;
    color: #2a2a2e;
    border: 1px solid #2a2a2e;
  } 

  .filter-main {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.15);
  }

 .filter .el-icon-arrow-up:before{
    color: white
  }
  .el-slider__runway {
    background-color: #dddfe2;
  }
  .el-slider__stop {
    background-color: #dddfe2 !important;
  }
  .el-tooltip__popper {
    display: none;
  }
  .filter .el-input__inner {
    border-radius: 20px;
    background-color: #20274d;
    color: white;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .filter-wrapper .el-input {
    width: 98%;
  }
  .filter .el-input__inner::-webkit-input-placeholder{
      color: white;
       font-size: 14px;
      letter-spacing: 1px;
    }
  .filter-wrapper .el-input .el-input__inner {
    text-align: center;
    font-weight: 600;
  }
</style>