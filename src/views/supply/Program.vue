<style lang="css">

.el-form-item {
    width: 350px;
}

</style>

<template lang="html">

<el-main>
    <h3>新工程</h3>
    <h4>工程参数</h4>
    <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <el-form-item label="工程名称" prop="name">
            <el-input lazy v-model="form.name" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="工程地址" prop="address" style="width:100%">

            <el-input v-model="form.desc" style="width:350px;"></el-input>
        </el-form-item>
    </el-form>
    <h4>工程单位</h4>
    <el-button @click="formVisible=true">新建单位信息</el-button>
    <el-form>
        <el-form-item label="建设单位">
            <el-select v-model="form.constructer" filterable remote :remote-method="handleRemoteQuery('constructer')">
                <el-option v-for="(constructer,index) in constructers" :key="index" :label="constructer.name" :value="constructer.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="施工单位">
            <el-select v-model="form.builder" filterable remote :remote-method="handleFilterBuilder">
                <el-option v-for="(builder,index) in builders" :key="index" :label="builder.name" :value="builder.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="监理单位">
            <el-select v-model="form.supervisor" filterable remote :remote-method="handleFilterSupervisor">
                <el-option v-for="(supervisor,index) in supervisors" :key="index" :label="supervisor.name" :value="supervisor.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="设计单位">
            <el-select v-model="form.designer" filterable remote :remote-method="handleFilterDesigner">
                <el-option v-for="(designer,index) in designers" :key="index" :label="designer.name" :value="designer.name">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
    {{unitForm}}
    <el-dialog title="添加单位" :visible.sync="formVisible">
        <el-form :model="unitForm" ref="unitForm" :rules="unitFormRules">
            <el-form-item label="单位类型" label-width="80px" prop="type">
                <el-select v-model="unitForm.type" placeholder="请选择单位类型">
                    <el-option label="建设单位" value="constructer"></el-option>
                    <el-option label="施工单位" value="builder"></el-option>
                    <el-option label="监理单位" value="supervisor"></el-option>
                    <el-option label="设计单位" value="designer"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位名称" label-width="80px" prop="name">
                <el-input v-model="unitForm.name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="formVisible=false">取 消</el-button>
            <el-button type="primary" @click="submitForm('unitForm')">确 定</el-button>
        </div>
    </el-dialog>
</el-main>

</template>

<script>

import api from '@/api/crop'
export default {
    data: function() {
        return {
            form: {
                name: '',
                address: '',
                builder: '',
                client: '',
                desc: '',
                constructer: '',
                supervisor: '',
                designer: ''
            },
            unitForm: {
                type: '',
                name: ''
            },
            unitFormRules: {
                name: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }, {
                    min: 2,
                    max: 20,
                    message: '长度在 2 到 20 个字符',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择企业类型',
                    trigger: 'change'
                }]
            },
            formVisible: false,
            constructers: [],
            builders: [],
            supervisors: [],
            designers: []
        }
    },
    methods: {
        handleRemoteQuery: function(type) {
            let that = this
            return async function(query) {
                if (query !== '') {
                    let resp = await api.fetchCropByType({
                        type: type,
                        query: query
                    })
                    that.constructers = resp.data.map(item => ({
                        type: item.type,
                        name: item.name
                    }))
                } else {
                    that.constructers = []
                }
            }
        },
        handleFilterConstructer: function() {
            let that = this
            return async function(query) {
                if (query !== '') {
                    let resp = await api.fetchCropByType({
                        type: 'constructer',
                        query: query
                    })
                    console.log(that.constructers)
                    that.constructers = resp.data
                } else {
                    that.constructers = []
                }
            }
        },
        handleFilterBuilder: function() {
            let that = this
            return async function(query) {
                if (query !== '') {
                    let resp = await api.fetchCropByType({
                        type: 'builder',
                        query: query
                    })
                    that.builders = resp.data
                } else {
                    that.builders = []
                }
            }
        },
        handleFilterSupervisor: function() {
            let that = this
            return async function(query) {
                if (query !== '') {
                    let resp = await api.fetchCropByType({
                        type: 'supervisor',
                        query: query
                    })
                    that.supervisors = resp.data
                } else {
                    that.supervisors = []
                }
            }
        },
        handleFilterDesigner: function() {
            let that = this
            return async function(query) {
                if (query !== '') {
                    let resp = await api.fetchCropByType({
                        type: 'designer',
                        query: query
                    })
                    that.designers = resp.data
                } else {
                    that.designers = []
                }
            }
        },
        submitForm: function(formName) {
            const targetForm = this.$refs[formName]
            targetForm.validate(valid => {
                if (valid && this.handlerSubmitUnitForm()) {
                    this.$notify({
                        title: '成功',
                        message: '成功',
                        type: 'success',
                        duration: 2000
                    })
                    targetForm.resetFields()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        handlerSubmitUnitForm: async function() {
            const resp = await api.createCrop({
                type: this.unitForm.type,
                name: this.unitForm.name
            })
            console.log(resp.data)
            if (resp.status === 200) {
                this.formVisible = false
                return true
            } else {
                return false
            }
        }
    }
}

</script>
