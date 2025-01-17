import './../lib/lazy-cascader.css'
import LazyCascader from './../lib/lazy-cascader.umd.min'
import Mock from 'mockjs'

const {Cascader} = LazyCascader
// 模拟整棵树
const MockTree = Mock.mock({
    'array|100': [
        {
            label: '@csentence(6)',
            value: '@string()',
            'children|2': [
                {
                    label: '@csentence(6)',
                    value: '@string()',
                    disabled: '@boolean(1, 2, true)',
                    'children|2': [
                        {
                            label: '@csentence(6)',
                            value: '@string()'
                        }
                    ]
                }
            ]
        }
    ]
})
// 模拟单个节点
const MockNode = Mock.mock({
    'array|1000': [
        {
            label: '@csentence(6)',
            value: '@string()'
        }
    ]
})

// 模拟单个节点
const MockNodeLess = Mock.mock({
    'array|15': [
        {
            label: '@csentence(6)',
            value: '@string()'
        }
    ]
})

export default {
    title: 'Example/Cascader',
    component: Cascader,
    argTypes: {
        props: {control: {type: 'object'}},
        size: {control: {type: 'select', options: ['medium', 'small', 'mini']}},
        placeholder: {control: {type: 'text'}},
        disabled: {control: {type: 'boolean'}},
        clearable: {control: {type: 'boolean'}},
        'show-all-levels': {control: {type: 'boolean'}},
        'collapse-tags': {control: {type: 'boolean'}},
        separator: {control: {type: 'text'}},
        filterable: {control: {type: 'boolean'}},
        debounce: {control: {type: 'number', min: 0, step: 100}},
        // selectWithExpand: {
        //     control: {type: 'boolean'},
        //     description: '单选且checkStrictly为true时是否展开下一级'
        // },
        // panelLabels: {
        //     control: {type: 'array'},
        //     description: '面板标题'
        // },
        // checkAll: {
        //     control: {type: 'boolean'},
        //     description: '多选且checkStrictly为true时全选'
        // },
        // panelSearch: {
        //     control: {type: 'boolean'},
        //     description: '面板搜索'
        // },
        // lazy: {
        //     control: {type: 'boolean'},
        //     description: '懒加载'
        // },
        // lazyMultiCheck: {
        //     control: {type: 'boolean'},
        //     description: '多选且懒加载时取值'
        // },
        // infiniteScroll: {
        //     control: {type: 'boolean'},
        //     description: '懒加载时开启无限滚动（分页加载列表数据），开启懒加载时生效'
        // },
    }
}

const Template = (args, {argTypes}) => ({
    components: {Cascader},
    props: Object.keys(argTypes),
    template: `
      <div style="margin-top: 100px;text-align: center">
      <cascader v-bind="$props" style="width: 400px"/>
      </div>
    `
})

/**
 * 基础
 */
export const Base = Template.bind()
Base.args = {
    debounce: 300,
    size: 'medium',
    separator: '/',
    placeholder: '请选择',
    'show-all-levels': true,
    options: MockTree.array
}

/**
 * 远程&单选
 */
export const Lazy = Template.bind({})
Lazy.args = {
    ...Base.args,
    placeholder: '单选时不级联请求下一级',
    props: {
        lazy: true,
        checkStrictly: true,
        selectWithExpand: false,
        lazyLoad(node, resolve) {
            setTimeout(_ => {
                resolve(MockNode)
            }, 1000)
        }
    }
}


/**
 * 远程&多选
 */
export const LazyAndMulti = Template.bind({})
LazyAndMulti.args = {
    ...Base.args,
    placeholder: '多选时懒加载取值',
    props: {
        lazy: true,
        multiple: true,
        lazyMultiCheck: true,
        lazyLoad(node, resolve) {
            setTimeout(_ => {
                resolve(MockNode)
            }, 1000)
        }
    }
}

/**
 * 远程&懒加载
 */
export const LazyPagination = Template.bind({})
LazyPagination.args = {
    ...Base.args,
    options: MockNodeLess.array,
    placeholder: '懒加载时分页请求数据（开启无限滚动）',
    props: {
        lazy: true,
        infiniteScroll: true,
        selectWithExpand: false,
        lazyLoad(node, resolve) {
            // console.log('aasdfsfasfadfadsf')
            setTimeout(_ => {
                const newData = Mock.mock({
                    'array|15': [
                        {
                            label: '@csentence(6)',
                            value: '@string()'
                        }
                    ]
                })
                resolve({list: newData.array, isEnd: node.pageNo === 2})
            }, 1000)
        }
    }
}

/**
 * 面板标题
 */
export const PanelLabels = Template.bind()
PanelLabels.args = {
    debounce: 300,
    size: 'medium',
    separator: '/',
    placeholder: '面板标题',
    'show-all-levels': true,
    options: MockTree.array,
    props: {
        panelLabels: ['FIRST', 'SECOND', 'THIRD']
    }
}

/**
 * 选中全部
 */
export const CheckAll = Template.bind()
CheckAll.args = {
    debounce: 300,
    size: 'medium',
    separator: '/',
    placeholder: '选中全部',
    'show-all-levels': true,
    options: MockTree.array,
    props: {
        lazy: true,
        multiple: true,
        checkStrictly: true,
        checkAll: true,
        lazyLoad(node, resolve) {
            setTimeout(_ => {
                resolve(MockNode)
            }, 1000)
        }
    }
}


/**
 * 面板搜索
 */
export const PanelSearch = Template.bind()
PanelSearch.args = {
    debounce: 300,
    size: 'medium',
    separator: '/',
    placeholder: '面板搜索',
    'show-all-levels': true,
    options: MockTree.array,
    props: {
        panelSearch: true
    }
}

/**
 * 默认展开面板数
 */
export const expandPanels = Template.bind()
expandPanels.args = {
    debounce: 300,
    size: 'medium',
    separator: '/',
    placeholder: '默认展开面板数',
    'show-all-levels': true,
    options: MockTree.array,
    props: {
        expandPanels: 3
    }
}

/**
 * 单个面板搜索、全选
 */
export const MultiCheckSearch = Template.bind({})
MultiCheckSearch.args = {
    ...Base.args,
    placeholder: '多选情况下单个面板搜索、全选',
    props: {
        lazy: true,
        multiple: true,
        checkStrictly: true,
        checkAll: true,
        panelSearch: true,
        panelLabels: ['FIRST', 'SECOND', 'THIRD'],
        lazyLoad(node, resolve) {
            setTimeout(_ => {
                resolve(MockNode)
            }, 1000)
        }
    }
}
