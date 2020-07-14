import Vue from 'vue'
import Router from 'vue-router'
import QuickStart from '@/components/QuickStart'
import SpreadSheets from '@/components/SpreadSheets'
import WorkSheet from '@/components/WorkSheet'
import Column from '@/components/Column'
import DataBinding from '@/components/DataBinding'
import SpreadStyle from '@/components/SpreadStyle'
import OutLine from '@/components/OutLine'
import ExportXlsx from '@/views/ExportXlsx'
import Events from '@/views/Events'
import CustomCellType from '@/views/CustomCellType'
import print from '@/views/print'
import HTMLCellType from '@/views/HTMLCellType'
import Commands from '@/views/Commands'
import Filter from '@/views/Filter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QuickStart',
      component: QuickStart
    },
    {
      path: '/QuickStart',
      name: 'QuickStart',
      component: QuickStart
    },
    {
      path: '/GC-Spread-Sheets',
      name: 'GC-Spread-Sheets',
      component: SpreadSheets
    },
    {
      path: '/WorkSheet',
      name: 'WorkSheet',
      component: WorkSheet
    },
    {
      path: '/Column',
      name: 'Column',
      component: Column
    },
    {
      path: '/DataBinding',
      name: 'DataBinding',
      component: DataBinding
    },
    {
      path: '/SpreadStyle',
      name: 'SpreadStyle',
      component: SpreadStyle
    },
    {
      path: '/OutLine',
      name: 'OutLine',
      component: OutLine
    },
    {
      path: '/ExportXlsx',
      name: 'ExportXlsx',
      component: ExportXlsx
    },
    {
      path: '/Events',
      name: 'Events',
      component: Events
    },
    {
      path: '/CustomCellType',
      name: 'CustomCellType',
      component: CustomCellType
    },
    {
      path: '/print',
      name: 'print',
      component: print
    },
    {
      path: '/HTMLCellType',
      name: 'HTMLCellType',
      component: HTMLCellType
    },
    {
      path: '/Commands',
      name: 'Commands',
      component: Commands
    },
    {
      path: '/Filter',
      name: 'Filter',
      component: Filter
    }
  ]
})
