<style lang="css">

.el-form-item {
    width: 350px;
}

</style>

<template lang="html">

<el-main>
    <h3>新工程</h3>
    <h4>工程参数</h4>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="top">
        <el-form-item label="工程名称" prop="name">
            <el-input lazy v-model="form.name" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="工程地址" prop="address" style="width:100%">
            <myarea @select="haha"></myarea>
            <el-input v-model="form.desc" style="width:350px;"></el-input>
        </el-form-item>
    </el-form>
    <h4>工程单位</h4>
    <el-form>
        <el-form-item label="建设单位" prop="name">
            <el-input lazy v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="建设单位" prop="name">
            <el-input lazy v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="建设单位" prop="name">
            <el-input lazy v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="建设单位" prop="name">
            <el-input lazy v-model="form.name"></el-input>
        </el-form-item>
    </el-form>
</el-main>

</template>

<script>

import myarea from 'vue-myarea'

export default {
    data: function() {
        return {
            form: {
                name: '',
                address: '',
                builder: '',
                client: '',
                desc: ''
            },
            rules: {},
            options2: [{
                label: '江苏',
                cities: []
            }, {
                label: '浙江',
                cities: []
            }],
            props: {
                value: 'label',
                children: 'cities'
            }
        }
    },
    components: {
        myarea
    },
    methods: {
        handleItemChange(val) {
            console.log('active item:', val);
            setTimeout(_ => {
                if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
                    this.options2[0].cities = [{
                        label: '南京'
                    }];
                } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
                    this.options2[1].cities = [{
                        label: '杭州'
                    }];
                }
            }, 300);
        }
    }
}

</script>
