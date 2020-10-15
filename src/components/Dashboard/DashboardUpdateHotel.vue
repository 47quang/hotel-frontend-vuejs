<template>
  <div>
    <div class="add-hotel">
      <div>
        <i class="el-icon-back add-hotel__back" @click="backRoomListing"></i>
        <el-divider><h2 class="add-hotel__title">Cập Nhật Khách Sạn</h2></el-divider>
      </div>
      <el-form ref="form" :model="hotel">
        <el-form-item>
          <h4 class="form__description-title">Đặt tên cho Khách Sạn</h4>
          <el-card shadow="hover">
            <el-input v-model="hotel.name" maxlength="100" show-word-limit></el-input>
          </el-card>
        </el-form-item>
        <el-form-item>
          <h4 class="form__description-title">Địa Chỉ</h4>
          <el-card shadow="hover">
            <el-input v-model="hotel.address" maxlength="100" show-word-limit></el-input>
          </el-card>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item>
              <h4 class="form__description-title">Thành Phố</h4>
              <el-card shadow="hover">
                <el-select
                  class="add-hotel__select-info"
                  v-model="hotel.provinceId"
                  clearable
                  @change="handleSelectProvince"
                  placeholder="Vui Lòng Chọn Tỉnh Thành"
                >
                  <el-option
                    v-for="province in provinces"
                    :key="province.id"
                    :label="province.name"
                    :value="province.id"
                  ></el-option>
                </el-select>
              </el-card>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <h4 class="form__description-title">Quận/Huyện</h4>
              <el-card shadow="hover">
                <el-select
                  class="add-hotel__select-info"
                  v-model="hotel.districtId"
                  clearable
                  @change="handleSelectDistrict"
                  placeholder="Vui Lòng Chọn Quận Huyện"
                >
                  <el-option
                    v-for="district in districts"
                    :key="district.id"
                    :label="district.name"
                    :value="district.id"
                  ></el-option>
                </el-select>
              </el-card>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <h4 class="form__description-title">Phường/Xã</h4>
              <el-card shadow="hover">
                <el-select
                  class="add-hotel__select-info"
                  v-model="hotel.wardId"
                  clearable
                  placeholder="Vui Lòng Chọn Phường Xã"
                >
                  <el-option
                    v-for="ward in wards"
                    :key="ward.id"
                    :label="ward.name"
                    :value="ward.id"
                  ></el-option>
                </el-select>
              </el-card>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <h4 class="form__description-title">Mô tả</h4>
          <el-card shadow="hover">
            <el-input
              type="textarea"
              :rows="4"
              maxlength="5000"
              show-word-limit
              v-model="hotel.description"
            ></el-input>
          </el-card>
        </el-form-item>
        <el-form-item>
          <h4 class="form__description-title">Hình ảnh</h4>
          <el-upload
            accept="image/png, image/jpeg, image/jpg"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            ref="upload"
            :file-list="fileList"
            :on-change="handleOnChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <el-image
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                :fit="'contain'"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 5MB</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-button plain class="form__submit" @click="handleUpload">Cập nhật</el-button>
        </el-form-item>
      </el-form>
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
      console.log('---- Upload: ', this.$refs.upload.uploadFiles);
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
