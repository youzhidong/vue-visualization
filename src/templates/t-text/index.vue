<template>
    <span :style="{
        color,
        width: width + 'px',
        backgroundColor: bgColor, 
        fontSize: fontSize + 'px',
        display: 'inline-flex'}">{{text}}</span>
</template>
<script>
export default {
    props: {
        width: [Number, String],
        color: String,
        bgColor: String,
        fontSize: [Number, String],
        text: String
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
}
</script>