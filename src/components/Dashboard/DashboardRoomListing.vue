<template>
  <div class="room-lisiting">
    <el-row :gutter="24" class="hotel-listing">
      <el-col :span="12">
        <i class="el-icon-back add-hotel__back" @click="backHotelListing"></i>
      </el-col>
      <el-col :span="12" class="add-hotel">
        <span class="add-hotel-btn" @click="addRoom"><i class="el-icon-plus"></i> Thêm Phòng Mới</span>
      </el-col>
    </el-row>
    <el-input
      placeholder="Search (property ID or name)"
      suffix-icon="el-icon-search"
      class="search-room"
      v-model="search">
    </el-input>
    <div class="manage-listings">
      <span class="horizontal-line-text-middle m-b-4"><strong>Danh Sách Phòng</strong></span>
      <div class="hotel-card" v-for="room in rooms" :key="room.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="hotel-card__title">[{{room.id}}] {{room.name}}</span>
            <el-button style="float: right; padding: 3px 0" @click="deleteRoom(room.id)" class="hotel-card__button" icon="el-icon-close"></el-button>
          </div>
          <el-row class="hotel-card__body" :gutter="24">
            <el-col :span="6" class="hidden-sm-and-down">
              <div v-for="image in room.images" :key="image">
                <el-image class="hotel-card__image" :src="image"></el-image>
              </div>
            </el-col>
            <el-col class="hotel-card__content hidden-sm-and-down" :span="18">
              <div class="hotel-card__content-description">
                <span class="hotel-card__content-title">Mô tả: </span>
                <p class="text-justify">{{room.description}}</p>
              </div>
              <div class="hotel-card__content-description">
                <span class="hotel-card__content-title">Số Lượng Phòng: </span>
                <span>{{room.stock}}</span>
              </div>
              <div class="hotel-card__content-description">
                <span class="hotel-card__content-title">Sức Chứa Mỗi Phòng: </span>
                <span>{{room.capacity}}</span>
              </div>
              <div class="hotel-card__content-description">
                <span class="hotel-card__content-title">Giá Gốc: </span>
                <span>{{room.regularPrice}}</span>
              </div>
              <div class="hotel-card__content-description">
                <span class="hotel-card__content-title">Giá Giảm: </span>
                <span>{{room.salePrice}}</span>
              </div>
            </el-col>
            <!-- For small screens -->
           
          </el-row>
          <router-link :to="`/hotel/${$route.params.id}/room/${room.id}`" class="edit-hotel">Chỉnh Sửa Thông Tin</router-link>
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
      targetHotel: ''
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    rooms() {
      return this.$store.state.roomsByHotelId;
    }
  },
  methods: {
    addRoom() {
      try {
        this.$router.push(`/hotel/${this.$route.params.id}/room/new`);
      }
      catch(err) {
        this.alertErr();
      }
    },
    deleteRoom(roomId) {
      this.$confirm('Xóa vĩnh viễn phòng. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      })
      .then(async() => {
        await this.$store.dispatch('deleteRoom', roomId);
        this.$store.dispatch('fetchRoomsByHotelId', this.$route.params.id);
        this.alertSuccess();
      })
      .catch(() => {
        this.alertErr();
      });
    }, 
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã xóa phòng thành công.',
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
    backHotelListing() {
      this.$router.push(`/dashboard/${this.curOwner.id}/listing`);
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchRoomsByHotelId', this.$route.params.id); 
  }
}
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
.add-hotel {
  display: flex;
  justify-content: flex-end;
}
.add-hotel-btn {
  text-transform: uppercase;
  color: #1174a6;
  text-decoration: none;
  font-weight: 700;
}
.add-hotel:hover {
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
}
.hotel-card__tag {
  background-color: #ffa726 !important;
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
.hotel-card__button {
  border: none;
}
.hotel-card__body {
  display: flex;
  justify-content: center;
  align-content: center;
}
.text-justify {
  text-align: justify;
  line-height: 1.2;
  margin: 5px 0;
}
.hotel-card__content {
  padding-left: 0px !important;
  padding-right: 20px !important;
}
.hotel-card__content-title {
  font-weight: 700;
}
.hotel-card__content-description {
  padding-top: 10px;
}
.hotel-card__image {
  height: 200px; 
  width: 200px;
}

@media (max-width: 992px) {
  .hotel-card__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
.add-hotel__back{
  font-size: 25px;
}
.search-room {
  margin-bottom: 25px;
}
</style>