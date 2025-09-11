import { ref } from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import { useFetch } from '../../composables/useFetch'
import { addHistoryItem } from '../../utils/feedHistory'
import FeedSearch from '../FeedSearch.vue'

vi.mock('../../composables/useFetch', () => ({ useFetch: vi.fn() }))

vi.mock('../../utils/feedHistory', () => ({
  getHistory: () => [
    { title: 'Suggestion 1', url: 'http://suggestion1.local' },
  ],
  addHistoryItem: vi.fn(),
}))

describe('FeedSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch with first history item initially', () => {
    vi.mocked(useFetch).mockReturnValue(ref(null))
    render(FeedSearch)
    expect(vi.mocked(useFetch)).toBeCalledWith(
      expect.objectContaining({
        value:
          'https://api.rss2json.com/v1/api.json?rss_url=http://suggestion1.local',
      }),
    )
  })

  it('should fetch with new url on submit', async () => {
    vi.mocked(useFetch).mockReturnValue(ref(null))
    const { getByRole, getByTitle } = render(FeedSearch)
    await fireEvent.update(getByTitle('RSS URL'), 'http://test.local')
    await fireEvent.submit(getByRole('form'))
    expect(vi.mocked(useFetch)).toBeCalledWith(
      expect.objectContaining({
        value: 'https://api.rss2json.com/v1/api.json?rss_url=http://test.local',
      }),
    )
  })

  it('should set response on error', async () => {
    vi.mocked(useFetch).mockReturnValue(ref({ error: 'Custom error' }))
    const { getByRole, emitted } = render(FeedSearch)
    await fireEvent.submit(getByRole('form'))
    expect(emitted('response')).toHaveLength(1)
    expect(emitted('response')[0]).toEqual([{ error: 'Custom error' }])
  })

  it('should set response on success response', async () => {
    vi.mocked(useFetch).mockReturnValue(
      ref({ feed: 'mock feed' } as unknown as ApiResponse),
    )
    const { emitted } = render(FeedSearch)
    expect(emitted('response')).toHaveLength(1)
    expect(emitted('response')[0]).toEqual([{ feed: 'mock feed' }])
  })

  it('should add feed to history on success response', () => {
    vi.mocked(useFetch).mockReturnValue(
      ref({ feed: 'mock feed' } as unknown as ApiResponse),
    )
    render(FeedSearch)
    expect(addHistoryItem).toBeCalledWith('mock feed')
  })
})
