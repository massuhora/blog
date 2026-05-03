import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  // Sort posts by date (most recent first)
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );
  
  return rss({
    title: 'massuhora',
    description: 'massuhora 的个人博客，专注于简洁排版和无干扰的阅读体验',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
