<template>
  <div class="room-lisiting">
    <el-row :gutter="24" class="hotel-listing">
      <el-col :span="12">
        <i class="el-icon-back add-hotel__back" @click="backHotelListing"></i>
      </el-col>
      <el-col :span="12" class="add-room">
        <span class="add-room-btn" @click="addRoom">
          <i class="el-icon-plus"></i> Thêm Phòng Mới
        </span>
      </el-col>
    </el-row>
    
    <div class="manage-listings">
      <el-row :gutter="24">
        <!-- <el-col :span="8"> -->
          <!-- Hotel Dettails -->
          <!-- <span class="horizontal-line-text-middle m-b-4">
            <strong>Thông Tin Khách Sạn</strong>
          </span>
          <el-card>
            <div slot="header" class="clearfix">
              <span class="room-card__title">[{{hotel.id}}] {{hotel.name}}</span>
            </div>
            <div class="hotel-card__body">
              <div>
                <el-tag class="room-card__tag" :type="'success'" effect="dark"><span class="room-card__content-title">Địa chỉ</span></el-tag>
                <span class="text-justify">{{hotel.address}}, {{wardById.name}}, {{districtById.name}}, {{provinceById.name}}</span>
              </div>
              <el-row :gutter="22">
                <el-col :span="11" class="room-card__content-description">
                  <el-tag class="room-card__tag--rating room-card__tag" :type="'warning'" effect="dark"><span class="room-card__content-title">Đánh giá</span></el-tag>
                  <span class="text-justify">{{hotel.rating | formatRating}}</span>
                </el-col>
                <el-col :span="11" class="room-card__content-description">
                  <el-tag class="room-card__tag--rating room-card__tag" :type="'info'" effect="dark"><span class="room-card__content-title">Số lượng loại phòng</span></el-tag>
                  <span class="text-justify">{{roomQuantity}}</span>
                </el-col>
              </el-row>
              <div class="room-card__content-description room-card__content-image">
                <el-tag class="room-card__tag" :type="'danger'" effect="dark"><span class="room-card__content-title">Hình ảnh</span></el-tag>
                <div class="hotel-card__images">
                  <el-image class="room-card__image" v-for="image in hotel.images" :key="image" :src="image" :fit="'contain'"></el-image>
                </div>
              </div>
            </div>
            <router-link
                :to="`/hotel/${$route.params.id}/update`"
                class="edit-room"
              >Cập Nhật Khách Sạn</router-link>
          </el-card> -->
        <!-- </el-col> -->
        <!-- <el-col :span="16"> -->
          <!-- Room Listing -->
          
          <div v-if="isEmptyRoom()" class="empty-room">
            <el-image :src="url" :fit="'contain'"></el-image>
            <h1 class="room-card__title">Wow...Thật Trống Trải.</h1>
            <h1 class="room-card__title">Chưa Có Loại Phòng Nào Được Tạo!</h1>
            <el-button type="primary" class="continue-btn btn" icon="el-icon-plus" @click="addRoom">Tạo Loại Phòng Mới</el-button>
          </div>
          <el-row v-else :gutter="24">
            <el-col :span="6" class="room-listing">
              <span class="horizontal-line-text-middle m-b-4">
                <strong>Danh Sách Phòng</strong>
              </span>
              <el-input
                placeholder="Tìm Theo Tên Phòng"
                suffix-icon="el-icon-search"
                class="search-room"
                v-model="search"
              ></el-input>
              <div class="room-card" v-for="room in filteredRooms" :key="room.id">
                <div slot="header" class="clearfix">
                  <i class="el-icon-s-home hotel__icon"></i>
                  <span class="room-card__title" @click="openDetail(room.id)">{{room.name}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="18">
              <div v-if="loading()" class="loading">
                <el-image style="width: 70%; height: 70%" :src="'https://cdn.dribbble.com/users/14501/screenshots/6326457/procreate-exploration.jpg'"></el-image>
                <span class="room-card__content-title room-card__content-description">Chọn Loại Phòng Để Xem Chi Tiêt</span>
              </div>
              <router-view v-else :key="$route.fullPath"/>
            </el-col>
          </el-row>
        <!-- </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      url: "https://cdn.dribbble.com/users/1174720/screenshots/4966906/dribbble-livingroom.jpg"
    };
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    rooms() {
      return this.$store.state.roomsByHotelId;
    },
    hotel() {
      return this.$store.state.hotelById;
    },
    wardById(){
      return this.$store.state.wardById;
    },
    districtById(){
      return this.$store.state.districtById;
    },
    provinceById(){
      return this.$store.state.provinceById;
    },
    filteredRooms() {
      return (Array.from(this.rooms) || []).filter(room => {
        return room.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    roomQuantity() {
      return this.$store.state.roomQuantity;
    }
  },
  methods: {
    addRoom() {
      try {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new`);
      } catch (err) {
        this.alertErr();
      }
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: "Đã có lỗi xảy ra, vui lòng thử lại.",
        type: "error"
      });
    },
    backHotelListing() {
      this.$router.push(`/dashboard/${this.curOwner.id}/listing`);
    },
    isEmptyRoom() {
      return this.rooms.length == 0;
    },
    openDetail(roomId) {
      this.$router.push(`/hotel/${this.$route.params.id}/room/${roomId}/detail`);
    },
    loading() {
      return this.$route.path === `/hotel/${this.$route.params.id}/room`
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchHotelById", this.$route.params.id);
    await this.$store.dispatch("fetchRoomsByHotelId", this.$route.params.id);
    await this.$store.dispatch('fetchWardById', this.hotel.wardId); 
    await this.$store.dispatch('fetchDistrictById', this.hotel.districtId); 
    await this.$store.dispatch('fetchProvinceById', this.hotel.provinceId); 
  },
};
</script>

<style scoped>
.room-lisiting {
  padding: 0px 10%;
  height: 90vh;
}
.hotel-listing {
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-room {
  display: flex;
  justify-content: flex-end;
}
.add-room-btn {
  text-transform: uppercase;
  color: #1174a6;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
.add-room:hover {
  color: #0a4461;
  text-decoration: underline;
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
.horizontal-line-text-middle:after,
.horizontal-line-text-middle:before {
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
.el-progress-bar__inner::after,
.el-row::after,
.el-row::before,
.el-slider::after,
.el-slider::before,
.el-slider__button-wrapper::after,
.el-upload-cover::after {
  content: none;
}
.room-card {
  padding-bottom: 30px;
}
.edit-room {
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
.room-card__title {
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
  color: inherit;
  word-break: break-all;
  margin-top: 0;
  font-size: 20px;
}
.text-justify {
  text-align: justify;
  line-height: 1.2;
  margin: 10px 10px 0;
  font-weight: 700;
}
.room-card__content {
  padding-left: 0px !important;
  padding-right: 20px !important;
}
.room-card__content-title {
  font-weight: 700;
}
.room-card__content-description {
  padding-top: 30px;
}

.add-hotel__back {
  font-size: 25px;
}
.m-b-4 {
  margin-top: 30px;
}
.hotel-card__body {
  padding: 20px 20px 0;
}
.hotel-card__images {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.add-hotel__back {
  cursor: pointer;
}
.room-card__content-image {
  margin-top: 50px;
}
.empty-room {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
}
.continue-btn {
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
  margin-top: 12px;
}
.continue-btn:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.btn {
  margin-left: 5px;
  margin-top: 10px;
  float: right;
  min-height: 40px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  padding: 10px 15px;
  font-size: 18px;
  line-height: 1.42857;
  border-radius: 5px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  margin-top: 30px;
}
.hotel__icon {
  font-size: 25px;
  margin-right: 10px;
}
.room-listing {
  padding: 75px;
}
.search-room {
  margin-bottom: 30px;
}
@media (max-width: 992px) {
  .room-card__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .room-card__title {
    font-size: 12px;
  }
}
</style>