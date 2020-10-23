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
          <h4 class="booking__form-title" style="font-size: 18px; color:#409eff; margin: 0">
            Giỏ hàng
          </h4>
          <div v-for="cart of tableData" :key="cart.id" class="orderline-submit-cart">
            <h4 style="margin: 10px 0">{{ cart.name }} x {{ cart.quantity }}</h4>
            <div class="date">
              <el-row>
                <el-col :span="12" class="DateStart">
                  <span style="color: black">From: </span> {{ cart.start }}</el-col
                >
                <el-col :span="12" class="DateEnd"
                  ><span style="color: black">To: </span> {{ cart.end }}</el-col
                >
              </el-row>
            </div>
            <div class="price">Giá phòng: {{ cart.price | formatCurrency }}</div>
            <i class="el-icon-close" @click="handleRemove(cart.id)" style="color: red"></i>
          </div>
          <h4 class="booking__form-title">
            Tổng Hóa Đơn:
            <span class="booking__pricing-footer">{{ getTotal() }}</span>
          </h4>
          <div class="booking__confirm booking__card">
            <el-button class="booking__btn" @click="jumpBooking">Thanh toán</el-button>
          </div>
        </el-card>
        <div></div>
      </el-col>
      <el-dialog title="Thông báo" :visible.sync="centerDialogVisible" width="20%" center>
        <span>Trong giỏ hàng của bạn đang chứa các phòng của khách sạn khác, chúng đã bị xóa khỏi giỏ hàng khi bạn chuyển trang</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">Đóng</el-button>
        </span>
      </el-dialog>
    </el-row>

    <Footer></Footer>
  </div>
</template>

<script>
import HotelReviews from '../components/HotelDetail/HotelReviews';
import CusNavbar from '../components/CusNavbar';
import SearchBar from '../components/HotelSearch/SearchBar';
import Info from '../components/HotelDetail/Info';
import Room from '../components/HotelDetail/Room';
import Footer from '../components/Footer';
export default {
  data() {
    return {
      idHotel: this.$route.params.id,
      centerDialogVisible: false,
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
    };
  },
  created() {
    this.$store.dispatch('fetchHotelById', this.idHotel);
  },
  computed: {
    hotel() {
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
    jumpBooking() {
      const checkAccessToken = JSON.parse(localStorage.getItem('accessToken'));
      if (!checkAccessToken) {
        this.alertErr();
      } else this.$router.push(`/booking`);
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Quý khách cần phải đăng nhập để thực hiện tác vụ này!',
        type: 'error',
      });
    },
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
        })
        .catch(() => {
          return;
        });
    },
    getTotal() {
      const t = this.$store.state.orderLines.reduce((c, i) => c + i.quantity * i.price, 0);
      return this.$options.filters.formatCurrency(t);
    },
  },
  components: {
    CusNavbar,
    SearchBar,
    Info,
    Room,
    HotelReviews,
    Footer,
  },
  async mounted() {
    const e = (this.$store.state.orderLines || []).find((l) => l.hotelId != this.$route.params.id);
    if (e) {
      this.$store.commit('UPDATE_ORDERLINE', []);
      this.centerDialogVisible = true;
    }
    await this.$store.dispatch('fetchHotelById', this.$route.params.id);
    await this.$store.dispatch('fetchWardById', this.hotel.wardId);
    await this.$store.dispatch('fetchDistrictById', this.hotel.districtId);
    await this.$store.dispatch('fetchProvinceById', this.hotel.provinceId);
  },
  beforeUpdate() {
    window.document.onscroll = () => {
      let sticky = document.getElementById('add-to-cart');
      if (window.pageYOffset > sticky.offsetTop) {
        sticky.classList.add('sticky');
      } else {
        sticky.classList.remove('sticky');
      }
    };
  },
};
</script>

<style scoped>
.price {
  color: #f79911;
  font-weight: 600;
  padding: 10px 0;
}
.date {
  font-size: 14px;
  color: grey;
}
.sticky {
  position: fixed;
  top: 10px;
  z-index: 10;
  right: 15px;
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

<style></style>
