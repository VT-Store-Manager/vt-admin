import moment from 'moment-timezone'
import { Faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import _ from 'lodash'

declare module '#app' {
	interface NuxtApp {
		$createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(
			color: string
		): CanvasGradient
		$moment: typeof moment
		$dayjs: typeof dayjs
		$faker: Faker
		$capitalize: typeof _.capitalize
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(
			color: string
		): CanvasGradient
		$moment: typeof moment
		$dayjs: typeof dayjs
		$faker: Faker
		$capitalize: typeof _.capitalize
	}
}

export {}
