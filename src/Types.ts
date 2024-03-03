export interface UnsplashPhoto {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  downloads: number;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: any[];
  current_user_collections: any[];
  liked_by_user: boolean;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
  };
  sponsorship: {
    impression_urls: string[];
    tagline: string;
    tagline_url: string;
  };
  topic_submissions: object;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    small_s3:string;
    thumb:string;
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
  };
}
