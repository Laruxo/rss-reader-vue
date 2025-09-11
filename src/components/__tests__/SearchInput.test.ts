import { render, fireEvent } from '@testing-library/vue'
import SearchInput from '../SearchInput.vue'

vi.mock('../../utils/feedHistory', () => ({
  getHistory() {
    return [
      { title: 'Suggestion 1', url: 'http://suggestion1.local' },
      { title: 'Suggestion 2', url: 'http://suggestion2.local' },
      { title: 'Suggestion 3', url: 'http://suggestion3.local' },
    ]
  },
}))

describe('SearchInput', () => {
  it('should render input', () => {
    const { getByTitle } = render(SearchInput, { props: { loading: false } })
    const input = getByTitle('RSS URL')
    expect(input).toBeTruthy()
  })

  it('should render suggestions', async () => {
    const { getByTitle, getByText } = render(SearchInput, {
      props: { loading: false },
    })
    const input = getByTitle('RSS URL')
    await fireEvent.focus(input)
    expect(getByText('Suggestion 1')).toBeTruthy()
    expect(getByText('http://suggestion3.local')).toBeTruthy()
  })

  it('should hide suggestions on blur', async () => {
    const { getByTitle, queryByText } = render(SearchInput, {
      props: { loading: false },
    })
    const input = getByTitle('RSS URL')
    await fireEvent.focus(input)
    expect(queryByText('Suggestion 1')).toBeTruthy()
    await fireEvent.blur(input)
    expect(queryByText('Suggestion 1')).toBeNull()
  })

  it('should filter suggestions', async () => {
    const { getByTitle, queryByText } = render(SearchInput, {
      props: { loading: false },
    })
    const input = getByTitle('RSS URL')
    await fireEvent.focus(input)
    expect(queryByText('Suggestion 1')).toBeTruthy()
    await fireEvent.update(input, 'suggestion2')
    expect(queryByText('Suggestion 1')).toBeNull()
    expect(queryByText('Suggestion 2')).toBeTruthy()
    expect(queryByText('Suggestion 3')).toBeNull()
  })

  it('should do nothing on enter with invalid value', async () => {
    const { getByTitle, emitted } = render(SearchInput, {
      props: { loading: false },
    })
    const input = getByTitle('RSS URL')
    await fireEvent.update(input, 'test.local')
    await fireEvent.keyDown(input, { key: 'Enter' })
    expect(emitted('submit')).toBeUndefined()
  })

  it('should submit clicked suggestion', async () => {
    const { getByTitle, getByText, emitted } = render(SearchInput, {
      props: { loading: false },
    })
    const input = getByTitle('RSS URL')
    await fireEvent.focus(input)
    const suggestion = getByText('Suggestion 1')
    await fireEvent.mouseDown(suggestion)
    expect(emitted('submit')[0]).toContain('http://suggestion1.local')
  })

  it('should submit selected suggestion', async () => {
    const { getByTitle, emitted } = render(SearchInput, {
      props: { loading: false },
    })
    const input = getByTitle('RSS URL')
    await fireEvent.focus(input)
    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    await fireEvent.keyDown(input, { key: 'ArrowDown' })
    await fireEvent.keyDown(input, { key: 'ArrowUp' })
    await fireEvent.keyDown(input, { key: 'Enter' })
    expect(emitted('submit')[0]).toContain('http://suggestion2.local')
  })

  it('should render loader while loading', () => {
    const { queryByRole, emitted } = render(SearchInput, {
      props: { loading: true },
    })
    expect(queryByRole('progressbar')).toBeTruthy()
    expect(emitted('submit')).toBeUndefined()
  })
})
