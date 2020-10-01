<template>
  <div>
    <div class="add-hotel">
      <h2 class="add-hotel__title">Đăng Ký Khách Sạn</h2>
      <el-form ref="form" :model="hotel" label-width="200px">
        <el-form-item label="Tên Khách Sạn Của Bạn:">
          <el-input v-model="hotel.name"></el-input>
        </el-form-item>
        <el-form-item label="Địa Chỉ:">
          <el-input v-model="hotel.address"></el-input>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="Thành Phố:">
              <el-select class="add-hotel__select-info" v-model="hotel.provinceId" clearable @change="handleSelectProvince" placeholder="Vui Lòng Chọn Tỉnh Thành">
                <el-option v-for="province in provinces" :key="province.id" :label="province.name" :value="province.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Quận/Huyện:">
              <el-select class="add-hotel__select-info" v-model="hotel.districtId" clearable @change="handleSelectDistrict" placeholder="Vui Lòng Chọn Quận Huyện">
                <el-option v-for="district in districts" :key="district.id" :label="district.name" :value="district.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Phường/Xã:">
              <el-select class="add-hotel__select-info" v-model="hotel.wardId" clearable placeholder="Vui Lòng Chọn Phường Xã">
                <el-option v-for="ward in wards" :key="ward.id" :label="ward.name" :value="ward.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Mô tả:">
          <el-input type="textarea" :rows="4" v-model="hotel.description"></el-input>
        </el-form-item>
        <el-form-item label="Hình ảnh">
          <el-upload accept="image/png, image/jpeg, image/jpg" action="#" list-type="picture-card" :auto-upload="false" ref="upload">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" :on-remove="handleRemove(file, hotel.images)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 10MB</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-button type="warning" icon="el-icon-star-off" round @click="handleUpload">Upload</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotel: {
        name: '',
        address: '',
        provinceId: '',
        districtId: '',
        wardId: '',
        description: '',
        images: [],
        ownerId: this.$store.state.curOwner.id,
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    handleSelectProvince(provinceId) {
      this.$store.dispatch('fetchDistrict', provinceId);
    },
    handleSelectDistrict(districtId){
      this.$store.dispatch('fetchWards', districtId);
    },
    handleRemove(file, fileList) {
      console.log('image uploaded: ', file);
      console.log('list images: ', fileList);
      console.log('list hotel images: ', this.hotel.images);
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
    async handleUpload(e) {
      e.preventDefault();
      const files = this.$refs.upload.uploadFiles.map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.hotel.images = data;
      this.$store.dispatch('registerHotel', this.hotel);
      this.$router.push(`/dashboard/${this.curOwner.id}`)
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
    curOwner() {
      return this.$store.state.curOwner;
    }
  },
  created() {
    this.$store.dispatch('fetchProvince');
    this.$store.dispatch('fetchDistrict');
  },
};
</script>
<style scoped>
.add-hotel {
  padding: 0 10%;
}
.add-hotel__title {
  text-align: center;
}
.add-hotel__select-info {
  width: 100%;
}
</style>