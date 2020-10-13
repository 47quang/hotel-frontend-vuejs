<template>
  <div class="owner-homepage">
    <owner-header />
    <carousel-info />
    <instruction />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer'
import OwnerHeader from '../components/Owner/OwnerHeader'
import CarouselInfo from '../components/Owner/CarouselInfo'
import Instruction from '../components/Owner/Instruction'
export default {
  components: {
    Footer,
    OwnerHeader,
    CarouselInfo,
    Instruction
  },
  methods: {}
};
</script>

<style scope>

.el-button--danger {
  background-color: #ff567d !important;
  border-color: #ff567d !important;
  font-weight: 700 !important;
  text-transform: uppercase;
}

/* Sign In Form */
.signin-dialog {
  border-radius: 3px;
  transition: transform .3s ease-out;
  transform: translate(0);
  margin-top: 80px;
  margin: 30px auto;
  width: 800px;
  height: max-content;
  padding: 0 30%;
}
.signin-button-form {
  text-transform: initial;
  min-height: 42px;
  width: 100%;
}

.signin-dialog .signin-dialog-content{
  padding: 0 50px 20px;
  position: relative;
}

.signin-dialog .signin-dialog-content .form-item{
  margin-bottom: 0px;
}
.el-dialog__header {
  padding: 20px 20px 0px !important;
}
.el-dialog__title {
  padding: 20px 30px;
}
/* .el-dialog__body {
  padding: 0px !important;
} */
.el-dialog__footer {
  border-top: 1px solid #e5e5e5;
}
.dialog-footer {
  text-align: center;
  padding: 0 30px;
}

#signup-button-form {
  text-transform: initial;
  color: #ff567d !important;
  background-color: #fff !important;
  border-color: #ff567d !important;
  margin-left: 10px;
}

@media (min-width: 768px) and (max-width: 991px) {
  html {
    width: 992px;
  }
}
@media (max-width: 768px) {
  html {
    width: 768px;
  }
}
</style>