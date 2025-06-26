import { BrowserComponent } from './ui/browser'

export const Browser = () => (
  <BrowserComponent className={'w-full max-w-[600px] h-[300px]'}>
    <section className={'w-full h-full flex items-center justify-center'}>
      <h1 className={'md:text-xl text-base'}>dedevs.space</h1>
    </section>
  </BrowserComponent>
)
