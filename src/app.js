const express = require("express");
const { add, multiply } = require("./math");

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Jenkins Node Demo API",
        status: "UP",
        endpoints: [
            "/health",
            "/api/add?a=5&b=7",
            "/api/multiply?a=5&b=7"
        ]
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "jenkins-node-demo",
        version: process.env.APP_VERSION || "dev"
    });
});

app.get("/api/add", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return res.status(400).json({
            error: "a and b must be valid numbers"
        });
    }

    return res.json({
        result: add(a, b)
    });
});

app.get("/api/multiply", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return res.status(400).json({
            error: "a and b must be valid numbers"
        });
    }

    return res.json({
        result:  multiply(a, b)
    });
});

module.exports = app;