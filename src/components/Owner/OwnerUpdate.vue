<template>
    <div>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <el-row>
                    <el-col :span="24">
                        <div >
                        <h3>Chọn/ Đổi hình đại diện hình đại diện trong hồ sơ (không bắt buộc)</h3>
                        <p>Tạo thiện cảm từ cái nhìn đầu tiên! Chúng tôi sẽ thêm hình đại diện vào hồ sơ của bạn và hiển thị cho khách hàng hay chủ nhà khác về sau.</p>
                        </div></el-col>
                </el-row>
                <el-row>
                     <el-col :span="24">
                        <div class="avatar">
                            Avatar
                        </div>
                    </el-col>
                </el-row>
                  <div style="padding: 20px 0">Chỉnh sửa thông tin</div>
                 <el-row>
                   
                     <el-col :span="12">
                        <div class="fullName">
                            Họ tên
                        </div>
                        <el-input  v-model="owner.fullname"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <div class="phone">
                            Số điện thoại
                        </div>
                         <el-input  v-model="owner.phone"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <div class="email">
                            Email
                        </div>
                         <el-input  v-model="owner.email"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <div class="address">
                            Địa chỉ
                        </div>
                         <el-input  v-model="owner.address"></el-input>
                    </el-col>
                </el-row>
                <el-button>Hủy</el-button>
                <el-button @click="saveInfo">Lưu</el-button>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>


<style scoped>
    .el-row{
        margin-bottom: 20px;
    }
    .grid-content {
    border-radius: 4px;
    min-height: 36px;
    background-color: burlywood;
    }
    .ed-main{
        background-color: #fcfcfc !important;
    }
</style>

<script>
export default {
    data(){
        return {
            owner:{
                    fullname: this.$store.state.curOwner.fullname,
                    phone:  this.$store.state.curOwner.phone,
                    address: this.$store.state.curOwner.address,
                    email: this.$store.state.curOwner.email
                },
                
        }
    },
    created(){
        console.log('created' ,this.$route.params)
    },
    mounted(){
        console.log('mounted', this.$store.state.curOwner.fullname)
    },
    computed: {
        // fullName(){
        //     return this.$store.state.curOwner.fullname
        // } 
    },
    methods: {
         async saveInfo() {
            await this.$store.dispatch('saveInfo', {
                owner: this.owner,
                id: this.$route.params.id
            })
        }
    }
    
}
</script>
