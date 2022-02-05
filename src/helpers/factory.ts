import { getRepository } from 'typeorm'

class Factory {
  private factories: Array<object>

  constructor() {
    this.factories = []
  }

  addFactory<T, U>(
    name: string,
    entity: U,
    instance: T,
    options: object
  ): void {
    const object = {
      name,
      instance,
      options,
      entity,
    }

    this.factories.push(object)
  }

  build(name: string, options?: object): object {
    const factory = this.factories.reduce((prev: any, current: any) => {
      if (current.name === name) {
        prev = current
      }

      return current
    }, {})

    const optionsResult = Object.assign({}, factory.options, options)

    return optionsResult
  }

  async create(name: string): Promise<void> {
    const factory = this.factories.reduce((prev: any, current: any) => {
      if (current.name === name) {
        prev = current
      }
      return current
    }, {})
    const repository = getRepository(factory.entity)
    await repository.save(factory.instance)
  }
}

export default Factory
