<template>
  <div>
    <el-form-item>
      <h4 class="form__description-title">Đặt tên cho Khách Sạn</h4>
      <el-card shadow="hover">
        <el-input v-model="hotel.name" maxlength="100" show-word-limit></el-input>
      </el-card>
    </el-form-item>
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
  </div>
</template>
<script>
export default {
  props: ['hotel'],
}
</script>