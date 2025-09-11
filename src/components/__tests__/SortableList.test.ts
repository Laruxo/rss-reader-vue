import { render, fireEvent, queryByText } from '@testing-library/vue'
import SortableList from '../SortableList.vue'

const feedList: FeedItem[] = [
  {
    guid: '111',
    title: 'Item A',
    pubDate: '2020-01-01',
    link: 'http://item1.local',
    content: '',
    description: '',
  },
  {
    guid: '222',
    title: 'Item B',
    pubDate: '2020-01-02',
    link: 'http://item2.local',
    content: '',
    description: '',
  },
  {
    guid: '333',
    title: 'Item C',
    pubDate: '2020-01-03',
    link: 'http://item3.local',
    content: '',
    description: '',
  },
]

function expectListInOrder(list: HTMLElement, order: string[]) {
  const items = list.children
  order.forEach((value, index) => {
    expect(queryByText(items[index] as HTMLElement, value)).toBeTruthy()
  })
}

describe('SortableList', () => {
  it('should render empty list', () => {
    const { queryByText, getByRole } = render(SortableList, {
      props: { title: 'Feed Title', feed: [] },
    })
    expect(queryByText('Feed Title Feed')).toBeTruthy()
    expect(getByRole('list').children).toHaveLength(0)
  })

  it('should render feed list', () => {
    const { queryByText, getByRole } = render(SortableList, {
      props: { title: 'Feed Title', feed: feedList },
    })
    expect(queryByText('Item A')).toBeTruthy()
    expect(getByRole('list').children).toHaveLength(3)
  })

  it('should sort list by date initially', async () => {
    const { getByRole, getByText } = render(SortableList, {
      props: { title: 'Feed Title', feed: feedList },
    })
    expectListInOrder(getByRole('list'), ['Item C', 'Item B', 'Item A'])
    await fireEvent.click(getByText('Date ↓'))
    expectListInOrder(getByRole('list'), ['Item A', 'Item B', 'Item C'])
    expect(getByText('Date ↑')).toBeTruthy()
  })

  it('should sort list by name', async () => {
    const { getByRole, getByText } = render(SortableList, {
      props: { title: 'Feed Title', feed: feedList },
    })
    await fireEvent.click(getByText('Title'))
    expectListInOrder(getByRole('list'), ['Item C', 'Item B', 'Item A'])
    await fireEvent.click(getByText('Title ↑'))
    expectListInOrder(getByRole('list'), ['Item A', 'Item B', 'Item C'])
    expect(getByText('Title ↓')).toBeTruthy()
  })

  it('should render modal on item click', async () => {
    const { getByText, queryByRole } = render(SortableList, {
      props: { title: 'Feed Title', feed: feedList },
    })
    expect(queryByRole('alertdialog')).toBeNull()
    await fireEvent.click(getByText('Item A'))
    expect(queryByRole('alertdialog')).toBeTruthy()
  })
})
