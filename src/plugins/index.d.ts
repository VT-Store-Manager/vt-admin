declare module '#app' {
  interface NuxtApp {
    $createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(color: string): CanvasGradient
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $createGradientCanvas<T extends keyof ChartTypeRegistry = 'line'>(color: string): CanvasGradient
  }
}

export { }