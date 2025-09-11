import { getHistory, addHistoryItem } from './feedHistory'

describe('feedHistory', () => {
  it('should return default history when localStorage is empty', () => {
    localStorage.removeItem('urlHistory')
    expect(getHistory()).toEqual([
      { title: 'Wait But Why', url: 'http://waitbutwhy.com/feed' },
    ])
  })

  it('should return what is in localStorage', () => {
    localStorage.setItem('urlHistory', '[]')
    expect(getHistory()).toEqual([])
  })

  it('should add item to history', () => {
    localStorage.setItem('urlHistory', '[]')
    const item1 = { title: 'item 1', url: 'http://item1.local' }
    addHistoryItem(item1)
    expect(getHistory()).toEqual([item1])
  })

  it('should move item to the top of history', () => {
    const history = [
      { title: 'item 1', url: 'http://item1.local' },
      { title: 'item 2', url: 'http://item2.local' },
      { title: 'item 3', url: 'http://item3.local' },
    ]
    localStorage.setItem('urlHistory', JSON.stringify(history))
    addHistoryItem(history[2])
    const result = getHistory()
    expect(result).toHaveLength(3)
    expect(result[0]).toEqual(history[2])
  })
})
