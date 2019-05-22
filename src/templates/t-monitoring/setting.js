import index from './index.vue'
const appearance = {
    width: {
        name: 'i-input',
        label: '宽度',
        type: 'Number',
        componentData: {
            value: 25
        }
    },
    height: {
        name: 'i-input',
        label: '高度',
        componentData: {
            value: 250
        }
    }
}
const content = {
    http: {
        name: 'i-input',
        label: '请求地址',
        componentData: {
            value: 'http'
        }
    }
}
index['setting'] = {
    name: 'tMonitoring',
    appearance,
    content
}
export default index