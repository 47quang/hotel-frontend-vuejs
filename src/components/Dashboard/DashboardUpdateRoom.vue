<template>
  <div class="room-form">
    <i class="el-icon-back add-room__back" @click="backRoomListing"></i>
    <el-divider><h3 class="form__title">Cập Nhật Thông Tin</h3></el-divider>
    <el-form ref="form-room" :model="room">
      <!-- Room Name -->
      <el-form-item>
        <div>
          <h4 class="form__description-title">Đặt tên cho phòng</h4>
          <h4 class="form__description-content">
            Hãy tận dụng, và làm cho nó nghe có vẻ hấp dẫn. Đừng lo lắng, chúng tôi sẽ tạo các ngôn
            ngữ khác bằng mẫu dịch chuẩn.
          </h4>
        </div>
        <el-card shadow="hover">
          <el-input v-model="room.name" maxlength="100" show-word-limit></el-input>
        </el-card>
      </el-form-item>
      <!-- Room Des. -->
      <el-form-item>
        <h4 class="form__description-title">Mô tả</h4>
        <h4 class="form__description-content">
          Những đặc điểm nổi bật của khách sạn để thu hút du khách.
        </h4>
        <el-card shadow="hover">
          <el-input type="textarea" :rows="4" maxlength="5000" show-word-limit v-model="room.description"></el-input>
        </el-card>
      </el-form-item>
      <!-- Room Capacity -->
      <el-form-item>
        <div>
          <h4 class="form__description-title">Sức chứa</h4>
          <h4 class="form__description-content">
            Số lượng người tối đa có thể ngủ thoải mái theo số lượng giường và sofa cung cấp.
          </h4>
        </div>
        <el-card shadow="hover">
          <el-input-number v-model="room.capacity" :min="0" autosize></el-input-number>
        </el-card>
      </el-form-item>
      <!-- Room Stock -->
      <el-form-item>
        <div>
          <h4 class="form__description-title">Số lượng phòng</h4>
          <h4 class="form__description-content">
            Nếu chỗ ở của bạn là phòng gác mái hoặc studio, số lượng phòng ngủ là 0.
          </h4>
        </div>
        <el-card shadow="hover">
          <el-input-number v-model="room.stock" :min="0"></el-input-number>
        </el-card>
      </el-form-item>
      <!-- Room Pricing -->
      <el-form-item
        prop="regularPrice"
        :rules="[
          { required: true, message: 'Price is required' },
          { type: 'number', message: 'Money must be a number' },
        ]"
      >
        <div>
          <h4 class="form__description-title">Giá thông thường</h4>
          <h4 class="form__description-content">
            Vui lòng nhập giá mỗi đêm của quý đối tác cho chỗ nghỉ này. Nếu quý đối tác đang dùng
            người quản lý kênh thì chúng tôi sẽ đồng bộ các giá này giữa các nền tảng một khi đã
            khớp giá.
          </h4>
        </div>
        <el-card shadow="hover">
          <el-input type="regularPrice" v-model.number="room.regularPrice" clearable>
            <template slot="append">VND</template>
          </el-input>
        </el-card>
      </el-form-item>
      <!-- Room Sale Price -->
      <el-form-item
        prop="regularPrice"
        :rules="[
          { required: true, message: 'Price is required' },
          { type: 'number', message: 'Money must be a number' },
        ]"
      >
        <div>
          <h4 class="form__description-title">Giá giảm</h4>
          <h4 class="form__description-content">
            Vui lòng nhập giá giảm mỗi đêm của quý đối tác cho chỗ nghỉ này. Nếu quý đối tác đang
            dùng người quản lý kênh thì chúng tôi sẽ đồng bộ các giá này giữa các nền tảng một khi
            đã khớp giá.
          </h4>
        </div>
        <el-card shadow="hover">
          <el-input type="regularPrice" v-model.number="room.salePrice" clearable>
            <template slot="append">VND</template>
          </el-input>
        </el-card>
      </el-form-item>
      <!-- Upload images -->
      <el-form-item>
        <div>
          <h4 class="form__description-title">Hình ảnh</h4>
          <h4 class="form__description-content">
            Hình ảnh rất quan trọng đối với du khách. Hãy đăng càng nhiều ảnh chất lượng cao càng
            tốt. Bạn có thể thêm ảnh về sau. Agoda có sẵn những bí kíp đăng tải ảnh chất lượng để
            thu hút nhiều đặt phòng hơn
          </h4>
          <h5 class="form__description-helper">
            * Mẹo: tối thiểu 800x600 px — lý tưởng 2048x1536 px
          </h5>
        </div>
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
            <img class="el-upload-list__item-thumbnail" :src="file.url" :fit="'contain'" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <div slot="tip" class="el-upload__tip">định dạng jpg/png và kích thước ảnh nhỏ hơn 5MB</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- Form Submission -->
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('form-room')"
          class="form__btn--submit form__btn"
          >Đăng Bài</el-button
        >
        <el-button @click="resetForm('form-room')" class="form__btn--goback form__btn"
          >Quay Lại</el-button
        >
      </el-form-item>
    </el-form>
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
    async submitForm(formName) {
      const files = this.$refs.upload.uploadFiles.filter(f => f.raw).map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.room.images = this.$refs.upload.uploadFiles.filter(f => !f.raw).map(f => f.url).concat(data);
      
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.$store.dispatch('updateRoomById', {roomId: this.$route.params.roomId, room: this.room});
          this.$message({
            showClose: true,
            message: 'Đã cập nhật phòng thành công.',
            type: 'success',
          });
          await this.$store.dispatch('fetchRoomsByHotelId', this.$route.params.id);
          this.$router.push(`/hotel/${this.$route.params.id}/room`);
        } else {
          this.$message({
            showClose: true,
            message: 'Đã có lỗi xảy ra, vui lòng thử lại.',
            type: 'error',
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$confirm('Bài viết chưa được lưu. Tiếp tục?', 'Cảnh Báo', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning',
      })
        .then(() => {
          this.$refs[formName].resetFields();
          this.$router.push(`/hotel/${this.$route.params.id}/room`);
        })
        .catch(() => {
          return;
        });
    },
    handleRemove(file) {
      const index = this.fileList.findIndex(f => f.url == file.url);
      this.fileList.splice(index, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleOnChange(file, fileList){
      this.fileList = fileList;
    },
    parseFormData(files) {
      let formData = new FormData();
      for (const file of files) {
        formData.append('image', file);
      }
      return formData;
    },
    backRoomListing() {
      this.$router.push(`/hotel/${this.$route.params.id}/room`);
    }
  },
  computed: {
    room(){
      return this.$store.state.roomById;
    }
  },
  watch: {
    '$store.state.roomById': function(nVal) {
      this.fileList = nVal.images.map((i, index) => ({
        name: `${nVal.name.normalize()}-image-${index}`,
        url: i,
      }));
    }
  },
  async created() {
    await this.$store.dispatch('fetchRoomById', this.$route.params.roomId);
  },
};
</script>
<style scoped>
.room-form {
  border-left: 1px solid #dddfe2;
  padding: 30px 10%;
}
.form__description-title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 700;
  line-height: 1.1;
}
.form__description-content {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.form__title {
  font-size: 24px;
  margin: 8px 0;
  text-align: center;
}
.form__btn {
  margin-left: 5px;
  float: right;
  min-height: 42px;
  min-width: 180px;
  text-transform: uppercase;
  margin-bottom: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.form__btn--submit {
  color: #fff;
  background-color: #1174a6;
  border-color: #1174a6;
}
.form__btn--goback {
  color: #1174a6;
  background-color: #fff;
  border-color: #1174a6;
}
.form__submit:hover {
  text-decoration: none;
  color: #fff;
  background-color: #0c5478;
  border-color: #0b4d6e;
}
.form__description-helper {
  color: #999;
  font-size: 12px;
  margin: 0 0 10px;
}
.form__add-attribute {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.form__add-attribute-select {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.attribute-select__selector {
  width: 50%;
}
.add-room__back{
  font-size: 25px;
  cursor: pointer;
}
</style>
