"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
mongoose_1.default.connect('mongodb://localhost:27017/Riad-database', mongoOptions)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.use(body_parser_1.default.json());
app.use('/api', userRoutes_1.default);
app.listen(PORT, () => {
    console.log(` server success ${PORT}`);
});
