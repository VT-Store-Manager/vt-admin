import moment from "moment-timezone"
import { Faker } from "@faker-js/faker"

declare module '#app' {
  interface NuxtApp {
    $createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(color: string): CanvasGradient
    $moment: typeof moment
    $faker: Faker
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(color: string): CanvasGradient
    $moment: typeof moment
    $faker: Faker
  }
}

export { }