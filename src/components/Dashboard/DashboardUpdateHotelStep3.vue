<template>
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
      multiple
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
      <div slot="tip" class="el-upload__tip">định dạng jpg/png và kích thước ảnh nhỏ hơn 5MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button plain class="form__submit" @click="handleUpload">Cập nhật</el-button>
  </el-form-item>
</template>