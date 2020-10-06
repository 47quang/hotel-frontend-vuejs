<template>
  <div>
    <el-row :gutter="12" class="hotel-listing">
      <el-col :span="6">
        <el-input
          placeholder="Search (property ID or name)"
          suffix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </el-col>
      <el-col :span="6" class="add-hotel">
        <span class="add-hotel-btn" @click="addRoom"><i class="el-icon-plus"></i> Thêm Phòng Mới</span>
      </el-col>
    </el-row>
    <div class="manage-listings">
      <span class="horizontal-line-text-middle m-b-4"><strong>Danh Sách Phòng</strong></span>
      <div class="hotel-card" v-for="room in rooms" :key="room.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="hotel-card__title">[{{room.id}}] {{room.name}}</span>
            <el-button style="float: right; padding: 3px 0" @click="deleteHotel(room.id)" class="hotel-card__button" icon="el-icon-close"></el-button>
          </div>
          <el-row class="hotel-card__body" :gutter="24">
            <el-col :span="6" class="hidden-sm-and-down">
              <div v-for="image in room.images" :key="image">
                <el-image class="hotel-card__image" :src="image"></el-image>
              </div>
            </el-col>
            <!-- <el-col class="hotel-card__content hidden-sm-and-down" :span="18">
              <div>
                <span class="hotel-card__content-title">Địa chỉ: </span>
                <span>{{room.stock}}</span>
              </div>
              <div class="hotel-card__content-description">
                <span class="hotel-card__content-title">Mô tả: </span>
                <p class="text-justify">{{room.description}}</p>
              </div>
              <el-tag class="hotel-card__tag" :type="'warning'" effect="dark">Chưa Hoàn Tất</el-tag>
            </el-col> -->
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
    deleteHotel(hotelId) {
      this.$confirm('Xóa vĩnh viễn phòng. Tiếp tục?', 'Cảnh Báo', {
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
    }
  },
  async mounted() {
    // await this.$store.dispatch('fetchRooms', this.$route.params.id); 
    console.log('params:', this.$route.params.id)
    await this.$store.dispatch('fetchRoomsByHotelId'); 
  }
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
</style>