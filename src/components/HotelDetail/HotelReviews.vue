<template>
    <el-container>
        <el-main>
            <el-row class="review-row">
                <div class="review-header">
                     <div style="font-size:24px, font-weight:600">Bài đánh giá Khách sạn từ du khách</div>
                    <el-button @click="postReview(idHotel)" type="warning">Đăng bài review</el-button>
                </div>
                <div v-for="review of reviews" :key="review.id" class="review-body">
                    <el-col :span="6" class="review-detail">
                        <div class="review-rating">{{review.rating}}.0</div>
                        <div class="review-customer">Khách: {{reviewForm.customerName}}</div>
                    </el-col>
                    <el-col :span="18" class="review-content">
                        <div class="review-content-tag">{{reviewForm.tag}}</div>
                        <div class="review-content-body">
                            {{review.content}}
                        </div>
                        
                    </el-col>
                </div>
            </el-row>
            
        </el-main>
    </el-container>
</template>

<script>
export default {

    props:['idHotel'],
    data() {
        return {
            reviewForm: {
                rating:2,
                customerName:'Gia Văn',
                content: 'Đẹp, phòng quyến rũ, view thoáng!!!',
                tag:'Tuyệt vời'
            }
        }
    },
    methods: {
        postReview(id) {
            this.$router.push(`/review/${id}`)
        }
    },
    created() {
        
        this.$store.dispatch('fetchReviews',this.idHotel)
    },
    computed: {
        reviews() {
            return this.$store.state.reviews
        },
        
    }
}
</script>

<style scoped>
    .review-content-tag {
        font-weight: 600;
        font-size: 18px
    }
    .review-content-body {
        font-size: 14px;
        padding-top: 20px;
        color: #4e4e4e;
    }
    .review-content {
        background-color: #f5f5f5;
        padding: 30px;
        border-radius: 15px;
    }
    .review-customer {
        font-size: 14px;
        font-weight: 600;
        padding: 10px 0;
    }
    .review-rating {
        font-size: 36px;
        color: #488bf8
    }
    .review-body {
        display: flex;
        align-items: center;
        padding: 30px 10px;
    }
    .review-row {
        width: 80%;
        margin: 0 auto;
        padding-top: 40px;
        border-top: 1px solid rgb(221,223,226);
    }
    .review-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>