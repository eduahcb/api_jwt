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

  private filterFactoryByName = (name: string) =>
    this.factories.reduce((prev: any, current: any) => {
      if (current.name === name) {
        prev = current
      }

      return current
    }, {})

  build(name: string, options?: object): object {
    const factory = this.filterFactoryByName(name)

    const optionsResult = Object.assign({}, factory.options, options)

    return optionsResult
  }

  async create(name: string): Promise<any> {
    const factory = this.filterFactoryByName(name)
    const repository = getRepository(factory.entity)

    const entity = await repository.save(factory.instance)

    return entity
  }
}

export default Factory
