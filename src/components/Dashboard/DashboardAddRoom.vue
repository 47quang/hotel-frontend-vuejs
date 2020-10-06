<template>
  <div class="location">
    <el-divider><h3 class="form__title">Thông tin cơ bản</h3></el-divider>
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
          <el-input v-model="room.name" maxlength="50" show-word-limit></el-input>
        </el-card>
      </el-form-item>
      <!-- Room Description -->
      <el-form-item>
        <div>
          <h4 class="form__description-title">Mô tả khách sạn của bạn</h4>
          <h4 class="form__description-content">
            Những đặc điểm nổi bật của khách sạn để thu hút du khách.
          </h4>
        </div>
        <el-card shadow="hover">
          <el-input
            v-model="room.description"
            type="textarea"
            rows="4"
            maxlength="5000"
            show-word-limit
          ></el-input>
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
      <!-- Add Attributes -->
      <el-form-item>
        <el-row :gutter="24" class="form__add-attribute">
          <div>
            <h4 class="form__description-title">Tiêu chuẩn</h4>
            <h4 class="form__description-content">
              Các tiện nghi này có trong hầu hết các chỗ nghỉ thành công của chúng tôi.
            </h4>
          </div>
          <el-row v-for="(attribute, index) in room.attributes" :key="index" :style="{marginBottom: '20px'}">
            <el-col :span="10" class="form__add-attribute-select">
              <el-form-item label="Thuộc Tính:">
                <el-select
                  class="attribute-select__selector"
                  v-model="attribute.attributeId"
                  clearable
                  @change="handleSelectAttribute(index)"
                  placeholder="Vui Lòng Thuộc Tính của Phòng"
                >
                  <el-option
                    v-for="attr in attributes"
                    :key="attr.id"
                    :label="attr.name"
                    :value="attr.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="form__add-attribute-select">
              <el-form-item label="Thuộc Tính Phụ:">
                <el-select
                  class="attribute-select__selector"
                  v-model="attribute.attributeOptionId"
                  clearable
                  placeholder="Vui Lòng Thuộc Tính Phụ"
                >
                  <el-option
                    v-for="option in attribute.attributeOptions"
                    :key="option.id"
                    :label="option.name"
                    :value="option.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-circle-close" @click="handleRemoveAttribute(attribute)"></i>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <strong @click="handleAddAttribute">Thêm thuộc tính phòng</strong>
        </el-row>
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
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file, room.images)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
          <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 5MB</div>
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
      room: {
        hotelId: this.$route.params.id,
        name: '',
        description: '',
        stock: 0,
        regularPrice: 0,
        salePrice: 0,
        capacity: 0,
        attributes: [
          {
            attributeId: '',
            attributeOptionId: '',
            attributeOptions: [],
          },
        ],
        images: [],
      },
      amount: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    };
  },
  computed: {
    attributes() {
      return this.$store.state.attributes;
    },
  },
  methods: {
    async submitForm(formName) {
      const files = this.$refs.upload.uploadFiles.map((f) => f.raw);
      const formData = this.parseFormData(files);
      const { data } = await this.$store.dispatch('uploadImage', formData);
      this.room.images = data;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('this room: ', this.room);
          this.$store.dispatch('createRoom', this.room);
          this.$message({
            showClose: true,
            message: 'Đã cập nhật phòng thành công.',
            type: 'success',
          });
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
    handleAddAttribute(){
      this.room.attributes.push({
        attributeId: '',
        attributeOptionId: '',
      })
    },
    handleRemoveAttribute(attribute){
      const {attributeId, attributeOptionId} = attribute;
      const index = this.room.attributes.findIndex(a => a.attributeId === attributeId && a.attributeOptionId === attributeOptionId);
      if (index === undefined) return;
      this.room.attributes.splice(index, 1);
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
    handleRemove(file, fileList) {
      console.log('image uploaded: ', file);
      console.log('list images: ', fileList);
      console.log('list hotel images: ', this.room.images);
      this.$refs.upload.clearFiles();
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
    async handleSelectAttribute(index) {
      const attribute = this.room.attributes[index];
      if (attribute.attributeId === undefined) return;
      attribute.attributeOptions = await this.$store.dispatch('fetchAttributeOptionById', attribute.attributeId);
      this.$set(this.room.attributes, index, attribute); //Khi thay đổi data là một object trong 1 array thì sẽ không reactive
    },
  },
  async mounted() {
    this.$store.dispatch('fetchAttributes');
  },
};
</script>
<style scoped>
.location {
  padding: 30px;
  border-left: 1px solid #dddfe2;
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
</style>
