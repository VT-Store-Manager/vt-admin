import moment from 'moment-timezone'
import { Faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import _ from 'lodash'
import { AppAbility } from '~/models/casl-model'

declare module '#app' {
	interface NuxtApp {
		$createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(
			color: string
		): CanvasGradient
		$moment: typeof moment
		$dayjs: typeof dayjs
		$faker: Faker
		$capitalize: typeof _.capitalize
		$ability: AppAbility
		$getAbility(): MongoAbility<[Action | "analyse" | "read" | "modify", Subjects], MongoQuery>
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
		$ability: AppAbility
		$getAbility(): MongoAbility<[Action | "analyse" | "read" | "modify", Subjects], MongoQuery>
	}
}

export {}
