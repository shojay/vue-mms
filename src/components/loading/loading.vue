<template>
  <div class="loading" :style='{ marginTop: mt }'>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "loading",
  props: {
      mt: {
          type: String,
          default: '100px'
      }
  }
};
</script>

<style lang="scss" scoped>
.loading{
    width: 150px;
    height: 15px;
    margin: 0 auto;
    text-align: center;
}
.loading span{
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    background: #bbbbbb;
    -webkit-animation: load 1.04s ease infinite;
}
.loading span:last-child{
    margin-right: 0px; 
}
@-webkit-keyframes load{
    0%{
        opacity: 1;
        -webkit-transform: scale(1.2);
    }
    100%{
        opacity: .2;
        -webkit-transform: scale(.2);
    }
}
.loading span:nth-child(1){
    -webkit-animation-delay:0.13s;
}
.loading span:nth-child(2){
    -webkit-animation-delay:0.26s;
}
.loading span:nth-child(3){
    -webkit-animation-delay:0.39s;
}
.loading span:nth-child(4){
    -webkit-animation-delay:0.52s;
}
.loading span:nth-child(5){
    -webkit-animation-delay:0.65s;
}
</style>
