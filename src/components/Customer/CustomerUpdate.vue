<template>
    <div>
        <CusNavbar></CusNavbar>
        <el-container>
            <el-main>
                <el-row class="UpdateCustomer">
                    <el-col class="UpdateCustomer_List" :span="6">
                        <div class="UpdateCustomer_Item">
                            <i class="el-icon-user"></i>
                            Hồ sơ</div>
                        <div class="UpdateCustomer_Item"><i class="el-icon-time"></i>
                            Lịch sử đặt phòng</div>
                    </el-col>
                    <el-col class="UpdateCustomer_Detail" :span="18">
                        <div style="font-size:24px; padding: 0 0 20px 0">Thông Tin Người Dùng</div>
                        <div class="customer-name-wrapper">
                            <div>
                                <div class="customer-title">Họ & Tên</div>
                                <div class="customer">{{form.lastname}}  {{form.firstname}}</div>
                            </div>
                            <el-button type="text" @click="dialogNameVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Name" :visible.sync="dialogNameVisible">
                                <el-form :model="form">
                                    <el-form-item label="Họ" :label-width="formLabelWidth">
                                        <el-input v-model="form.lastname" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Tên" :label-width="formLabelWidth">
                                        <el-input v-model="form.firstname" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogNameVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogNameVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Username</div>
                                <div class="customer">{{form.username}}</div>
                            </div>
                            <el-button type="text" @click="dialogUserNameVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="UserName" :visible.sync="dialogUserNameVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Username" :label-width="formLabelWidth">
                                        <el-input v-model="form.username" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogUserNameVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogUserNameVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                            
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Email</div>
                                <div class="customer">{{form.email}}</div>
                            </div>
                            <el-button type="text" @click="dialogMailVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Mail" :visible.sync="dialogMailVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Email" :label-width="formLabelWidth">
                                        <el-input v-model="form.email" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogMailVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogMailVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Số điện thoại</div>
                                <div class="customer">{{form.phone}}</div>
                            </div>
                            <el-button type="text" @click="dialogPhoneVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Phone" :visible.sync="dialogPhoneVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Phone" :label-width="formLabelWidth">
                                        <el-input v-model="form.phone" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogPhoneVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogPhoneVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <div class="customer-wrapper">
                            <div>
                                <div class="customer-title">Address</div>
                                <div class="customer">{{form.address}}</div>
                            </div>
                            <el-button type="text" @click="dialogAddressVisible = true">Chỉnh sửa</el-button>
                            <el-dialog title="Address" :visible.sync="dialogAddressVisible">
                                <el-form :model="form">
                                    
                                    <el-form-item label="Address" :label-width="formLabelWidth">
                                        <el-input v-model="form.address" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogAddressVisible = false">Cancel</el-button>
                                <el-button type="primary" @click="dialogAddressVisible = false">Confirm</el-button>
                            </span>
                            </el-dialog>
                        </div>
                        <el-button type="primary" @click="updateCustomer">Lưu</el-button>
                        
                        
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <Footer></Footer>
    </div>
</template>

<script>
import CusNavbar from '../../components/CusNavbar'
import Footer from '../../components/Footer'
export default {
    data() {
        return {
            dialogNameVisible: false,
            dialogUserNameVisible: false,
            dialogMailVisible: false,
            dialogAddressVisible: false,
            dialogPhoneVisible: false,
            form: {
                lastname: this.$store.state.myCustomer.lastname,
                firstname: this.$store.state.myCustomer.firstname,
                phone: this.$store.state.myCustomer.phone,
                username: this.$store.state.myCustomer.username,
                password: this.$store.state.myCustomer.password,
                address: this.$store.state.myCustomer.address,
                email: this.$store.state.myCustomer.email,
                avatar: this.$store.state.myCustomer.avatar,
                dateOfBirth: this.$store.state.myCustomer.dateOfBirth,
                chatId: this.$store.state.myCustomer.chatId,
            },
            customerId: this.$store.state.myCustomer.id,
            formLabelWidth: '80px'
        }
    },
    components: {
        CusNavbar,
        Footer
    },
    created() {
        console.log(this.$store.state.myCustomer)
    },
    computed: {
        myCustomer() {
            return this.$store.state.myCustomer
        }
    },
    methods: {
        updateCustomer() {
            this.$store.dispatch('updateCustomer', {
                form: this.form,
                id: this.customerId
            })
        }
    }
}
</script>

<style scoped>
    .fix {
        font-weight: 600;
        cursor: pointer
    }
    .customer-title {
        font-weight: 600;
        padding: 5px 0;
    }
    .customer {
        padding: 5px 0;
    }
    .customer-name-wrapper {
        background-image: linear-gradient(90deg,#82b4ff,#b5d2ff);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px
    }
    .customer-wrapper {
        background-color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px
    }
    
    .UpdateCustomer_Item {
        padding: 20px;
        color: #5392f9;
        font-size: 18px;
        width: 70%;
        margin: 0 0 0 80px;
        cursor: pointer;
        font-weight: 600;
    }
    .UpdateCustomer_Item:hover {
        background-color: #5392f9;
        color:white
    }
    .UpdateCustomer_Detail {
        padding: 20px 40px;
         background-color: rgba(189, 180, 180, 0.1);
    }
    .UpdateCustomer_List {
        padding: 20px;
        box-shadow: 9px 0px 6px 0px #e9ebee;
        background: linear-gradient(90deg,#f8f7f9,#fff);
    }
</style>