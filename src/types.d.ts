interface FeedInfo {
  title: string;
  url: string;
}

interface FeedItem {
  guid: string;
  title: string;
  pubDate: string;
  link: string;
  description: string;
  content: string;
}

interface ApiResponse {
  feed: FeedInfo;
  items: FeedItem[];
}

type ResponseState = null | { error: string } | ApiResponse;
