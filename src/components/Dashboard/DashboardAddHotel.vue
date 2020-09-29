<template>
  <div>
    <h1>HII</h1>
    <el-form ref="form" :model="hotel" label-width="200px">
      <el-form-item label="Tên Khách Sạn Của Bạn">
        <el-input v-model="hotel.name"></el-input>
      </el-form-item>
      <el-form-item label="Địa Chỉ">
        <el-input v-model="hotel.address"></el-input>
      </el-form-item>
      <el-form-item label="Thành Phố">
        <el-select v-model="hotel.provinceId" clearable placeholder="Vui Lòng Chọn Tỉnh Thành">
          <el-option
            v-for="item in 4"
            :key="item.value"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Quận/Huyện">
        <el-select v-model="hotel.districtId" clearable placeholder="Vui Lòng Chọn Quận Huyện">
          <el-option
            v-for="item in 4"
            :key="item.value"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input v-model="hotel.description"></el-input>
      </el-form-item>
      <el-form-item label="Hình ảnh">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :file-list="hotel.images">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  :on-remove="handleRemove(file, hotel.images)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 1MB</div>

        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return {
      hotel: {
        name: '',
        address: '',
        provinceId: 0,
        districtId: 0,
        description: '',
        images: [
          
        ],
        ownerId: 0
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log('image uploaded: ',file);
      console.log('list images: ', fileList);
      console.log('list hotel images: ', this.hotel.images);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
}
</script>