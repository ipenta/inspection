<style lang="css">

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

.body .el-col input {
    margin: 0 3px;
}

</style>

<template lang="html">

<div class="linetable">
    <el-row style="margin-bottom:10px;">
        <el-col :span="4">
            <router-link :to="{ name: '', params: {} }">
                <el-button @click="add" style="float:left;"><i class="el-icon-plus"></i>新增</el-button>
            </router-link>
        </el-col>
        <el-col :span="6">
            <el-switch v-model="value3" active-text="是否需要方案">
            </el-switch>
            &nbsp;&nbsp;&nbsp;
            <router-link :to="{ name: '', params: {} }">
                <el-button>上传方案</el-button>
            </router-link>
        </el-col>
    </el-row>
    <el-row class="title">
        <el-col :span="4">
            材料/项目名称
        </el-col>
        <el-col :span="2">
            生产厂家
        </el-col>
        <el-col :span="2">
            检测类型
        </el-col>
        <el-col :span="2">
            生产厂家
        </el-col>
        <el-col :span="2">
            属性
        </el-col>
        <el-col :span="2">
            收费标准
        </el-col>
        <el-col :span="2">
            检测数量
        </el-col>
        <el-col :span="2">
            项目单位
        </el-col>
    </el-row>
    <el-row class="body" v-for="(item,itemIndex) in items" :key="itemIndex">
        <el-col :span="4">
            <el-select v-model="" @change="onSelectedDetection($event,item)">
                <el-option v-for="(detection,id) in detections" :key="id" :value="detection.id" :label="detection.name">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="2">
            <el-input :value="getItemInfo(item.detection_id).name"></el-input>
        </el-col>
        <el-col :span="2">
            <el-input :value="getItemInfo(item.detection_id).type"></el-input>
        </el-col>
        <el-col :span="2">
            <span>生产厂家</span>
        </el-col>
        <el-col :span="2">
            <el-input :value="getItemInfo(item.detection_id).type" disabled></el-input>
        </el-col>
        <el-col :span="2">
            <el-input :value="getItemInfo(item.detection_id).price" disabled></el-input>
        </el-col>
        <el-col :span="2">
            <span>3</span>
        </el-col>
        <el-col :span="2">
            <el-input :value="getItemInfo(item.detection_id).unit" disabled></el-input>
        </el-col>
    </el-row>
    {{items}}

</div>

</template>

<script>

import api from '@/api/detection'
export default {
    data: function() {
        return {
            items: [],
            detections: {},
            value3: ''
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const resp = await api.fetchDetection()
            this.detections = resp.data.detection
        },
        onSelectedDetection(event, item) {
            item.detection_id = event
        },
        add() {
            this.items.push({
                detection_id: null,
                name: '',
                type: '',
                price: 0,
                unit: '',
                mode: '',
                amount: ''
            })
        },
        getItemInfo(detectionId) {
            if (!detectionId) return ''
            return this.detections.find(d => d.id === detectionId)
        }
    }
}

</script>
