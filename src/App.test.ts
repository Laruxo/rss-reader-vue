import { ref } from 'vue'
import { render } from '@testing-library/vue'
import { useFetch } from './composables/useFetch'
import App from './App.vue'

vi.mock('./composables/useFetch', () => ({ useFetch: vi.fn() }))

describe('App', () => {
  it('should render error', async () => {
    vi.mocked(useFetch).mockReturnValue(ref({ error: 'Custom error' }))
    const { findByText } = render(App)
    expect(await findByText('Custom error')).toBeTruthy()
  })

  it('should render feed list', async () => {
    vi.mocked(useFetch).mockReturnValue(
      ref({
        feed: { title: 'Feed Title', url: '' },
        items: [
          {
            guid: '111',
            title: 'Item 1',
            pubDate: '2020-01-01',
            link: '',
            description: '',
            content: '',
          },
          {
            guid: '222',
            title: 'Item 2',
            pubDate: '2020-01-02',
            link: '',
            description: '',
            content: '',
          },
        ],
      }),
    )
    const { findByText, queryByRole } = render(App)
    expect(await findByText('Feed Title Feed')).toBeTruthy()
    expect(await findByText('Item 1')).toBeTruthy()
    expect(queryByRole('list')?.children).toHaveLength(2)
  })
})
