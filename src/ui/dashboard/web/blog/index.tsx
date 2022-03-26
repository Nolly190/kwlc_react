import Layout from '../layout';
import BlogBanner from './Banner';
import { useState } from 'react';
import BlogContent from './Content';

export default function WebBlog() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Layout
      externalStyles={['/styles/css/donation.css']}
      navbar={'web'}
      title="Church Blog"
      withFooter={true}
    >
      <BlogBanner setSearchTerm={setSearchTerm} />
      <div className="blogPage main_container">
        <BlogContent searchTerm={searchTerm} />
      </div>
    </Layout>
  );
}
