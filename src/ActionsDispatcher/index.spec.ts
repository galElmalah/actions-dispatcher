import { ActionsDispatcher } from './index';
interface ActionsType {
  test: string;
  test1: string;
  test2: string;
}
describe('ActionsDispatcher', () => {
  let dispatcher: ActionsDispatcher<ActionsType>;
  beforeEach(() => {
    dispatcher = new ActionsDispatcher()
  })
  it('should register new actions', () => {
    const mock = jest.fn()
    const args = [1, 2, 'test2']
    dispatcher.register('test', mock)
    dispatcher.dispatch('test', ...args)
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(...args)
  })

  it('should register multiple actions for the same action type', () => {
    const mock = jest.fn()
    const mock2 = jest.fn()
    const args = [1, 2, 'test2']
    dispatcher.register('test', mock)
    dispatcher.register('test', mock2)
    dispatcher.dispatch('test', ...args)
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(...args)
    expect(mock2).toHaveBeenCalledTimes(1)
    expect(mock2).toHaveBeenCalledWith(...args)
  })

  it('should register the actions of another type if passed an action type instead of an action i.e a string instead of a function', () => {
    const mock = jest.fn()
    const mock2 = jest.fn()
    const args = [1, 2, 'test2']
    dispatcher.register('test', mock)
    dispatcher.register('test', mock2)
    dispatcher.register('test', 'test2')
    dispatcher.dispatch('test2', ...args)
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(...args)
    expect(mock2).toHaveBeenCalledTimes(1)
    expect(mock2).toHaveBeenCalledWith(...args)
  })

  it('should call the default action if no action type matches to the one passed', () => {
    const mock = jest.fn()

    const args = [1, 2, 'test2']
    dispatcher.setDefaultAction(mock)
    dispatcher.register('test', mock)
    dispatcher.register('test', 'test2')
    dispatcher.dispatch('non-test', ...args);
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith(...args)
  })

  it('should throw if no action type that matched to the one that was passed and there is no default action as well', () => {

    expect(() => dispatcher.dispatch('non-test')).toThrowError(TypeError);
  })
})