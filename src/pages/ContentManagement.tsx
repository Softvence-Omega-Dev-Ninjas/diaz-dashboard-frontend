import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from '@/redux/features/blogManagement/blogmanagement';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LuCalendar } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

type Tab = 'blog' | 'pages';

interface BlogImage {
  id: string;
  filename: string;
  originalFilename: string;
  path: string;
  url: string;
  fileType: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  id: string;
  blogImageId: string;
  blogTitle: string;
  blogDescription: string;
  sharedLink: string;
  readTime: number;
  postStatus: string;
  createdAt: string;
  updatedAt: string;
  blogImage: BlogImage;
  pageViewCount: number;
}

interface StaticPage {
  id: number;
  title: string;
}

const DEMO_STATIC_PAGES: StaticPage[] = [
  { id: 1, title: 'About Us' },
  { id: 2, title: 'Contact' },
  { id: 3, title: 'Privacy Policy' },
  { id: 4, title: 'Terms of Service' },
];

const ContentManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('blog');
  const [staticPages] = useState<StaticPage[]>(DEMO_STATIC_PAGES);
  const { data: blogsData, isLoading } = useGetBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();

  const blogPosts: BlogPost[] = blogsData || [];

  const handleNewArticle = () => {
    navigate('/content/new-article');
  };

  const handleEditPost = (id: string) => {
    navigate(`/content/edit/${id}`);
  };

  const handleDeleteBlog = (id: string) => async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await deleteBlog(id).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'Blog post has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error: any) {
        console.error('Delete error:', error);
        Swal.fire({
          title: 'Error!',
          text: error?.data?.message || 'Failed to delete blog post',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  const handleEditPage = (id: number) => {
    console.log('Editing page:', id);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Content Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage pages, blog posts, and site content
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 p-2 bg-gray-100 rounded-full max-w-full sm:max-w-max overflow-x-auto">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeTab === 'blog'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              activeTab === 'pages'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Pages
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'blog' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Blog Articles
            </h2>
            <button
              onClick={handleNewArticle}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Plus className="w-4 h-4" />
              New Article
            </button>
          </div>

          {/* Blog Posts List */}
          <div className="divide-y divide-gray-200">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <p className="text-gray-500">Loading blog posts...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <p className="text-gray-500">
                  No blog posts found. Create your first article!
                </p>
              </div>
            ) : (
              blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    {post.blogImage?.url ? (
                      <img
                        src={post.blogImage.url}
                        alt={post.blogTitle}
                        className="w-12 h-12 object-cover rounded-lg shrink-0"
                      />
                    ) : (
                      <LuCalendar className="text-xl text-gray-400 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {post.blogTitle}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {post.postStatus} • {post.pageViewCount} views •{' '}
                        {post.readTime} min read
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="p-2 text-gray-600 transition-colors shrink-0"
                      aria-label="Edit post"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button onClick={handleDeleteBlog(post.id)}>
                      <FaTrash className="text-xl text-red-500 hover:text-red-700 transition-colors" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Static Pages
            </h2>
          </div>

          {/* Static Pages List */}
          <div className="divide-y divide-gray-200">
            {staticPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {page.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleEditPage(page.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  aria-label="Edit page"
                >
                  <FaEdit className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
