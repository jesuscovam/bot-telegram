"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const fuse_js_1 = __importDefault(require("fuse.js"));
const TOKEN = "5087244927:AAFqcrzqHvWwMQp2HaCavcu5yaIGSdMYz8w";
const bot = new telegraf_1.Telegraf(TOKEN);
const PRENDAS = [
    { id: "a", type: "zapatos", price: 4000 },
    { id: "b", type: "pantalones", price: 700 },
    { id: "c", type: "camisas", price: 400 },
];
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply("Bienvenido blablabla, estas son las opciones:");
    yield ctx.reply("1 - Precios");
    yield ctx.reply("2 - Prendas");
    yield ctx.reply("3 - Horarios de atencion");
    yield ctx.reply("O puedes escribir el nombre de la prenda que buscas");
}));
bot.on("message", (ctx) => {
    // @ts-ignore
    const { text } = ctx.update.message;
    if (text) {
        const fuse = new fuse_js_1.default(PRENDAS, { includeScore: true, keys: ["type"] });
        const result = fuse.search(text);
        const primero = result[0];
        if (primero && (primero === null || primero === void 0 ? void 0 : primero.score) < 0.2) {
            ctx.reply(`Hola, los precios de los ${primero.item.type} son de ${primero.item.price}`);
        }
        else {
            ctx.reply("Hola, disculpa no tenemos esa prenda por el momento 😥");
        }
    }
});
bot.launch();
//# sourceMappingURL=index.js.map