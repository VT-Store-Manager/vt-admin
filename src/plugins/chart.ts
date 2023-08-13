import { ScriptableContext, ChartTypeRegistry } from 'chart.js'
import { opacify } from 'polished'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			createGradientCanvas: <T extends keyof ChartTypeRegistry = 'line'>(
				color: string
			) => {
				return (context: ScriptableContext<T>): void | CanvasGradient => {
					if (!context.chart.chartArea) {
						return
					}
					const {
						ctx,
						chartArea: { top, bottom },
					} = context.chart
					const gradientBg = ctx.createLinearGradient(0, bottom, 0, top)

					gradientBg.addColorStop(1, opacify(-0.3, color))
					gradientBg.addColorStop(0.8, opacify(-0.35, color))
					gradientBg.addColorStop(0.65, opacify(-0.4, color))
					gradientBg.addColorStop(0.55, opacify(-0.45, color))
					gradientBg.addColorStop(0.45, opacify(-0.5, color))
					gradientBg.addColorStop(0.3, opacify(-0.6, color))
					gradientBg.addColorStop(0.2, opacify(-0.7, color))
					gradientBg.addColorStop(0.15, opacify(-0.8, color))
					gradientBg.addColorStop(0.05, opacify(-0.9, color))
					gradientBg.addColorStop(0, opacify(-1, color))

					return gradientBg
				}
			},
		},
	}
})
