import Layout from '../layout';
import BlogBanner from './Banner';
import { useState } from 'react';
import BlogContent from './Content';

export default function WebBlog() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Layout
      externalStyles={['/styles/css/style.css']}
      navbar={'web'}
      title="Church Blog"
      withFooter={false}
    >
      <BlogBanner setSearchTerm={setSearchTerm} />
      <div className="main_container">
        <BlogContent searchTerm={searchTerm} />
      </div>
    </Layout>
  );
}
