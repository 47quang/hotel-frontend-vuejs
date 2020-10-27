<template>
  <div>
    <div class="add-hotel">
      <div>
        <i class="el-icon-back add-hotel__back" @click="backRoomListing"></i>
        <el-divider><h2 class="add-hotel__title">Cập Nhật Khách Sạn</h2></el-divider>
      </div>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-image :src="url" :fit="'contain'"></el-image>
        </el-col>
        <el-col :span="12">
          <el-steps class="step" :active="active" finish-status="success">
            <el-step title="Tên Khách Sạn" icon="el-icon-edit"></el-step>
            <el-step title="Địa Chỉ" icon="el-icon-location"></el-step>
            <el-step title="Hình Ảnh" icon="el-icon-picture"></el-step>
          </el-steps>
          <el-form ref="form" :model="hotel">
            <router-view :hotel="hotel" :active="active" @on-back="onBack"></router-view>
          </el-form>
          <el-button v-if="!isStep3()" class="continue-btn btn" @click="next" type="primary">Tiếp Tục</el-button>
          <el-button v-if="!isStep1and3()" class="goback-btn btn" @click="back">Quay Lại</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
      active: 0,
      url: "https://cdn.dribbble.com/users/129991/screenshots/6008315/hotel.png"
    };
  },
  methods: {
    handleSelectProvince(provinceId) {
      if (provinceId == undefined) return;
      this.$store.dispatch('fetchDistrict', provinceId);
    },
    handleSelectDistrict(districtId) {
      this.$store.dispatch('fetchWards', districtId);
    },
    handleRemove(file) {
      const index = this.fileList.findIndex(f => f.url == file.url);
      this.fileList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    parseFormData(files) {
      let formData = new FormData();
      for (const file of files) {
        formData.append('image', file);
      }
      return formData;
    },
    handleOnChange(file, fileList){
      this.fileList = fileList;
    },
    async handleUpload(e) {
      e.preventDefault();
      const files = this.$refs.upload.uploadFiles.filter(f => f.raw).map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.hotel.images = this.$refs.upload.uploadFiles.filter(f => !f.raw).map(f => f.url).concat(data);

      try {
        this.$store.dispatch('updateHotel', { hotelId: this.$route.params.id, hotel: this.hotel });
        this.alertSuccess();
        await this.$store.dispatch('fetchRoomsByHotelId', this.$route.params.id);
        this.$router.push(`/hotel/${this.$route.params.id}/room`);
      } catch (err) {
        this.alertErr();
      }
    },
    alertSuccess() {
      this.$message({
        showClose: true,
        message: 'Đã cập nhật khách sạn thành công.',
        type: 'success',
      });
    },
    alertErr() {
      this.$message({
        showClose: true,
        message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
        type: 'error',
      });
    },
    backRoomListing() {
      this.$confirm('Bài đăng vẫn chưa hoàn tất. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
        .then(() => {
          this.$router.push(`/hotel/${this.$route.params.id}/room`);
        })
        .catch(() => {
          return;
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
      if (this.active === 1) {
        this.$router.push(`/hotel/${this.$route.params.id}/update/location`)
      }
      if (this.active === 2) {
        this.$router.push(`/hotel/${this.$route.params.id}/update/photos`)
      }
    },
    isStep3() {
      return this.$route.path === `/hotel/${this.$route.params.id}/update/photos`
    },
    isStep1and3() {
      return this.$route.path === `/hotel/${this.$route.params.id}/update` || this.$route.path === `/hotel/${this.$route.params.id}/update/photos`;
    },
    back() {
      if (this.active === 2) {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/update/location`)
      }
      else {
        this.active -= 1;
        this.$router.push(`/hotel/${this.$route.params.id}/update`)
      }
    },
    onBack(active) {
      this.active = active;
      if (active == 1) {
        // this.$router.push(`/dashboard/${this.curOwner.id}/hotels/location`)
      }
    }
  },
  computed: {
    provinces() {
      return this.$store.state.provinces;
    },
    districts() {
      return this.$store.state.districts;
    },
    wards() {
      return this.$store.state.wards;
    },
    hotel() {
      return this.$store.state.hotelById;
    },
  },
  watch: {
    '$store.state.hotelById': function(nVal) {
      this.fileList = nVal.images.map((i, index) => ({
        name: `${nVal.name.normalize()}-image-${index}`,
        url: i,
      }));
    }
  },
  async created() {
    this.$store.dispatch('fetchProvince');
    await this.$store.dispatch('fetchHotelById', this.$route.params.id);
    this.$store.dispatch('fetchDistrict', this.hotel.provinceId);
    this.$store.dispatch('fetchWards', this.hotel.districtId);
  },
};
</script>
<style scoped>
.add-hotel {
  padding: 0 10%;
}
.add-hotel__title {
  text-align: center;
  font-size: 24px;
  margin: 8px 0;
}
.add-hotel__select-info {
  width: 100%;
}
.add-hotel__back {
  font-size: 25px;
  padding-top: 20px;
}
.form__description-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
}
.form__submit {
  margin-top: 10px;
  text-transform: uppercase;
  font-weight: 700;
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
</style>
