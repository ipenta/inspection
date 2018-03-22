<style lang="css">

.linetable {
    border-collapse: collapse;
}

.linetable td {
    font-size: 16px;
    height: 40px;
    width: 180px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
}

.linetable select,
.linetable input {
    height: 32px;
    width: 170px;
}

</style>

<template lang="html">

<div class="linetable">
    <div style="margin-bottom:20px;">
        <el-button @click="add">新增</el-button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        是否需要方案&nbsp;<el-switch v-model="needOpen" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
    </div>
    <table class="linetable" border="0">
        <thead>
            <tr>
                <td>材料/项目名称</td>
                <td>检测类别</td>
                <td>属性</td>
                <td>生产厂家</td>
                <td>收费标准</td>
                <td>数量</td>
                <td>计量单位</td>
                <td>总额</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, itemIndex) in items" v-bind:key="itemIndex">
                <td>
                    <el-select v-model="item.name" @change="onSelectedDetection($event,item)">
                        <el-option v-for="(v,k) in detections" :key="k" :label="v.name" :value="k">
                        </el-option>
                    </el-select>
                </td>
                <td>
                    <!-- <el-input v-model="getItemInfo(item.detection_id).type" placeholder="检测类别" readonly></el-input> -->
                    {{getItemInfo(item.detection_id).type}}
                </td>
                <td>
                    <!-- <el-input v-model="getItemInfo(item.detection_id).mode" placeholder="属性" readonly></el-input> -->
                    {{getItemInfo(item.detection_id).mode}}
                </td>
                <td>
                    <el-input v-model="item.mfrs" placeholder="生产厂家"></el-input>
                </td>
                <td>
                    <!-- <el-input v-model="getItemInfo(item.detection_id).price" placeholder="收费标准" readonly></el-input> -->
                    {{getItemInfo(item.detection_id).price}}
                </td>
                <td>
                    <el-input v-model="item.amount" placeholder="0" @input="onItemAmountInput($event, item)"></el-input>
                </td>
                <td>
                    <!-- <el-input v-model="getItemInfo(item.detection_id).unit" placeholder="计量单位" readonly></el-input> -->
                    {{getItemInfo(item.detection_id).unit}}
                </td>
                <td>
                    <el-input v-model="item.money" placeholder="总计"></el-input>
                </td>
            </tr>
            <tr v-if="!items.length">
                <td colspan="8" class="empty">尚未新增任何資料</td>
            </tr>
            <tr>
                <td colspan="7"></td>
                <td>{{ totalMoney }}</td>
            </tr>

        </tbody>
    </table>
</div>

</template>

<script>

import api from '@/api/detection'
export default {
    data: function() {
        return {
            items: [],
            detections: {},
            needOpen: '',
            totalMoney: 0
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
            item.detection_id = parseInt(event)
        },
        add() {
            this.items.push({
                detection_id: null,
                name: '',
                type: '',
                mfrs: '',
                price: 0,
                unit: '',
                mode: '',
                amount: '',
                money: ''
            })
        },
        getItemInfo(detectionId) {
            if (!this.isNumeric(detectionId) || detectionId === null) return ''
            return this.detections.find(d => d.id === parseFloat(detectionId))
        },
        onItemAmountInput(event, item) {
            const amount = parseFloat(event)
            if (amount === '' || item.amount === amount) return
            if (this.isNumeric(amount)) {
                item.amount = amount
                this.calculateMoney(item)
            } else {
                item.amount = 0
            }
        },
        calculateMoney(item) {
            const drug = this.getItemInfo(item.detection_id)
            let money = (parseFloat(drug.price) * parseFloat(item.amount)).toFixed(2)
            item.money = isNaN(money) ? parseFloat(0.00) : money
            this.calculateTotalMoney()
        },
        calculateTotalMoney() {
            this.totalMoney = parseFloat(this.items.map(i => parseFloat(i.money)).reduce((a, b) => (a + b), 0)).toFixed(2)
        },
        isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n)
        }
    }
}

</script>
