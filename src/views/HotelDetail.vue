<template>
  <div>
    <CusNavbar></CusNavbar>
    <SearchBar></SearchBar>
    <el-row>
      <el-col :span="17">
          <Info :idHotel="idHotel"></Info>
          <Room v-for="room in hotel.rooms" :key="room.id" :room="room"></Room>
          <HotelReviews :idHotel="idHotel"></HotelReviews>
      </el-col>
      <el-col class="sticky" id="add-to-cart" :span="7">
          <el-card class="booking__card">
          <h4 class="booking__form-title" style="font-size: 18px; color:#409eff; margin: 0">Giỏ hàng</h4>
        <!-- <el-table :data="tableData" style="width: 100%">
          <el-table-column fixed prop="name" label="Tên phòng" width="100"> </el-table-column>
          <el-table-column prop="quantity" label="SL" width="50"> </el-table-column>
          <el-table-column prop="price" label="Giá" width="100"></el-table-column>
          <el-table-column prop="start" label="Ngày nhận" width="100"></el-table-column>
          <el-table-column prop="end" label="Ngày trả" width="100"> </el-table-column>
          <el-table-column fixed="right" label="Thao tác" width="100">
            <template slot-scope="scope">
              <el-button @click="handleRemove(scope.$index, scope.row)" type="danger" size="small" plain icon="el-icon-delete"
                >Xóa</el-button
              >
            </template>
          </el-table-column> 
        </el-table> -->
        <!-- Get Total -->
        <div v-for="cart of tableData" :key="cart.id" class="orderline-submit-cart">
          
          <h4 style="margin: 10px 0">{{cart.name}} x {{cart.quantity}}</h4>
          <div class="date">
            <el-row>
              <el-col :span="12" class="DateStart"> <span style="color: black">From: </span> {{cart.start}}</el-col>
              <el-col :span="12" class="DateEnd"><span style="color: black">To: </span> {{cart.end}}</el-col>
            </el-row>
            
          </div>
          <div class="price">Giá phòng: {{cart.price | formatCurrency}}</div>
          <i class="el-icon-close" @click="handleRemove(cart.id)" style="color: red"></i>
        </div>
        <h4 class="booking__form-title">
          Tổng Hóa Đơn:
          <span class="booking__pricing-footer">{{this.total}}</span>
        </h4>
        <div class="booking__confirm booking__card">
          <el-button class="booking__btn" @click="handlePurchase">Thanh toán</el-button>
        </div>
      </el-card>
        <div></div>
      </el-col>
    </el-row>
    
    <Footer></Footer>
  </div>
   
</template>

<script>
import HotelReviews from '../components/HotelDetail/HotelReviews'
import CusNavbar from '../components/CusNavbar'
import SearchBar from '../components/HotelSearch/SearchBar'
import Info from '../components/HotelDetail/Info'
import Room from '../components/HotelDetail/Room'
import Footer from '../components/Footer'
export default {
  data() {
    return {
      idHotel: this.$route.params.id,
      order: {
        fullname: '',
        hotelId: 0,
        email: '',
        phone: '',
        orderLines: [
          {
            quantity: 1,
            start: '',
            end: '',
            price: 0,
            roomId: 0,
            orderId: 0,
          },
        ],
      },
      total: 0
    }
  },
   created(){
     this.$store.dispatch('fetchHotelById', this.idHotel);
     this.getTotal(this.orderLines);
     console.log(this.orderLines)
  },
  computed: {
    hotel(){
      return this.$store.state.hotelById;
    },
    wardById() {
      return this.$store.state.wardById;
    },
    districtById() {
      return this.$store.state.districtById;
    },
    provinceById() {
      return this.$store.state.provinceById;
    },
    orderLines() {
      return this.$store.state.orderLines;
    },
    tableData() {
      return this.orderLines;
    },
  },

  methods: {
    handleRemove(id) {
      this.$confirm('Sẽ xóa phòng ra khỏi giỏ hàng. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
      .then(() => {
        const orderLines = this.$store.state.orderLines;
        const orderLineIndex = orderLines.findIndex((l) => l.id == id);
        if (orderLineIndex != -1) {
          orderLines.splice(orderLineIndex, 1);
          this.$store.commit('UPDATE_ORDERLINE', orderLines);
        }
        this.total = 0;
        this.getTotal(this.orderLines);
      })
      .catch(() => {
        return;
      });
    },
    getTotal(orderLines) {
      for (const order of Array.from(orderLines)) {
        this.total += order.price * order.quantity;
      }
      return this.total = this.$options.filters.formatCurrency(this.total);
    },
  },
  components: {
    CusNavbar,
    SearchBar,
    Info,
    Room,
    HotelReviews,
    Footer
  },
   async mounted() {
    await this.$store.dispatch('fetchHotelById', this.orderLines[0].hotelId); 
    await this.$store.dispatch('fetchWardById', this.hotel.wardId);
    await this.$store.dispatch('fetchDistrictById', this.hotel.districtId);
    await this.$store.dispatch('fetchProvinceById', this.hotel.provinceId);
  },
  beforeUpdate() {
     window.document.onscroll = () => {
      let sticky = document.getElementById('add-to-cart');
      if(window.pageYOffset > sticky.offsetTop){
         sticky.classList.add('sticky');
        } else {
        sticky.classList.remove('sticky');
      }
    }
  }
}
</script>

<style scoped>
  .price {
    color: #f79911;
    font-weight: 600;
    padding: 10px 0;
  }
  .date {
    font-size: 14px;
    color: grey
  }
  .sticky {
    position: fixed;
    top: 0;
    z-index: 10;
    right: 0;
  }
  .orderline-submit-cart {
    border-bottom: 1px solid silver;
    padding-bottom: 10px;
    position: relative;
  }
  .el-icon-close {
    color: red;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
</style>

<style>
  
</style>