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
    <el-input
      placeholder="Tìm Theo Tên Phòng"
      suffix-icon="el-icon-search"
      class="search-room"
      v-model="search"
    ></el-input>
    <div class="manage-listings">
      <!-- Hotel Dettails -->
      <span class="horizontal-line-text-middle m-b-4">
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
          <div class="room-card__content-description">
            <el-tag class="room-card__tag" effect="dark"><span class="room-card__content-title">Mô tả</span></el-tag>
            <p class="text-justify">{{hotel.description}}</p>
          </div>
          <div class="room-card__content-description">
            <el-tag class="room-card__tag--rating room-card__tag" :type="'warning'" effect="dark"><span class="room-card__content-title">Đánh giá</span></el-tag>
            <span class="text-justify">{{hotel.rating | formatRating}}</span>
          </div>
          <div class="room-card__content-description">
            <el-tag class="room-card__tag" :type="'danger'" effect="dark"><span class="room-card__content-title">Hình ảnh</span></el-tag>
            <el-carousel class="room-card__carousel" height="400px" direction="vertical" :autoplay="false">
              <el-carousel-item v-for="image in hotel.images" :key="image">
                <el-image class="room-card__image" :src="image"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <router-link
            :to="`/hotel/${$route.params.id}/update`"
            class="edit-room"
          >Cập Nhật Khách Sạn</router-link>
      </el-card>
      <!-- Room Listing -->
      <span class="horizontal-line-text-middle m-b-4">
        <strong>Danh Sách Phòng</strong>
      </span>
      <div class="room-card" v-for="room in filteredRooms" :key="room.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="room-card__title">[{{room.id}}] {{room.name}}</span>
            <el-button
              style="float: right; padding: 3px 0"
              @click="deleteRoom(room.id)"
              class="room-card__button"
              icon="el-icon-close"
            ></el-button>
          </div>
          <div class="room-card__body">
            <div class="room-card__info">
              <div>
                <el-tag class="room-card__tag" :type="'success'" effect="dark"><span class="room-card__content-title">Số Lượng Phòng</span></el-tag>
                <span class="text-justify">{{room.stock}}</span>
              </div>
              <div >
                <el-tag class="room-card__tag" :type="'warning'" effect="dark"><span class="room-card__content-title">Sức Chứa Mỗi Phòng</span></el-tag>
                <span class="text-justify">{{room.capacity}}</span>
              </div>
              <div>
                <el-tag class="room-card__tag" effect="dark"><span class="room-card__content-title">Giá Gốc</span></el-tag>
                <span class="text-justify">{{room.regularPrice | formatCurrency}}</span>
              </div>
              <div>
                <el-tag class="room-card__tag" :type="'danger'" effect="dark"><span class="room-card__content-title">Giá Giảm</span></el-tag>
                <span class="text-justify">{{room.salePrice | formatCurrency}}</span>
              </div>
            </div>
            <div class="room-card__content-description">
              <el-tag class="room-card__tag" :type="'info'" effect="dark"><span class="room-card__content-title">Mô tả</span></el-tag>
              <p class="text-justify">{{room.description}}</p>
            </div>
            <div class="room-card__content-description">
              <el-tag class="room-card__tag room-card__tag--image" :type="'warning'" effect="dark"><span class="room-card__content-title">Hình ảnh</span></el-tag>
              <div v-if="isImageEmpty(room.images)" class="handle-empty-image">
                <el-image style="width: 50%; height: 50%" :src="'https://cdn.dribbble.com/users/992274/screenshots/7392790/media/95483df50a0a3324c4cf9ccb1094b825.jpg'"></el-image>
              </div>
              <el-carousel v-else height="400px" direction="vertical" :autoplay="false">
                <el-carousel-item  class="room-card__carousel" v-for="image in room.images" :key="image">
                  <el-image class="room-card__image" :src="image"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <router-link
            :to="`/hotel/${$route.params.id}/room/${room.id}`"
            class="edit-room"
          >Chỉnh Sửa Phòng</router-link>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
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
      console.log('rooms', this.rooms)
      return (Array.from(this.rooms) || []).filter(room => {
        return room.name.toLowerCase().includes(this.search.toLowerCase())
      })
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
    deleteRoom(roomId) {
      this.$confirm("Xóa vĩnh viễn phòng. Tiếp tục?", "Cảnh Báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Hủy bỏ",
        type: "warning"
      })
        .then(async () => {
          await this.$store.dispatch("deleteRoom", roomId);
          this.$store.dispatch("fetchRoomsByHotelId", this.$route.params.id);
          this.alertSuccess();
        })
        .catch(() => {
          this.alertErr();
        });
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: "Đã xóa phòng thành công.",
        type: "success"
      });
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
    isImageEmpty(images) {
      if (images == null) return true;
      else if (images.length == 0) return true;
      else return false;
    },
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
.room-card__tag {
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
.room-card__button {
  border: none;
}
.room-card__body {
  padding: 20px;
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
.room-card__image {
  height: 100%;
  width: 100%;
}
.add-hotel__back {
  font-size: 25px;
}
.search-room {
  margin-bottom: 25px;
}
.m-b-4 {
  margin-top: 30px;
}
.hotel-card__body {
  padding: 20px 20px 0;
}
.room-card__carousel {
  margin-top: 20px;
}
.room-card__info {
  display: flex;
  justify-content: space-between;
}
.room-card__tag--image {
  background-color: #ffa726 !important;
}
.handle-empty-image {
  display: flex; 
  justify-content: center;
}
.add-hotel__back {
  cursor: pointer;
}
@media (max-width: 992px) {
  .room-card__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
</style>