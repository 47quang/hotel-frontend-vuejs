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
        <span class="add-hotel-btn" @click="addHotel"><i class="el-icon-plus"></i> Thêm Chỗ Ở Mới</span>
      </el-col>
    </el-row>
    <div class="manage-listings">
      <span class="horizontal-line-text-middle m-b-4"><strong>Khách Sạn</strong></span>
      <div class="hotel-card" v-for="hotel in hotels" :key="hotel.id">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="hotel-card__title">[{{hotel.id}}] {{hotel.name}}</span>
            <div>
              <el-tag class="hotel-card__tag" :type="'warning'" effect="dark">Chưa Hoàn Tất</el-tag>

            </div>
          </div>
          <div>
            <router-link :to="`/suahotel`" class="edit-hotel">Hoàn tất bài đăng</router-link>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      search: ''
    }
  },
  computed: {
    curOwner() {
      return this.$store.state.curOwner;
    },
    hotels() {
      return this.$store.state.ownerHotels;
    }
  },
  methods: {
    addHotel() {
      this.$router.push(`/dashboard/${this.curOwner.id}/hotels`);
    }
  },
  created() {
    this.$store.dispatch('fetchHotels', this.curOwner.id);
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
  padding: 10px 0;
  margin: 0 12px;
  text-decoration: none;
  font-size: 16px;
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
</style>