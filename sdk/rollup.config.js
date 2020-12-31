import babel from 'rollup-plugin-babel'

let isDev = process.env.NODE_ENV === 'develop'

export default {
    input: 'index.js',
    watch: {
        exclude: 'node_modules/**'
    },
    output: {
        file: isDev ? '../website/client/js/eagle-monitor/bundle.umd.js' : '../dist/bundle.umd.js',
        format: 'umd',
        name: 'EagleMonitor',
        sourcemap: true
    },
    plugins: [
        babel({ exclude: 'node_modules/**' })
    ]
}