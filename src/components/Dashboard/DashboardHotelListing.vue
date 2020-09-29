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
      <span class="horizontal-line-text-middle m-b-4"><strong>Nhà Riêng</strong></span>
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
    }
  },
  methods: {
    addHotel(){
      this.$router.push(`/dashboard/${this.curOwner.id}/hotels`);
    }
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
</style>