const prod = process.env.NODE_ENV === 'production'

module.exports = {
    BACKEND_URL: prod ? 'https://api.visualization.linkedpipes.com' : 'https://localhost:9000',
}
