<style lang="scss">

h3 {
    border-left: 3px solid #888;
    padding-left: 10px;
}

h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid #888;
}

.el-form--label-top .el-form-item__label {
    padding: 0;
}

.el-row {
    margin-bottom: 0;
}

.el-col {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
}

.title .el-col {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.title .el-col:last-child {
    border-right: 1px solid #ddd;
}

.body .el-col {
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

.body .el-col:last-child {
    border-right: 1px solid #ddd;
}

</style>

<template lang="html">

<el-main>
    <h3>预受理</h3>
    <!-- 受理委托 -->
    <h4>委托受理</h4>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="top">
        <el-form-item label="方案名称" prop="name">
            <el-input lazy v-model="form.name" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item label="所属工程" prop="program" inline-message="true">
            <el-select v-model="form.program" filterable remote reserve-keyword placeholder="请查找并输入工程名" :remote-method="remoteMethod" :loading="loading">
                <el-option v-for="item in temp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <router-link to="/supply/program?back=true">
                <el-button><i class="el-icon-plus"></i> 添加新工程</el-button>
            </router-link>
        </el-form-item>
        <el-form-item label="委托方" prop="builder">
            <el-select v-model="form.builder" placeholder="请填写【所属工程】" disabled>
                <el-option v-for="item in temp" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="委托方需要确定【所属工程】才能填写" placement="right">
                <i class="el-icon-question" style="font-size:24px;"></i>
            </el-tooltip>
        </el-form-item>
        <el-form-item label="委托人" prop="client">
            <el-select v-model="form.client" filterable remote reserve-keyword placeholder="请查找并输入委托人" :remote-method="remoteMethod" :loading="loading">
                <el-option v-for="item in temp" :key="item.value" :label="item.label" :value="item.value">
                    <div class="name">{{ item.value }}</div>
                    <span class="addr">{{ item.label }}</span>
                </el-option>
            </el-select>
            <router-link to="/supply/builder">
                <el-button><i class="el-icon-plus"></i>添加委托人</el-button>
            </router-link>
        </el-form-item>
    </el-form>
    <!-- 受理委托 -->
    <h4>委托项目</h4>
    <el-row class="title">
        <el-col :span="4">
            材料/项目名称
        </el-col>
        <el-col :span="2">
            现场检测
        </el-col>
        <el-col :span="2">
            生产厂家
        </el-col>
        <el-col :span="2">
            收费标准
        </el-col>
        <el-col :span="2">
            检测数量
        </el-col>
        <el-col :span="2">
            检测类别
        </el-col>
        <el-col :span="2">
            项目单位
        </el-col>
        <el-col :span="2">
            项目单位
        </el-col>
        <el-col :span="2">
            项目单位
        </el-col>
    </el-row>
    <el-row class="body">
        <el-form :inline="true" :model="formInline">
        </el-form>
    </el-row>

</el-main>

</template>

<script>

export default {
    data: function() {
        return {
            loading: false,
            temp: [],
            form: {
                name: '',
                program: '',
                builder: '',
                client: ''
            },
            formInline: {
                user: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请务必填写方案',
                    trigger: 'blur'
                }, {
                    max: 30,
                    message: '长度不要超过30字节',
                    trigger: 'blur'
                }],
                program: {
                    required: true,
                    message: '请务必填写所属工程',
                    trigger: 'change'
                },
                builder: {
                    required: true,
                    message: '请务必选择施工方',
                    trigger: 'change'
                },
                client: {
                    required: true,
                    message: '请务必选择委托人',
                    trigger: 'change'
                }
            },
            states: ['北京项目一Ａ', '北京项目一B', '长沙项目一Ａ', '长沙项目二Ａ', '衡阳项目一Ａ', '衡阳项目二Ｃ']
        }
    },
    mounted: function() {
        this.list = this.states.map(item => {
            return {
                value: item,
                label: item
            }
        })
    },
    methods: {
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.temp = this.list.filter(item => {
                        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
                    })
                }, 200)
            } else {
                this.temp = []
            }
        }
    }
}

</script>
