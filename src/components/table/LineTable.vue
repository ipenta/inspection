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
    <el-button @click="add">新增</el-button>
    <table class="linetable" border="0">
        <thead>
            <tr>
                <td>材料/项目名称</td>
                <td>检测类别</td>
                <td>属性</td>
                <td>收费标准</td>
                <td>数量</td>
                <td>计量单位</td>
                <td>总额</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, itemIndex) in items" v-bind:key="itemIndex">
                <td>
                    <select class="el-select" @change="onSelectedDetection($event, item)">
                        <option value="" disabled selected>材料/项目名称</option>
                        <option :value="detection.id" v-for="detection in detections" v-bind:key="detection.id">{{ detection.name }}</option>
                    </select>
                </td>
                <td>
                    <input type="text" placeholder="检测类别" :value="getItemInfo(item.detection_id).type" disabled>
                </td>
                <td>
                    <input type="text" placeholder="属性" :value="getItemInfo(item.detection_id).mode" disabled>
                </td>
                <td>
                    <input type="text" placeholder="收费标准" :value="getItemInfo(item.detection_id).price" disabled>
                </td>
                <td>
                    <input type="text" placeholder="数量" :value="item.amount" @input="onItemAmountInput($event, item)">
                </td>
                <td>
                    <input type="text" placeholder="计量单位" :value="getItemInfo(item.detection_id).unit" disabled>
                </td>
                <td>
                    <input type="text" placeholder="数额" :value="item.money" disabled>
                </td>
            </tr>
            <tr v-if="!items.length">
                <td colspan="8" class="empty">尚未新增任何資料</td>
            </tr>
            <tr>
                <td colspan="8" align="left">總金額：{{ totalMoney }}</td>
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
            num: '',
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
            console.log(event.target.value)
            item.detection_id = parseInt(event.target.value)
        },
        add() {
            this.items.push({
                detection_id: null,
                name: '',
                type: '',
                price: 0,
                unit: '',
                mode: '',
                amount: '',
                money: ''

            })
        },
        getItemInfo(detectionId) {
            if (!detectionId) return ''
            return this.detections.find(d => d.id === detectionId)
        },
        onItemAmountInput(event, item) {
            const amount = parseFloat(event.target.value)
            // 一樣就不繼續了
            if (item.amount === amount) return
            // 檢測輸入的是否為數字
            if (this.isNumeric(event.target.value)) {
                item.amount = amount
                // 計算金額
                this.calculateMoney(item)
            } else {
                item.amount = 0
            }
        },
        calculateMoney(item) {
            const drug = this.getItemInfo(item.detection_id)
            // 照你的算法～
            let money = (parseFloat(drug.price) * parseFloat(item.amount)).toFixed(2)
            // 這裡可以簡化成這樣
            item.money = isNaN(money) ? parseFloat(0.00) : money
            // 任何金額異動就重新計算總金額
            this.calculateTotalMoney()
        },
        calculateTotalMoney() {
            // 這裡的大致意思是說，從 items 每個元素中取得其 money 值，在進行加總 (reduce)
            this.totalMoney = parseFloat(this.items.map(i => parseFloat(i.money)).reduce((a, b) => (a + b), 0)).toFixed(2)
        },
        isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n)
        }
    }
}

</script>
