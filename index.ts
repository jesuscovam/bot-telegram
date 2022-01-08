import { Telegraf } from "telegraf"
import Fuse from "fuse.js"
const TOKEN = "5087244927:AAFqcrzqHvWwMQp2HaCavcu5yaIGSdMYz8w"
const bot = new Telegraf(TOKEN)
const PRENDAS = [
	{ id: "a", type: "zapatos", price: 4000 },
	{ id: "b", type: "pantalones", price: 700 },
	{ id: "c", type: "camisas", price: 400 },
]

bot.start(async (ctx) => {
	await ctx.reply("Bienvenido blablabla, estas son las opciones:")
	await ctx.reply("1 - Precios")
	await ctx.reply("2 - Prendas")
	await ctx.reply("3 - Horarios de atencion")
	await ctx.reply("O puedes escribir el nombre de la prenda que buscas")
})

bot.on("message", (ctx) => {
	// @ts-ignore
	const { text } = ctx.update.message

	if (text) {
		const fuse = new Fuse(PRENDAS, { includeScore: true, keys: ["type"] })
		const result = fuse.search(text)
		const primero = result[0]

		if (primero && (primero?.score as number) < 0.2) {
			ctx.reply(`Hola, los precios de los ${primero.item.type} son de ${primero.item.price}`)
		} else {
			ctx.reply("Hola, disculpa no tenemos esa prenda por el momento 😥")
		}
	}
})

bot.launch()
