<template>
    <div>
        <CusNavBar></CusNavBar>
        <el-container>
            <el-main>
                <el-row class="postreview-row">
                    <el-divider><h2 class="Review-title">Đăng Bài Review Khách Sạn</h2></el-divider>
                    <div class=review-description>
                            <el-form ref="form" :model="review">
                                <el-form-item>
                                <h4 class="form__content-title">Chủ đề bài đăng</h4>
                                <el-select v-model="review.tagId" placeholder="Select">
                                    <el-option
                                    v-for="tag in tags"
                                    :key="tag.id"
                                    :label="tag.name"
                                    :value="tag.id">
                                    </el-option>
                                </el-select>
                                </el-form-item>
                                <el-form-item>
                                <h4 class="form__content-title">Nội dung bài đăng</h4>
                                <el-card shadow="hover">
                                    <el-input type="textarea" :rows="4"  maxlength="5000" show-word-limit v-model="review.content"></el-input>
                                </el-card>
                                </el-form-item>
                                <h3 style="margin: 50px 0 30px 0">Đánh giá Khách sạn</h3>
                                    <el-rate
                                        v-model="review.rating"
                                        :texts="['Oops!', 'Disappointed!', 'Normal!', 'Good!', 'Excellent!']"
                                        show-text>
                                    </el-rate>
                                <el-form-item>
                                    <h4 class="form__description-title">Hình ảnh</h4>
                                    <el-upload accept="image/png, image/jpeg, image/jpg" action="#" list-type="picture-card" :auto-upload="false" ref="upload">
                                        <i slot="default" class="el-icon-plus"></i>
                                        <div slot="file" slot-scope="{ file }">
                                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete" :on-remove="handleRemove(file, review.images)">
                                            <i class="el-icon-delete"></i>
                                            </span>
                                        </span>
                                        </div>
                                        <div slot="tip" class="el-upload__tip">định dạng jpg/png và kích thước ảnh nhỏ hơn 5MB</div>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="" />
                                    </el-dialog>
                                    <el-button type="primary"  round @click="handleUpload">Đăng bài</el-button>
                                    <el-button type="warning" round @click="goBack">Chi tiết khách sạn</el-button>
                                </el-form-item>
                                    
                                    
                            </el-form>
                    </div>
                </el-row>

            </el-main>
        </el-container>
        <Footer></Footer>
        
    </div>
</template>

<script>
import CusNavBar from '../components/CusNavbar'
import Footer from '../components/Footer'
export default {
    data() {
        return {
            idHotel: this.$route.params.id,
            review: {
                content:'',
                rating:null,
                images: [],
                tagId:null
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
        }
    },
    created() {
        this.$store.dispatch('fetchTags')
    },
    components: {
        CusNavBar,Footer
    },
    computed: {
        tags() {
            return this.$store.state.tags
        }
    },
    methods: {
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
            this.review.images = data;

            try {
                this.$store.dispatch('postReview', {
                    review: this.review,
                    idHotel: this.idHotel
                })
                this.alertSuccess();
                
            }
            catch(err) {
                this.alertErr()
            }
        },
        goBack() {
            this.$router.push(`/details/${this.idHotel}`)
        },
        handleRemove(file, fileList) {
            console.log( file);
            console.log( fileList);
            console.log( this.review.images);
        },
        alertSuccess() {
            this.$message({
                showClose: true,
                message: 'Đã thêm bài review',
                type: 'success'
            });
        },
        alertErr() {
            this.$message({
                showClose: true,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại',
                type: 'error'
            });
        },
        
    }
    
}
</script>

<style scoped>
    .form__description-title {
        font-size: 18px;
    }
    .form__content-title {
        font-size: 18px;
    }
    .postreview-row {
        margin: 0 auto;
        width: 80%;
    }
    .Review-title  {
        font-size: 28px
    }
</style>

<style >
    .review-title .el-divider__text {
        font-size: 24px
    }
</style>