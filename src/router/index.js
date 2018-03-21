import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'

import Acceptance from '@/views/acceptance/Acceptance'
import ProAcceptance from '@/views/acceptance/ProAcceptance'
import Program from '@/views/supply/Program'
import Builder from '@/views/supply/Builder'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Layout,
        redirect: '/proacceptance',
        children: [{
            path: 'proacceptance',
            component: ProAcceptance
        }, {
            path: 'acceptance',
            component: Acceptance
        }]
    }, {
        path: '/supply',
        component: Layout,
        redirect: 'noredirect',
        children: [{
            path: 'program',
            component: Program
        }, {
            path: 'builder',
            component: Builder
        }]
    }]
})
