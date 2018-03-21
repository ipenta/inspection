<style lang="css">

</style>

<template lang="html">

<div class="layout">
    <el-menu router :default-active="$route.path" mode="horizontal">
        <el-menu-item index="/proacceptance">受理登记</el-menu-item>
    </el-menu>
    <router-view></router-view>
</div>

</template>

<script>

export default {}

</script>
