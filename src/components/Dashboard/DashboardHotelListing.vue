<template>
  <div>
    <el-row :gutter="12" class="hotel-listing">
      <el-col :span="6">
        <el-input
          placeholder="Tìm Theo Tên Khách Sạn"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </el-col>
      <el-col :span="6" class="add-hotel">
        <span class="add-hotel-btn hidden-sm-and-down" @click="addHotel"><i class="el-icon-plus"></i> Thêm Khách Sạn</span>
        <span class="add-hotel-btn hidden-md-and-up" @click="addHotel"><i class="el-icon-plus"></i> Khách Sạn</span>
      </el-col>
    </el-row>
    <div class="manage-listings">
      <span class="horizontal-line-text-middle m-b-4"><strong>Khách Sạn</strong></span>
      <div v-if="isHotelEmpty()" class="handle-empty-hotel">
        <el-image style="width: 50%; height: 50%" :src="'https://cdn.dribbble.com/users/992274/screenshots/7392790/media/95483df50a0a3324c4cf9ccb1094b825.jpg'"></el-image>
      </div>
      <div v-else class="hotel-card" v-for="hotel in filteredHotels" :key="hotel.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="hotel-card__title">[{{hotel.id}}] {{hotel.name}}</span>
            <el-button style="float: right; padding: 3px 0" @click="deleteHotel(hotel.id)" class="hotel-card__button" icon="el-icon-close"></el-button>
          </div>
          <div class="hotel-card__body">
            <div>
              <el-tag class="hotel-card__tag" :type="'success'" effect="dark"><span class="hotel-card__content-title">Địa chỉ</span></el-tag>
              <span class="text-justify">{{hotel.address}}</span>
            </div>
            <div class="hotel-card__content-description">
              <el-tag class="hotel-card__tag" effect="dark"><span class="hotel-card__content-title">Mô tả</span></el-tag>
              <p class="text-justify">{{hotel.description}}</p>
            </div>
            <div class="hotel-card__content-description">
              <el-tag class="hotel-card__tag--rating hotel-card__tag" :type="'warning'" effect="dark"><span class="hotel-card__content-title">Đánh giá</span></el-tag>
              <span class="text-justify">{{hotel.rating | formatRating}}</span>
            </div>
            <div class="hotel-card__content-description">
              <el-tag class="hotel-card__tag" :type="'danger'" effect="dark"><span class="hotel-card__content-title">Hình ảnh</span></el-tag>
              <el-carousel height="400px" direction="vertical" :autoplay="false">
                <el-carousel-item v-for="image in hotel.images" :key="image">
                  <el-image class="hotel-card__image" :src="image"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <router-link :to="`/hotel/${hotel.id}/room`" class="edit-hotel">Chỉnh Sửa Thông Tin</router-link>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      search: '',
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    hotels() {
      return this.$store.state.ownerHotels;
    },
    filteredHotels() {
      return this.hotels.filter(hotel => {
        return hotel.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    addHotel() {
      try {
        this.$router.push(`/dashboard/${this.curOwner.id}/hotels`);
      }
      catch(err) {
        this.alertErr();
      }
    },
    deleteHotel(hotelId) {
      this.$confirm('Xóa vĩnh viễn khách sạn. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(async() => {
        await this.$store.dispatch('deleteHotel', hotelId);
        this.$store.dispatch('fetchHotels', this.curOwner.id);
        this.alertSuccess();
      })
      .catch(() => {
        this.alertErr();
      });
    }, 
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã xóa khách sạn thành công.',
        type: 'success'
      });
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        type: 'error'
      });
    },
    isHotelEmpty() {
      if (this.$store.state.ownerHotels.length == 0) return true;
      else return false;
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchHotels', this.curOwner.id);
  },
}
</script>

<style scoped>
.hotel-listing {
  padding: 30px 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-hotel {
  display: flex;
  justify-content: flex-end;
}
.add-hotel-btn {
  text-transform: uppercase;
  color: #1174a6;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
.add-hotel:hover {
  color: #0a4461;
  text-decoration: underline;
}
.manage-listings {
  padding: 0 10%;
}
.manage-listings .horizontal-line-text-middle {
  color: #777;
}
.horizontal-line-text-middle {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  padding-bottom: 30px;
}
.horizontal-line-text-middle:after, .horizontal-line-text-middle:before {
  content: "";
  -ms-flex: 1 1;
  flex: 1 1;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: inherit;
  margin: auto;
}
.horizontal-line-text-middle:after {
  margin-left: 20px;
}
.horizontal-line-text-middle:before {
  margin-right: 20px;
}
.el-progress-bar__inner::after, .el-row::after, .el-row::before, .el-slider::after, .el-slider::before, .el-slider__button-wrapper::after, .el-upload-cover::after {
  content: none;
}
.hotel-card {
  padding-bottom: 30px;
}
.edit-hotel {
  color: #1174a6;
  font-weight: 600;
  position: relative;
  margin: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  padding: 20px 0;
  margin: 0 12px;
  text-decoration: none;
  font-size: 16px;
  float: right;
}
.hotel-card__title {
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: inherit;
  word-break: break-all;
  margin-top: 0;
  font-size: 24px;
}
.hotel-card__tag {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
.hotel-card__tag--rating {
  background-color: #ffa726 !important;
}
.hotel-card__button {
  border: none;
}
.hotel-card__body {
  padding: 20px 20px 0;
}
.text-justify {
  text-align: justify;
  line-height: 1.2;
  margin: 10px;
  font-weight: 700;
}
.hotel-card__content {
  padding-left: 0px !important;
  padding-right: 20px !important;
}
.hotel-card__content-title {
  font-weight: 700;
}
.hotel-card__content-description {
  padding-top: 20px;
}
.hotel-card__image {
  padding-top: 20px;
  width: 100%;
  height: 100%;
}
.handle-empty-hotel {
  display: flex; 
  justify-content: center;
}
@media (max-width: 992px) {
  .hotel-card__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
</style>