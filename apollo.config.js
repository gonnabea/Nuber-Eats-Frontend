module.exports = {
    client: {
        includes: ["./src/**/*.tsx"],
        tagName: "gql",
        service: {
            name:"nuber-eats-backend",
            url: "http://localhost:3005/graphql"
        }
    }
}